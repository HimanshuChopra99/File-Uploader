
exports.localFileUpload = async(req, res) => {
    try{
        const file = req.file.file
        console.log(file)
    }
    catch {

    }
}