import mongoose from "mongoose";

type DeliveryDetails = {
  email: string;
  name: string;
  address: string;
  city: string;
};

type CartItems = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  marketplace: mongoose.Schema.Types.ObjectId;
  deliverydetails: DeliveryDetails;
  cartItems: CartItems;
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    marketplace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "marketplace",
      required: true,
    },
    deliverydetails: {
      email:{type:String, required:true}, 
      name:{type:String, required:true},
      address:{type:String, required:true},
      city:{type:String, required:true} 
    },
    cartItems:[
        {
            menuID: {type:String, required:true},
            name: {type:String, required:true},
            Image: {type:String, required:true},
            price: {type:Number, required:true},
            quantity: {type:Number, required:true},
        }
    ],
    totalAmount:Number,
    status:{
        type:String,
        enum:["pending" , "confirmed" , "preparing" , "outfordelivery" , "delivery"],
        required:true
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
