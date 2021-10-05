const express = require('express');

const router = express.Router();

const controller = require('../controllers.js/accountController');

const auth = require('../middlewares/auth');

const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    // Storage title
    destination: 'public/uploads/',
    // Generate a unique name for the avatar
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    // Max file size
    limits: { fileSize: 1024 * 1024 },
    // Files storage
    storage: storage ,
    // Checking the type of the uploaded file
    fileFilter: (req, file, cb) => {
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname)  return cb(null, true);
        cb(new Error('this file is not allowed'));
    },
});

router.post('/', [auth.authenticated, upload.single('avatar')], controller.profile);

router.post('/password', auth.authenticated, controller.password);

module.exports = router;