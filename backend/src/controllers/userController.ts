import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Public
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, text, age } = req.body;
    
    // Validate request body
    if (!name || !text || age === undefined) {
      res.status(400).json({ message: 'Please provide name, text, and age' });
      return;
    }
    
    const user = await User.create({
      name,
      text,
      age
    });
    
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, text, age } = req.body;
    
    // Find user by id
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Update user fields
    user.name = name || user.name;
    user.text = text || user.text;
    user.age = age !== undefined ? age : user.age;
    
    const updatedUser = await user.save();
    
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    await user.deleteOne();
    
    res.status(200).json({ message: 'User removed' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};