import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
      return; // End the function here
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    generateToken(res, user);

    await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select("-password");
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
       res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
      return
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password as string);
    if (!isPasswordMatch) {
       res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
      return
    }

    generateToken(res, user);
    user.lastLogin = new Date();
    await user.save();

    // Send User Without Password
    const userWithoutPassword = await User.findOne({ email }).select("-password");
    
     res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
    return
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "Internal Server Error" });
  }
  return
};



export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { verificationCode } = req.body;

    // Use findOne instead of find to return a single user
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    // Check if the user was found
    if (!user) {
       res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
      return
    }

    // Now safely update the user object
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save(); // Save the updated user to the database

    await sendWelcomeEmail(user.email as string, user.fullname as string)

     res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user,
    }); return
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "Internal Server Error" });
  } return
};


export const logout = async (_: Request, res: Response): Promise<void> => {
  try {
     res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully.",
    }); return
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "Internal Server Error" });
  } return
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
       res.status(400).json({
        success: false,
        message: "User doesn't exist",
      }); return
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // for 1 hr
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send email
    await sendPasswordResetEmail(user.email as string, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`)

     res.status(200).json({
      success: true,
      message: "Password reset link set to your email",
    }); return
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "Internal Server Error" });
  } return
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Find the user based on the reset token and its expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    // Check if the user exists or the token is invalid/expired
    if (!user) {
       res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      }); return
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    // Save the updated user
    await user.save();

    await sendResetSuccessEmail(user.email as string)

    // Send success response
     res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    }); return
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "Internal Server Error" });
  } return
};

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const userId = req.id;
      const user = await User.findById(userId).select("-password");
      
      if (!user) {
          res.status(404).json({
              success: false,
              message: 'User not found'
          });
          return; // Function should end here
      }
      
      res.status(200).json({
          success: true,
          user
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req:Request, res:Response): Promise<void> => {
  try {
    const userId = req.id;
    const {fullname, email, address, city, country, profilePitcure} = req.body
    // upload image on cloudinary
    let cloudResponse:any
      cloudResponse = await cloudinary.uploader.upload(profilePitcure)
      const updatedData = {fullname, email, address, city, country, profilePitcure}

      const user = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password")
       res.status(200).json({
        success:true,
        user,
        message: "Profile updated successfully"
      })
      return

  } catch (error) {
    
  }
}