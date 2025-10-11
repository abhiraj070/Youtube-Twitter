import { Router } from "express";
import {toggleSubscription, getUserChannelSubscribers, getSubscribedChannels} from "../controllers/subscription.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router= Router()

router.use(verifyJWT)

router.route("/toggle/:channelId").post(toggleSubscription)

router.route("/Channel/:channelId").get(getUserChannelSubscribers)

router.route("/channel/:channelId").get(getSubscribedChannels)

export default router