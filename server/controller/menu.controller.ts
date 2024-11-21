import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import {Menu} from "../models/menu.model";
import { Marketplace } from "../models/marketplace.model";
import mongoose, { ObjectId } from "mongoose";

export const addMenu = async (req:Request, res:Response): Promise<void> => {
    try {
        const {name, description, price} = req.body;
        const file = req.file;
        if(!file){
             res.status(400).json({
                success:false,
                message:"Image is required"
            }); return
        };
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const menu: any = await Menu.create({
            name , 
            description,
            price,
            image:imageUrl
        });
        const marketplace = await Marketplace.findOne({user:req.id});
        if(marketplace){
            (marketplace.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
            await marketplace.save();
        }

         res.status(201).json({
            success:true,
            message:"Menu added successfully",
            menu
        }); return
    } catch (error) {
        console.log(error);
         res.status(500).json({message:"Internal server error"}); 
    }; return
}
export const editMenu = async (req:Request, res:Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {name, description, price} = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if(!menu){
             res.status(404).json({
                success:false,
                message:"Menu not found!"
            }); return
        }
        if(name) menu.name = name;
        if(description) menu.description = description;
        if(price) menu.price = price;

        if(file){
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }
        await menu.save();

         res.status(200).json({
            success:true,
            message:"Menu updated",
            menu,
        }); return
    } catch (error) {
        console.log(error);
         res.status(500).json({message:"Internal server error"}); 
    }; return
}