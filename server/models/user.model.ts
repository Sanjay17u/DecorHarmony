import mongoose from 'mongoose';

export interface IUser {
    fullname:String;
    email:String;
    password:String;
    contact:number;
    address:String;
    city:String;
    country:String;
    profilePiture:String;
    admin:Boolean;
    lastLogin?: Date;
    isVerified?: Boolean; 
    resetPasswordToken?: String;
    resetPasswordTokenExpiresAt?: Date
    verificationToken?: String
    verificationTokenExpiresAt?: Date

}

export interface IUserDocument extends IUser, Document {
    createdAt:Date;
    updateAt:Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        default: "Update your address"
    },
    city:{
        type:String,
        default: "Update your city"
    },
    country:{
        type:String,
        default: "Update your city"
    },
    profilePiture:{
        type:String,
        default: ""
    },
    admin:{
        type:Boolean,
        default: false
    },

    // advance authentication

    lastLogin:{
        type:Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date, 
}, {timestamps:true})

export const User = mongoose.model("User", userSchema)