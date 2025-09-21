import { Router } from 'express'
import { loginUser, registerUser, logoutUser, refreshAccessToken, changeCurrentPsaaword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from '../controllers/user.controller.js'
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

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPsaaword)

router.route("/current-user").post(verifyJWT,getCurrentUser)

router.route("/update-account").post(verifyJWT,updateAccountDetails)

router.route("/avatar").post(upload.single("Avatar"),verifyJWT,updateUserAvatar)

router.route("/coverImage").post(upload.single("coverImage"),verifyJWT,updateUserCoverImage)






export default router