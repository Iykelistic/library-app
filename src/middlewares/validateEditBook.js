const validateEditBook = (req, res, next) => {

    if(!!req.body.Title && req.body.Title.trim() === '') {
        res.status(400).json({
            message: 'You must enter a title of the book',
            success: false
        });
    }
    else if(!!req.body.Author && req.body.Author.trim() === '') {
        res.status(400).json({
            message: 'You must enter an author of the book',
            success: false
        });
    }
    else if(!!req.body.Description && req.body.Description.trim() === '') {
        res.status(400).json({
            message: 'You must enter the decsription of the book',
            success: false
        });
    } else {
        next();
    }
};
export default validateEditBook;