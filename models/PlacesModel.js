import mongoose  from "mongoose";

const placeSchema = new mongoose.Schema(
    {
        name:{
            type: String, required:true
        },
        emailid:{
            type: String, default:null
        },
        mobNumber:{
            type:Number,required:false
        },
        type:{
            type:String,
        },
        address:
        {
            type:String,required:true
        },
        coordinates: {
            type: [Number],
            required: true,
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: [String], 
            default: [], 
        },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Cleaned'],
            default: 'Pending',
        },
        requestId: {
            type: String,
            unique: true,
            default: () => `BH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          },
    },
    {
        timestamps: true,
    }
);

const Place = mongoose.model('Place',placeSchema);

export default Place;