import mongoose from 'mongoose'

export interface IMarketplace {
    user: mongoose.Schema.Types.ObjectId
    productName: string
    productCategory: string[];
    productSKU: string;
    stockQuantity: Number;
    productPrice: Number
    imageUrl: string 
    menus:mongoose.Schema.Types.ObjectId[]
}


export interface IMarketplaceDocument extends IMarketplace, Document {
    createdAt:Date;
    updateAt:Date;
}

const marketplaceSchema = new mongoose.Schema<IMarketplaceDocument>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productCategory:[{
        type:String,
        required:true
    }],
    productSKU:{
        type:String,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    menus:[{type:mongoose.Schema.Types.ObjectId, ref:'Menu'}],
    
})

export const Marketplace = mongoose.model("Marketplace", marketplaceSchema)