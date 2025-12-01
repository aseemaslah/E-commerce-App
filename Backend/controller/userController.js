const User = require('../models/userModel');



const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email && !password) {
            return res.status(400).json({ message: 'Name / email and password are required' });
        }

        const user = new User({ name, email, password })

        await user.save();

        res.status(201).json({ message: 'User added succesfully', user });
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users fetched successfully', users });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addUser,
    getUsers
}