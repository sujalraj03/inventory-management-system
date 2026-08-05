const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req,file,cb)=>{
        cb(null,"uploads/products");
    },

    filename:(req,file,cb)=>{

        const uniqueName=Date.now()+"-"+Math.round(Math.random()*1E9);

        cb(
            null,
            uniqueName+path.extname(file.originalname)
        );
    }

});

const fileFilter = (req, file, cb) => {

    console.log("Original Name:", file.originalname);
    console.log("MIME Type:", file.mimetype);

    const allowedExtensions = /\.(jpg|jpeg|png)$/i;

    if (
        file.mimetype.startsWith("image/") ||
        allowedExtensions.test(file.originalname)
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};
const upload=multer({
    storage,
    fileFilter
});

module.exports=upload;