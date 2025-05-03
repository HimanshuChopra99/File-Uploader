const cloudinary = require("cloudinary").v2
const {File} = require("../models/File")


exports.localFileUpload = async(req, res) => {
    try{
        const file = req.files.file

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        file.mv(path, (err) => {
            console.log(err)
        }) 

        res.json({
            success: true,
            msg: "Local file uploaded successfully"
        })
    }
    catch(err) {
        console.log(err)
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type)
} 

async function uploadFileToCloudinary(file, folder, resource_type = "auto") {
    const options = {
        folder,
        quality: "10",
        resource_type
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;

        const file = req.files.imageFile

        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split(".")[1].toLowerCase();


        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                msg: "File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "FileUploader", "image")
        const imageUrl = response.secure_url

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl
        })

        res.json({
            imageUrl: response.secure_url,
            msg: "Image upload successfully"
        })

    }
    catch(err) {
        res.status(400).json({
            msg: "Error in uploading in db and cloudinary", err
        })
    }
}

exports.videoUplode = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.videoFile;

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(fileType, file)

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                msg: "File format not supported"
            })
        }

        const maxSize = 5 * 1024 * 1024 //limit to 5mb 

        if(file.size > maxSize) {
            return res.status(400).json({
                msg: "File size is lager than 5mb."
            })
        }
        console.log("jfhsief")

        const response = await uploadFileToCloudinary(file, "FileUploader", "video")

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            msg: "Video upload successfully"
        })

    }
    catch(err){
        res.status(400).json({
            msg: "Error in video uploding"
        })
    }
}

exports.imageSizeReducer = async (req, res) => {
    try{
        const {name, tags, email} = req.body;

        const file = req.files.imageFile

        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                msg: "File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "FileUploader", "image")
        const imageUrl = response.secure_url

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl
        })

        res.json({
            imageUrl: response.secure_url,
            msg: "Image upload successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            msg: "Error in size reducing"
        })
    }
}