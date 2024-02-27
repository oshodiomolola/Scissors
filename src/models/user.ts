import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import shortid from 'shortid';
import validator from 'validator';

interface UserDocument extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo?: string;
  resetPasswordToken?: string;
  resetTimeExp?: Date;
  active: boolean;
  checkValidPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createResetToken(): Promise<string>;
}


const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: 'Invalid email address',
    },
  },

  photo: {
    type: String,
    trim: true,
    default: 'TackleDefaultPics.png',
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  resetPasswordToken: String,
  resetTimeExp: Date,
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.checkValidPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.createResetToken = async function (): Promise<string> {
  const resetToken = Math.floor(Math.random() * 1000000) + 1;
  const resetTokenStr = resetToken.toString();
  this.resetPasswordToken = resetTokenStr;
  this.resetTimeExp = new Date(Date.now() + 10 * 60 * 1000);

  return resetTokenStr;
};

const userModel: Model<UserDocument> = mongoose.model('User', userSchema);

export { userModel, UserDocument };
