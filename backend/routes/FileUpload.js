const express = require('express')
const { localFileUpload } = require('../controllers/FIleUpload')
const router = express.Router()

router.post("/localFileUpload", localFileUpload)

module.exports = router 