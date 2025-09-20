import { Router } from 'express'
import { loginUser, registerUser, logoutUser, testing } from '../controllers/user.controller.js'
import { upload } from '../middleware/multer.middleware.js' 
import { verifyJWT } from '../middleware/auth.middleware.js'

const router= Router()
router.route("/register").post(
    upload.fields([     //here upload is a middleware here which just uploads the users file on our local server. first the files will be stored in the local server then the method registeruser runs.
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)


router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)

export default router