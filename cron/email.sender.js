const moment = require("moment/moment");
const mongoose = require("mongoose");
const documentModel = require("../models/document");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const path = require('path')
dotenv.config({path: path.resolve(__dirname, '../.env')})

const connectDatabase = async () => {
    return await mongoose.connect(process.env.MONGOOSE_CONNECTION);
}


connectDatabase().then(connection => {

    document = documentModel.DocumentSchema(connection)
    document.find({
        expire: {$lte: moment(Date.now(), "x").add(1, 'month').format('X')},
        isSend: false
    }).exec().then(async documents => {

        if (documents.length !== 0) {

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,//email here
                    pass: process.env.EMAIL_PASSWORD//app key here
                }
            });
            let successIds = [];

            for (let i = 0; i < documents.length; i++) {
                try {
                    const mailOptions = {
                        from: process.env.EMAIL,//email
                        to: documents[i].email,
                        subject: 'Document Expiration',
                        text: `Your document ${documents[i].documentTitle} will expire within one month`
                    };

                    await transporter.sendMail(mailOptions);
                    successIds.push(documents[i]._id)

                } catch (error) {
                    console.log('Error on send', error)
                }
            }
            if (successIds.length > 0) {
                await document.updateMany({_id: {$in: successIds}}, {$set: {isSend: true}}).exec();
            }
        }
    })
})



