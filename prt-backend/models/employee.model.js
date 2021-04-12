const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        firstName:              String,
        lastName:               String,
        companyId:              Number,
        password:               String,
        positionTitle:          String,
        companyName:            String,
        isManager:              Boolean,
        employeeId:             Number,
        managerId:              Number,
        email:                  String,
        startDate:              String,
        recognitionsGiven:      [mongoose.ObjectId],
        recognitionsReceived:   [mongoose.ObjectId],
        activeNotifications:    [mongoose.ObjectId]
    }, {
        collection: "Employees"
    }
);

//mongoose.model(ModelName, schema, ModelCollection)
const Employee = mongoose.model("Employee", employeeSchema, "Employees");

module.exports = Employee;