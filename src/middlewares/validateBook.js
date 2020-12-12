const validateBook = (req, res, next) => {
    if(!req.body.Title || req.body.Title.trim() === '') {
        res.status(400).json({
            message: 'You must enter the title of the book',
            success: false
        });
    } else if(!req.body.Author || req.body.Author.trim() === '') {
        res.status(400).json({
            message: 'You must enter the author of the book',
            success: false
    });
        }  else if(!req.body.Description || req.body.Description.trim() === '') {
            res.status(400).json({
                message: 'You must enter the description of the book',
                success: false
        });
    }
    else {
        next();
    }
};
export default validateBook;