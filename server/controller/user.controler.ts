import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = "Sanjay"; // generateVerification()

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    // generateToken(req,user)

    // await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // generateToken(res, user)
    user.lastLogin = new Date();
    await user.save();

    // Send User Without Password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;

    // Use findOne instead of find to return a single user
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    // Check if the user was found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Now safely update the user object
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save(); // Save the updated user to the database

    //   await sendWelcomeEmail(user.email, user.fullname)

    return res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // for 1 hr
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send email
    // await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${token}`)

    return res.status(200).json({
      success: true,
      message: "Password reset link set to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
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
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    // Save the updated user
    await user.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req:Request, res:Response) => {
    try {
        const userId = req.id
        const user = await User.findById(userId).select("-password")
        if(!user){
          return res.status(404).json({
            success: false,
            message: 'User not found'
          })
        }
        return res.status(200).json({
           success: true,
           user
        });
    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req:Request, res:Response) => {
  try {
    const userId = req.id;
    const {fullname, email, address, city, country, profilePitcure} = req.body
    // upload image on cloudinary
    let cloudResponse:any
      cloudResponse = await cloudinary.uploader.upload(profilePitcure)
      const updatedData = {fullname, email, address, city, country, profilePitcure}

      const user = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password")
      return res.status(200).json({
        success:true,
        user,
        message: "Profile updated successfully"
      })

  } catch (error) {
    
  }
}