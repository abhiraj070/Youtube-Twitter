import { Router } from "express"
import {publishAVideo, getVideoById, updateVideoDetails, deleteVideo, togglePublish} from "../controllers/videos.controller"
import { verifyJWT } from "../middleware/auth.middleware"
import { upload } from "../middleware/multer.middleware"

const router=Router()

router.use(verifyJWT)

router.route("/publish-video").post(
        upload.fields([
            {
                name: videoFile,
                maxCount: 1 
            },
            {
                name: thumbnail,
                maxCount: 1
            }
        ]),
        publishAVideo
    )

router.route("/video/:videoId").get(getVideoById)

router.route("/video/:videoId").patch(updateVideoDetails)

router.route("/video/:videoId").delete(deleteVideo)

router.route("/publish/:videoId").patch(togglePublish)

export default router