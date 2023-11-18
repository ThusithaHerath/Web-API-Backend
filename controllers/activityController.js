const db = require("../config/mongo.init");
const Activity = require("../models/activity");
const multer = require("multer");
const path = require("path");

//image location
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "storage/activity");
    },
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

var upload = multer({
    storage: storage,
}).single("image");

exports.newActivity = async (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while uploading the image.",
          });
        } else if (err) {
          return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while uploading the image.",
          });
        }

    let { destination, date, typeOfActivity, price, starRating, title, description, image, age } = req.body;

    if (!destination || !date || !typeOfActivity || !price  || !title || !description || !age) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newActivity = new Activity({
        destination,
        date,
        typeOfActivity,
        price,
        starRating,
        title,
        description,
        image: req.file.filename,
        age
    });
    newActivity.save().then(result => {
        res.status(200).json({
            status: "SUCCESS",
            message: "New activity added successfully",
            data: result,
        })
    }).catch(err => {
        res.status(500).json({
            status: "FAILED",
            message: "An error occured while saving activity !"
        })
    })
})
};

exports.filter = async (req, res) =>{
    try{
        const activities = await Activity.find(req.query)

        res.status(200).json({
            status: "SUCCESS",
            length: activities.length,
            data:{
                activities
            }
        })
    }catch(err) {
        res.status(500).json({
            status: "FAILED",
            message: err.message
        })
    }
};

