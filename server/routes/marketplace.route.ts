import express from "express"
import { createMarketplace, getMarketplace, getMarketplaceOrder, getSingleMarketplace, searchMarketplace, updateMarketplace, updateOrderStatus } from "../controller/marketplace.controller";
import upload from "../middlewares/multer";
import {isAuthenticated} from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("imageFile"), createMarketplace);
router.route("/").get(isAuthenticated, getMarketplace);
router.route("/").put(isAuthenticated, upload.single("imageFile"), updateMarketplace);
router.route("/order").get(isAuthenticated,  getMarketplaceOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchMarketplace);
router.route("/:id").get(isAuthenticated, getSingleMarketplace);

export default router;