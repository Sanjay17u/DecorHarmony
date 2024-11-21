import { Request, Response } from "express";
import { Marketplace } from "../models/marketplace.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";


export const createMarketplace = async (req: Request, res: Response) => {
    try {
        const { productName, productCategory, productSKU, stockQuantity, productPrice } = req.body;
        const file = req.file;
 

        const marketplace = await Marketplace.findOne({ user: req.id });
        if (marketplace) {
            return res.status(400).json({
                success: false,
                message: "Marketplace already exist for this user"
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
            message: "Marketplace Added"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const getMarketplace = async (req: Request, res: Response) => {
    try {
        const marketplace = await Marketplace.findOne({ user: req.id }).populate('menus');
        if (!marketplace) {
            return res.status(404).json({
                success: false,
                marketplace:[],
                message: "Marketplace not found"
            })
        };
        return res.status(200).json({ success: true, marketplace });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const updateMarketplace = async (req: Request, res: Response) => {
    try {
        const { productName, productCategory, productSKU, stockQuantity, productPrice } = req.body;
        const file = req.file;
        const marketplace = await Marketplace.findOne({ user: req.id });
        if (!marketplace) {
            return res.status(404).json({
                success: false,
                message: "Marketplace not found"
            })
        };
        marketplace.productName = productName;
        marketplace.productCategory = JSON.parse(productCategory);
        marketplace.productSKU = productSKU;
        marketplace.stockQuantity = stockQuantity;
        marketplace.productPrice = productPrice;

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            marketplace.imageUrl = imageUrl;
        }
        await marketplace.save();
        return res.status(200).json({
            success: true,
            message: "Marketplace updated",
            marketplace
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const getMarketplaceOrder = async (req: Request, res: Response) => {
    try {
        const marketplace = await Marketplace.findOne({ user: req.id });
        if (!marketplace) {
            return res.status(404).json({
                success: false,
                message: "Marketplace not found"
            })
        };
        const orders = await Order.find({ marketplace: marketplace._id }).populate('marketplace').populate('user');
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        order.status = status;
        await order.save();
        return res.status(200).json({
            success: true,
            status:order.status,
            message: "Status updated"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const searchMarketplace = async (req: Request, res: Response) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCategory = (req.query.selectedCategory as string || "").split(",").filter(Category => Category);
        const query: any = {};
        // basic search based on searchText (name ,city, country)
        console.log(selectedCategory);
        
        if (searchText) {
            query.$or = [
                { productName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }
        // filter on the basis of searchQuery
        if (searchQuery) {
            query.$or = [
                { productName: { $regex: searchQuery, $options: 'i' } },
                { productCategory: { $regex: searchQuery, $options: 'i' } }
            ]
        }
        // console.log(query);
        // ["Glass", "Lamp"]
        if(selectedCategory.length > 0){
            query.productCategory = {$in:selectedCategory}
        }
        
        const marketplace = await Marketplace.find(query);
        return res.status(200).json({
            success:true,
            data:marketplace
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}



export const getSingleMarketplace = async (req:Request, res:Response) => {
    try {
        const marketplaceId = req.params.id;
        const marketplace = await Marketplace.findById(marketplaceId).populate({
            path:'menus',
            options:{createdAt:-1}
        });
        if(!marketplace){
            return res.status(404).json({
                success:false,
                message:"Marketplace not found"
            })
        };
        return res.status(200).json({success:true, marketplace});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}