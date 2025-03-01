import express from 'express';
import axios from 'axios';
import sha256 from 'sha256';
import uniqid from 'uniqid';
import Donation from '../models/donationModel.js';

const router = express.Router();

// Configurations
const MERCHANT_ID = "PGTESTPAYUAT115";
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_KEY = "f94f0bb9-bcfb-4077-adc0-3f8408a17bf7";
const APP_BE_URL = "http://localhost:5000";

// Generate checksum for requests
const generateChecksum = (payload, endpoint) => {
  const string = `${payload}${endpoint}${SALT_KEY}`;
  const sha256_val = sha256(string);
  return `${sha256_val}###1`; 
};

// Bypass SSL for development (Remove this in production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Initiate Donation Payment
router.post("/pay", async (req, res) => {
  try {
    const { name, email, amount, message } = req.body;
    const merchantTransactionId = uniqid();

    // Prepare payment payload
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: email,
      amount: amount * 100,
      redirectUrl: `${APP_BE_URL}/payment/validate/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      mobileNumber: "9999999999",
      paymentInstrument: { type: "PAY_PAGE" },
    };

    // Encode payload to base64
    const base64EncodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
    const xVerifyChecksum = generateChecksum(base64EncodedPayload, '/pg/v1/pay');

    // Send payment request to PhonePe
    const response = await axios.post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      { request: base64EncodedPayload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          "accept": "application/json",
        },
      }
    );

    if (response.data.success) {
      // Store donation details in MongoDB
      await Donation.create({
        name,
        email,
        amount,
        message,
        merchantTransactionId,
        status: "PENDING",
      });

      // Redirect user to PhonePe payment page
      res.json({ redirectUrl: response.data.data.instrumentResponse.redirectInfo.url });
    } else {
      res.status(400).json({ error: response.data.message });
    }
  } catch (error) {
    console.error("Payment initiation error:", error.message || error);
    res.status(500).json({ error: "Payment initiation failed." });
  }
});

// Validate Payment Status
router.get("/validate/:merchantTransactionId", async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;

    // Build status check URL and checksum
    const statusUrl = `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
    const xVerifyChecksum = generateChecksum('', `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`);

    // Send status request to PhonePe
    const response = await axios.get(statusUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
        "accept": "application/json",
      },
    });

    const { success, data } = response.data;
    
    if (success && data.state === "COMPLETED") {
      // Update donation status to SUCCESS in DB
      await Donation.findOneAndUpdate(
        { merchantTransactionId },
        { status: "SUCCESS", timestamp: new Date() }
      );

      res.send("Donation successful! Thank you for your support.");
    } else {
      await Donation.findOneAndUpdate(
        { merchantTransactionId },
        { status: "FAILED" }
      );
      res.status(400).send("Payment failed or pending.");
    }
  } catch (error) {
    console.error("Payment status error:", error.message || error);
    res.status(500).send("Failed to check payment status.");
  }
});

export default router;
