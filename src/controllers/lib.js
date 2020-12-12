import { validationResult } from 'express-validator';
import { v2 as cloudinary } from 'cloudinary';
import db from '../dbconnection';


export const getBooks = (req, res) => {

    db.query('SELECT * FROM library', (error, rows) => {
        if (error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            })
        }

        return res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: rows
        });
    });
};

export const getBook = (req, res) => {
    return res.status(200).json({
        message: 'Book retrieved successfully',
        success: true,
        data: req.book
    });
};


export const addBook = (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
            success: false
        });
    }

   

    db.query('SELECT * FROM library WHERE Title = ? AND Author = ? AND Description = ?', 
    [req.body.Title, req.body.Author, req.body.Description], async(error, rows) => {
        if (error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            });
        }

        if (rows.length > 0) {
            return res.status(409).json({
                message: 'Book already exists',
                success: false
            });
        }

        if (!req.file.path.endsWith('.jpg') && !req.file.path.endsWith('.png') && !req.file.path.endsWith('jpeg')) {
            return res.status(400).json({
                message: 'File type must be jpg, png or jpeg',
                success: false
            });
        }
    
         //const filePathList = req.file.path.split('\\');
         //filePathList.shift();
         //const filePath = filePathList.join('\\');
    
         const result = await cloudinary.uploader.upload(req.file.path)
    

        db.query('INSERT INTO library (Title, Author, image_url, Description, Posted_By) VALUES(?, ?, ?, ?, ?)',
            [req.body.Title, req.body.Author, result.secure_url, req.body.Description, req.user.id],
            (error, rows) => {
                if (error) {
                    return res.status(500).json({
                        message: 'Server Error',
                        success: false,
                        error
                    })
                }
    

                return res.status(201).json({
                    message: 'Book added successfully',
                    success: true
                });
        });

    });
};

    export const updateBook = async(req, res) => {

        const { id } = req.params;


        const entries = {};

    if (req.body.Title && req.body.Title.trim()) entries.Title = req.body.Title;
    if (req.body.Author && req.body.Author.trim()) entries.Author = req.body.Author;

    let filePath = '';

    if (req.file) {
        if (!req.file.path.endsWith('.jpg') && !req.file.path.endsWith('.png') && !req.file.path.endsWith('jpeg')) {
            return res.status(400).json({
                message: 'File type must be jpg, png or jpeg',
                success: false
            });
        }
    
        // const filePathList = req.file.path.split('\\');
        // filePathList.shift();
        // filePath = filePathList.join('\\');

        const result = await cloudinary.uploader.upload(req.file.path);

        filePath = result.secure_url;
    }
   


    db.query('UPDATE library SET ? WHERE id = ?', [entries, id], (error, rows) => {
        if (error) {
            return res.status(500).json({
                message: 'Server Error',
                success: false,
                error
            })
        }

        return res.status(200).json({
            message: 'Book updated successfully',
            success: true
        });
    });
};

    export const deleteBook = (req, res) => {

        const { id } = req.params;

        /*const bookIndex = lib.findIndex(myuser => myuser.id === Number(id));

        lib.splice(bookIndex, 1);*/

        db.query('DELETE FROM library WHERE id = ?', [id], (error, rows) => {
            if (error) {
                return res.status(500).json({
                    message: 'Server Error',
                    success: false,
                    error
                })
            }
    
            return res.status(200).json({
                message: 'User deleted successfully',
                success: true
            });
        });
    }

    