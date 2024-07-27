const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Generate JWT token
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    console.log('JWT_SECRET:', secret); // Add this line to verify
    return jwt.sign({ id }, secret, {
        expiresIn: '30d',
    });
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({ username, email, password });

        // Respond with user details and token
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Error during registration:', error.message); // Log detailed error
        res.status(500).json({ message: 'Server error' });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Respond with user details and token
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Error during login:', error.message); // Log detailed error
        res.status(500).json({ message: 'Server error' });
    }
};
