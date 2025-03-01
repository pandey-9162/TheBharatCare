import mongoose  from "mongoose";

const volunteerDetailSchema = new mongoose.Schema(
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
        occupation:{
            type:String,
        },
        city:
        {
            type:String,required:true
        },
        freedays:
        {
            type:String,
        },
        requestId: {
            type: String,
            unique: true,
            default: () => `TBC-${Math.random().toString(19).substr(2, 4).toUpperCase()}`,
          },
    },
    {
        timestamps: true,
    }
);

const volunteerDetail = mongoose.model('volunteerDetail',volunteerDetailSchema);

export default volunteerDetail;