const bcrypt = require('bcrypt');
const db = require('../config/db');

const signup = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a dummy OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Insert the user into the database
        await db.promise().query(
            'INSERT INTO users (first_name, last_name, email, password, otp) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword, otp]
        );

        // Send a success response
        res.status(201).json({ message: 'User created successfully. Please verify your OTP.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signup };
