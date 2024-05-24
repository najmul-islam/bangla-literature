const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");
const path = require("path");

const avatarUpload = asyncHandler(async (req, res, next) => {
  if (req?.files?.avatar) {
    const avatar = req.files.avatar;
    const name = req.name;

    //   if (!avatar) {
    //     res.status(400);
    //     throw new Error("Please add a avatar");
    //   }

    const extension = path.extname(avatar.name);

    // check file format
    const allowedExtensions = /^\.jpg|\.jpeg|\.png$/;
    if (!allowedExtensions.test(extension)) {
      res.status(400);
      throw new Error(
        `File format ${extension} not supported. Allowed formats are: jpg, png`
      );
    }

    // change name
    let avatarName;

    // avatarName = name.split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/).join("-");

    try {
      const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
        folder: "avatars",
        public_id: name,
        quality: "auto",
      });

      if (result) {
        fs.unlink(avatar.tempFilePath, (error) => {
          if (error) console.log(error);
        });
      }

      req.avatar = result.secure_url;
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  } else next();
});

module.exports = avatarUpload;
