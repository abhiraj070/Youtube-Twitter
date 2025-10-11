import { createTweet, getUserTweets, deleteTweets, updateTweets } from "../controllers/tweets.controller.js"
import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router=Router()

router.route("/create-tweet").post(verifyJWT,createTweet)

router.route("/:userId/tweets").get(verifyJWT,getUserTweets)

router.route("/:tweetId").patch(verifyJWT,updateTweets)

router.route("/:tweetId").delete(verifyJWT,deleteTweets)

export default router