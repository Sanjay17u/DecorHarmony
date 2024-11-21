import { Request, Response } from "express";
import { Marketplace } from "../models/marketplace.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";


export const createMarketplace = async (req: Request, res: Response) => {
    try {
        const { productName, productCategory, productSKU, stockQuantity, productPrice } = req.body;
        const file = req.file;
 

        const restaurant = await Marketplace.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Marketplace.create({
            user: req.id,
            productName,
            productCategory:JSON.parse(productCategory),
            productSKU,
            stockQuantity,
            productPrice,
            imageUrl
        });
        return res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}