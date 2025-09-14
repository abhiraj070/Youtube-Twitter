import { Router } from 'express'
import { registeruser } from '../controllers/user.controller.js'
import { upload } from '../middleware/multer.middleware.js' 

const router= Router()

router.route("/register").post(
    upload.fields([     //this upload is a middleware here which just uploads the users file on our local server
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registeruser
)

export default router