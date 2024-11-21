import express from "express"
import {isAuthenticated} from "../middlewares/isAuthenticated";
import { createPaymentRequest, getOrders, instamojoWebhook } from "../controller/order.controller";
const router = express.Router();

router.route("/").get(isAuthenticated, getOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createPaymentRequest);
router.route("/webhook").post(express.raw({type: 'application/json'}), instamojoWebhook);

export default router;