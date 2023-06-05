const multer = require('multer')
const path = require('path');


module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".mp4" && ext !== ".mkv" && ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
            cb(new Error("File  type is not supported"), false);
            return
        }
        cb(null, true)
    }
})