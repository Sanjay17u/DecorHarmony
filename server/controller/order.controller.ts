import { Request, Response } from "express";
import { Marketplace } from "../models/marketplace.model";
import { IOrder, Order } from "../models/order.model";
import Instamojo from 'instamojo-nodejs';


Instamojo.setKeys(process.env.INSTA_API_KEY!, process.env.INSTA_PRIVATE_KEY!);
Instamojo.isSandboxMode(true);


type CheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string
    },
    marketplaceId: string
}

export const createPaymentRequest = async (req: Request, res: Response) => {
    try {
        const { amount, purpose, redirectUrl, cartItems } = req.body;

        // Create line items for the payment
        const lineItems = createLineItems(cartItems); 

        // Create payment data object
        const data = new Instamojo.PaymentData();
        data.setAmount(amount * 100); 
        data.setPurpose(purpose);
        data.setRedirectUrl(redirectUrl);
        data.setSendEmail(true);

        // Create payment request
        Instamojo.createPaymentRequest(data, (error: any, response: any) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Error creating payment request', error });
            } else {
                const paymentUrl = response.payment_request.longurl;
                return res.status(200).json({ success: true, message: 'Payment request created', paymentUrl });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const createLineItems = (cartItems: CheckoutSessionRequest['cartItems']) => {
    return cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit_price: item.price * 100,  
        total_price: item.price * item.quantity * 100, 
    }));
};


export const getOrders = async (req: Request, res: Response) => {
    try {
        // Assuming req.id is the user id
        const orders = await Order.find({ user: req.id }).populate('user').populate('marketplace');
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const instamojoWebhook = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const paymentStatus = data.payment_status; 
        const paymentRequestId = data.payment_request_id; 
        const orderId = data.custom_fields[0];

        
        if (paymentStatus === 'Credit') {
            
            const order = await Order.findById(orderId) as IOrder;

            
            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            
            order.status = 'confirmed';  
            order.paymentStatus = 'successful'; 
            order.paymentRequestId = paymentRequestId; 
            order.totalAmount = data.amount;  

            // Save the updated order
            await order.save();

            return res.status(200).json({ success: true, message: 'Payment confirmed and order updated' });
        } else {
            
            const order = await Order.findById(orderId);

            
            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            
            order.status = 'failed';  
            order.paymentStatus = 'failed';

            
            await order.save();

            return res.status(200).json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


