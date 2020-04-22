const User = require('../../models/users');
const Review = require('../../models/reviews')
const Driver = require('../../models/drivers');
const Rider = require('../../models/riders');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const regex = require('regex');
const bcrypt = require('bcrypt')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post('/', async(req, res) => {
    var ReviewsArr = {}
    var count = 0
    var decoded;
    try {
        decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY)
    } catch (e) {
        res.status(401).send({ message: "You aren't authorized to view user profile" })
        res.end();
    }
    await User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
            if (user) {
                Review.findAll({
                        where: {
                            revieweduserid: user.id
                        }
                    }).then(reviews => {
                        if (reviews.length > 0) {
                            reviews.forEach(review => {
                                if (review) {
                                    Driver.findOne({
                                        where: {
                                            tripid: review.tripid,
                                            driverid: review.revieweduserid
                                        }
                                    }).then(driver => {
                                        if (driver) {
                                            ReviewsArr[count] = ({ type: "driver", "review": review.review })
                                            count++;
                                            if (count === reviews.length) {
                                                console.log("COUNT", count)
                                                res.send(ReviewsArr)
                                            }

                                        } else {
                                            Rider.findOne({
                                                where: {
                                                    tripid: review.tripid,
                                                    riderid: review.revieweduserid
                                                }
                                            }).then(rider => {
                                                if (rider) {
                                                    ReviewsArr[count] = ({ type: "rider", "review": review.review })
                                                    count++;
                                                    if (count === reviews.length) {
                                                        console.log("COUNT", count)
                                                        res.send(ReviewsArr)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        } else {
                            res.send({ message: "No Reviews for this user" })
                            res.end()
                        }
                    })
                    .catch(err => {
                        console.log('error: ' + err)
                    })
            } else {
                res.status(404).send({ message: "User not found" })
                res.end()
            }
        }

    ).catch(err => {
        console.log('error :' + err)
    })
})

module.exports = router