import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import db from '../dbconnection';

dotenv.config();

export const addreview = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            success: false,
        });
    }


    db.query('INSERT INTO reviews (rating, comment, book_id, created_at, posted_by, updated_at) VALUES (?, ?, ?, ?, ?, ?)', 
    [Number(req.body.rating), req.body.comment, req.params.id, new Date(), req.user.username, new Date()], (error, row) => {
        if(error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            })
        }

        db.query('SELECT * FROM auth WHERE username = ?', [req.body.username], (error, rows) => {
            if(error) {
                return res.status(500).json({
                    message: 'Server Error',
                    success: false,
                    error
                })
            }
      
        })

        return res.status(201).json({
            message: 'Review added successfully',
            success: true
        })
    })
}


export const getReview = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            success: false,
        });
    }

    db.query('SELECT * FROM reviews', (error, rows) => {
        if(error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            });
        }

        if(rows.length < 1) {
            return res.status(400).json({
                message: 'The review to this book does not exists',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Review retrieved successfully',
            success: true,
            data: rows
        })
    })
}


export const updateReview = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            success: false,
        });
    }

    const { id } = req.params;
    const entries = {rating: req.body.rating,
                    comment: req.body.comment};

        if(Object.keys(entries).length < 1) {
            return res.status(400).json({
               message: 'Enter a rating and a comment' ,
               success: false,
            })
        }

    db.query('UPDATE reviews SET ? WHERE id = ?', [entries, Number(id)], (error, rows) =>{
        if(error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            })
        }

        if(rows.length < 1) {
            return res.status(400).json({
                message: 'The review you want to update does not exists',
                success: false,
            })
        }

        return res.status(200).json({
            message: 'Review updated successfully',
            success: true,
            
        })
    })
}

export const deleteReview = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            success: false,
        });
    }

    const { id } = req.params;

    db.query('DELETE FROM reviews WHERE id = ?', [id], (error, rows) => {
        if(error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            });
        }

        if(rows.length < 1) {
            return res.status(400).json({
                message: 'The review you want to delete does not exists',
                success: false,
            });
        }

        return res.status(200).json({
            message: 'review deleted successfully',
            success: true,
        })
    })
}

