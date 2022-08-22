const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    author: {
        type:String,
        required:[true,'must provide a name'],
        trim:true,
    },
    title: {
        type:String,
        required:[true,'must provide a name'],
    },
    completed:{
        type:Boolean
    },
    pages: {
        type:Number,
        required:[true,'number of pages must be provided']
    },
    percentage: {
        type:Number
    },
    pagesCompleted: {
        type:Number,
        default:0
    },
    year: {
        type:Number,
        required:[true,'year must be provided'],
    }
})
TaskSchema.pre("findOneAndUpdate", async function(done){
    this.set("percentage",  Math.round((this.get("pagesCompleted")/this.get("pages"))*100))
    const completedValidator = this.get("pagesCompleted") === this.get("pages") ? true:false;

    this.set("completed",completedValidator)
    done();
  });


module.exports = mongoose.model('Task',TaskSchema)