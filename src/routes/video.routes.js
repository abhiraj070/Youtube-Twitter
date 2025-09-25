import { Router } from "express"
import {publishAVideo, getVideoById, updateVideoDetails} from "../controllers/videos.controller"
import { verifyJWT } from "../middleware/auth.middleware"
import { upload } from "../middleware/multer.middleware"

const router=Router()

router.route("/publish-video").post(
        verifyJWT,
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

router.route("/:videoId/video").get(verifyJWT, getVideoById)

router.route("/:videoId/video").patch(verifyJWT, updateVideoDetails)

