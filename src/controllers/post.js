import { validationResult } from 'express-validator';
import db from '../dbconnection';

export const addBook = (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            success: false
        });
    }
    
    db.query('INSERT INTO library (Title, Author, Description, Posted_By) VALUES(?, ?, ?, ?)',
     [req.body.Title, req.body.Author, req.body.Description, req.params.id], (error, rows) => {
         
         if(error) {
             return res.status(500).json({
                 message: 'Server Error',
                 success: false,
                 error
             });
         }
        

         return res.status(201).json({
             message: 'Book posted successfuly',
             success: true
         });
     });
}