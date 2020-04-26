const requestRideTo = require('../../models/requestrideto'); 
const express = require('express');
const Organization = require('../../models/organizations');
const User = require('../../models/users');
const router = express.Router();
const jwt = require('jsonwebtoken');
const regex = require('regex');
const bcrypt = require('bcrypt');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
process.env.SECRET_KEY = 'secret';

//Error handler
const errHandler = err => {
    //Catch and log any error.
    console.error("Error: ", err);
};
const isToday = (date) => {
    const today = new Date();
    someDate = new Date(date);
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
router.post('/', async (req, res) => {
    var userExists = false;
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    await User.findOne({ where: { id: decoded.id }}).then(user=>{
        if(user){
            userExists =true;
        } 
        else {
            res.status(404).send({ message: "User not found" })
            res.end()
        }
        }).catch(errHandler);

        if(userExists){
        const now = new Date();   
        //Latitude validation
        if (req.body.fromlatitude == null) {
            res.status(400).send({ error: "From latitude", message: "From latitudee paramter is missing" });
        } else if (((req.body.fromlatitude).toString()).trim().length === 0) {
            res.status(400).send({ error: "From latitude", message: "From latitude can't be empty" });
        } else if ((typeof(req.body.fromlatitude) === 'string') || ((req.body.fromlatitude) instanceof String)) {
            res.status(400).send({ error: "From latitude", message: "From latitude must be a decimal" });
        }
        //Longitude validation
        else if (req.body.fromlongitude == null) {
            res.status(400).send({ error: "From longitude", message: "From longitude paramter is missing" });
        } else if (((req.body.fromlongitude).toString()).trim().length === 0) {
            res.status(400).send({ error: "From longitude", message: "From longitude can't be empty" });
        } else if ((typeof(req.body.fromlongitude) === 'string') || ((req.body.fromlongitude) instanceof String)) {
            res.status(400).send({ error: "From longitude", message: "From longitudemust be a decimal" });
        }
        //Organization id validation
        else if (req.body.toorgid == null) {
            res.status(400).send({ error: "From org id", message: "From org id paramter is missing" });
        } 
        //Date validation
        else if (req.body.date == null) {
            res.status(400).send({ error: "Date", message: "Date paramter is missing" });
        } else if (!((typeof(req.body.date) === 'string') || ((req.body.date) instanceof String))) {
            res.status(400).send({ error: "Date", message: "Date must be a string" });
        } else if ((req.body.date).trim().length === 0) {
            res.status(400).send({ error: "Date", message: "Date can't be empty" });
        } else if (!(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(req.body.date))) {
            res.status(400).send({ error: "Date", message: "Date is unvalid" });
        }else if(! (Date.parse(req.body.date)-Date.parse(new Date())>= 0)  && (!(isToday(req.body.date)))){ 
            console.log("hi")  
            res.status(400).send({ error: "Date", message: "Date can't be in the past" });
        }
        //Departure time validation
        else if (req.body.arrivaltime == null) {
        res.status(400).send({ error: "Arrival time", message: "Arrival time paramter is missing" });
        } else if (!((typeof(req.body.arrivaltime) === 'string') || ((req.body.arrivaltime) instanceof String))) {
            res.status(400).send({ error: "Arrival time", message: "Arrival time must be a string" });
        } else if ((req.body.arrivaltime).trim().length === 0) {
            res.status(400).send({ error: "Arrival time", message: "Arrival time can't be empty" });
        } else if (!(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(req.body.arrivaltime))) {
            res.status(400).send({ error: "Arrival time", message: "Arrival time is unvalid" });
        }else if(  (new Date() -  new Date((req.body.date.toString()) + " " + (req.body.arrivaltime).toString()))>0){
            res.status(400).send({ error: "Arrival time", message: "Arrival time can't be in the past" });
            
        }
        //Ride with validation
        else if (req.body.ridewith == null) {
            res.status(400).send({ error: "Ride with", message: "Ride with paramter is missing" });
        } else if (!((typeof(req.body.ridewith) === 'string') || ((req.body.ridewith) instanceof String))) {
            res.status(400).send({ error: "Ride with", message: "Ride with must be a string" });
        } else if ((req.body.ridewith).trim().length === 0) {
            res.status(400).send({ error: "Ride with", message: "Ride with can't be empty" });
        }
         //Smoking validation
        else if (req.body.smoking == null) {
            res.status(400).send({ error: "Smoking", message: "Smoking paramter is missing" });
        } else if (!((typeof(req.body.smoking) === 'string') || ((req.body.smoking) instanceof String))) {
            res.status(400).send({ error: "Smoking", message: "Smoking must be a string" });
        } else if ((req.body.smoking).trim().length === 0) {
            res.status(400).send({ error: "Smoking", message: "Smoking can't be empty" });
        }
        //Latest time
        else if (req.body.earliesttime == null) {
        res.status(400).send({ error: "Earliest time", message: "Earliest time paramter is missing" });
        } else if (!((typeof(req.body.earliesttime) === 'string') || ((req.body.earliesttime) instanceof String))) {
            res.status(400).send({ error: "Earliest time", message: "Earliest time must be a string" });
        } else if ((req.body.earliesttime).trim().length === 0) {
            res.status(400).send({ error: "Earliest time", message: "Earliest time can't be empty" });
        } else if (!(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(req.body.earliesttime))) {
            res.status(400).send({ error: "Earliest time", message: "Earliest time is unvalid" });
        }

        else {
            const rideData = {
                userid : decoded.id,
                fromlatitude:req.body.fromlatitude,
                fromlongitude:req.body.fromlongitude,
                toorgid:req.body.toorgid,
                date:req.body.date,
                arrivaltime:req.body.arrivaltime,
                ridewith:req.body.ridewith,
                smoking:req.body.smoking,
                earliesttime:req.body.earliesttime,
                status: "pending"
            }
            await requestRideTo.create(rideData).then(ride=>{
                  res.status(200).send( {message:"OK"});
            }).catch(errHandler);

        }
    }
});

module.exports = router;