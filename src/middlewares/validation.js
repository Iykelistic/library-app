import { body } from 'express-validator';

export const signupValidate = [
    body('email').exists().trim().isEmail().normalizeEmail().withMessage('Please enter a valid email'), 
    body('firstName').exists().trim().withMessage('Please enter your first name'), 
    body('lastName').exists().trim().withMessage('Please enter your lastname'), 
    body('username').exists().trim().withMessage('Please enter your username'),
    body('password').exists().trim().isLength({ min: 8 }).withMessage('Please enter a password with at least eight (8) characters')
];

export const loginValidate = [
    body('username').exists().trim().withMessage('Please enter your username'),
    body('password').exists().trim().isLength({ min: 8 }).withMessage('Please enter a password with at least eight (8) characters')
];

export const postValidate = [
    body('Title').exists().trim().withMessage('Please add the title of the book'),
    body('Author').exists().trim().withMessage('Please add an author to the book'),
    body('Description').exists().trim().withMessage('Please describe the book you want to add')
];

export const forgotPasswordValidate = [
    body('username').exists().trim().withMessage('Please enter your username')
];

export const resetPasswordValidate = [
    body('token').exists().trim().withMessage('Please enter your reset token'),
    body('password').exists().trim().isLength({ min: 8 }).withMessage('Please enter a password with at least eight (8) characters')
];

export const reviewValidate = [
    body('rating').exists().trim().isInt({ min: 1, max: 5 }).withMessage('Please enter a number between 1 and 5'),
    body('comment').exists().trim().withMessage('Please enter your comment')
]