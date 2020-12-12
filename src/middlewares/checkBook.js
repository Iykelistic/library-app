import db from '../dbconnection';

const checkBook = (req, res, next) => {
    
    const { id } = req.params;

    db.query('SELECT * FROM library WHERE id = ?', [Number(id)], (error, rows) => {
        if (error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            });
        }

        if (rows.length < 1) {
            res.status(404).json({
                message: 'User does not exist',
                success: false
            });
        }

        else {
            req.book = rows[0];
        next();
    }
});
};
export default checkBook;