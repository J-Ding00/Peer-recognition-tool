const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recognitionSchema = new Schema(
    {
        companyID:              Number,
        giverName:              String,
        receiverName:           String,
        giverID:                Number,
        receiverID:             Number,
        values:                 [String],
        message:                String,
        creationTime:           Date
    }, {
        collection: "Recognitions"
    }
);

//mongoose.model(ModelName, schema, ModelCollection)
const Recognition = mongoose.model("Recognition", recognitionSchema, "Recognitions");

module.exports = Recognition;