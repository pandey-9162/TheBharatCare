import Place from "../models/PlacesModel.js";

const SubmitLocation = async(req,res) => {
    const {name,mobNumber,emailid,type,address,coordinates,description,imageUrl} = req.body;

    if(!name || !mobNumber || !address || !coordinates) res.status(500).json({
        error:"All required field should not be null"
    })

    try{
        const location = await Place.create({
            name,
            mobNumber,
            emailid,
            type,
            address,
            coordinates,
            description,
            imageUrl,
        });

        res.status(201).json({
            message:"Your Request submitted!",
            data:location.requestId
        })      
    }
    catch{
        res.status(500).json({
            error:`faild to submit Request `
        })
    }
};

const GetPlaces = async (req, res) => {
    try {
      const { requestId } = req.query; 
  
      const data = await Place.find({ requestId: requestId }); 
  
      if (data.length === 0) {
        return res.status(404).json({ message: "No place found with the given requestId." });
      }
      const ApprpveFlag = data.status=='Pending'?1:0;
      res.status(200).json({
        aproveFlag:ApprpveFlag,
        data
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: `Failed to fetch places ${error.message}` });
    }
  };

export {SubmitLocation,GetPlaces} ;