import { Router } from "express";
import {toggleSubscription, getUserChannelSubscribers, getSubscribedChannels} from "../controllers/subscription.controller"
import { verifyJWT } from "../middleware/auth.middleware";

const router= Router()

router.use(verifyJWT)

router.route("/toggle/:channelId").post(toggleSubscription)

router.route("/Channel/:channelId").get(getUserChannelSubscribers)

router.route("/channel/:channelId").get(getSubscribedChannels)

export default router