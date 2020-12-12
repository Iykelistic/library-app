const checkId = (req, res, next) => {
    if (Number.isNaN(Number(req.params.id))) {
        res.status(400).json({
            message: 'The ID you entered is invalid',
            success: false
        });
    } else {
        next();
    }
};

export default checkId