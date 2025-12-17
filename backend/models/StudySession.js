import mongoose from 'mongoose'

const StudySessionSchema = new mongoose.Schema({


    date:{
        type:Date,
        required:true
    },
     day:{
        type:String,
        required:true,
        trim:true
     },
      subject: {
      type: String,
      required: true,
      trim: true,
    },

     description: {
      type: String,
      default: "",
      trim: true,
    },
     startTime: {
      type: Date,
      default: null,
    },
     endTime: {
      type: Date,
      default: null,
    },
     totalDuration: {
      type: Number, 
      default: 0,
    },
    status: {
      type: String,
      enum: ["in_progress", "paused", "completed"],
      default: "in_progress",
    },
  
    pausedAt: {
      type: Date,
      default: null,
    },
    totalPausedTime: {
      type: Number,
      default: 0,
    },
},{timestamps:true})

const StudySession = mongoose.model("StudySession", StudySessionSchema);

export default StudySession;