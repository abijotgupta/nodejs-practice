const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/bcetgsp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    console.log("Connection Successful........");
})
.catch((err) => {
    console.log("Connection Error........", err);
});

//Schema
const student = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branch: String,
    roll_no: Number,
    hosteller: Boolean,
    entryDate: {
        type: Date,
        default: Date.now
    }
});

//Model for collection creation
const Student = new mongoose.model("Student", student);

// create/insert document
const createDocument = async () => {
    try {
        const studentInfo = new Student({
            name: 'Anmol',
            branch: 'Civil',
            roll_no: "162363",
            hosteller: true,
        })
        // studentInfo.save(); return a promise
        const result = await studentInfo.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

createDocument();