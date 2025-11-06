import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js'
import { validationResult } from 'express-validator';


// register new user

export const register = async (req, res) => {
  try{
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }

    const {email, password, name } = req.body;

    // check user if already axists

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({message: 'User already exists'});
    }

    // create new user

    user = new User({
      email,
      password,
      name
    });

    await user.save();

    // generate JWT token
    
    const token = jwt.sign(
      {userId: user._id},
      process.env.ACCESS_SECRET,
      { expiresIn: '24h'}
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  }catch (error) {
    console.error('Resgister error:', error);
    res.status(500).json({message: 'Server error'});
  }
};

// Login user

export const login = async (req, res) => {
  try{
    const error = validationResult(req);
    if (!error.isEmpty()){
      return res.status(400).json({error: errors.array() });
    }

    const { email, password } = req.body;

    // check is user exists

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    // chck if password is correct
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'invalid credentials'});
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user:{
        id: user.Id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({message: 'Server error'});
  }
};

// Get current user

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

