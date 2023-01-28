const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const router = express.Router();



module.exports = router;
