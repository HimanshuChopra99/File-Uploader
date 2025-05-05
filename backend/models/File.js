const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config()

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware
fileSchema.post('save', async function(doc) {
  try{
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    let info = await transporter.sendMail({
      from: `CodeHelp`,
      to: doc.email,
      subject:"File uploaded successfully",
      html: `<h2>Hello Jee</h2> <p>File Uploaded, View Here: <a href= "${doc.imageUrl}">${doc.tags}</a> </p>`
    })

    console.log(info);
  }
  catch(err) {
    console.log("Failed to sent email", err)
  }
})

const File = mongoose.model("File", fileSchema);
module.exports = {
  File,
};
