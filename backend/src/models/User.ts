import mongoose, { Document, Schema } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
  name: string;
  text: string;
  age: number;
  createdAt: Date;
}

// Create the User schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age must be a positive number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the User model
export default mongoose.model<IUser>('User', UserSchema);