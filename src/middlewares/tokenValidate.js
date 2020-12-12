import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../dbconnection';

dotenv.config();

const tokenValidate = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ').length < 2) {
        return res.status(401).json({
            message: 'Authentication token not found',
            success: false
        })
    } else {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token verification failed',
                    success: false
                });
            }

            db.query('SELECT * FROM auth WHERE username = ?', [decoded.username], (error, rows) => {
                if(error) {
                    return res.status(500).json({
                        message: 'Server Error',
                        success: false,
                        error
                    })
                }
                if (rows.length > 0) {
                    req.user = rows[0];
                    next();
                } else {
                    return res.status(404).json({
                        message: 'User not found',
                        success: false
                    });
                }
            });
        });
    }
};

export default tokenValidate;