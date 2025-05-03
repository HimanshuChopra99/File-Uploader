const express = require('express')
const { localFileUpload, imageUpload, videoUplode } = require('../controllers/FIleUpload')
const router = express.Router()

router.post("/localFileUpload", localFileUpload)
router.post("/imageUpload", imageUpload)
router.post("/videoUpload", videoUplode)


module.exports = router 