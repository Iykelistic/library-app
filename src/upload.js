import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destinaton: (req, file, callback) => {
            callback(null, 'public/uploads/');
       },

        filename: (req, file, callback) => {
                 const filenameParts = file.originalname.split('.');
                 const ext = filenameParts[filenameParts.length - 1];
                callback(null, `upload-${Date.now()}.${ext}`);
               }
    }),

    fileFilter: (req, file, callback) => {
        const filenameParts = file.originalname.split('.');
        const ext = filenameParts[filenameParts.length - 1];
        if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }

})

export default upload;