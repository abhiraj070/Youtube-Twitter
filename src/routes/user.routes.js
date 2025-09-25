import { Router } from 'express'
import { loginUser, registerUser, logoutUser, refreshAccessToken, changeCurrentPsaaword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from '../controllers/user.controller.js'
import { upload } from '../middleware/multer.middleware.js' 
import { verifyJWT } from '../middleware/auth.middleware.js'

const router= Router()
router.route("/register").post(
    upload.fields([     //here upload is a middleware here which just uploads the users file on our local server. first the files will be stored in the local server then the method registeruser runs.
        {       //avatar and coverImage naam ka, field me ek member banana hai.
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

router.route("/change-password").patch(verifyJWT,changeCurrentPsaaword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(upload.single("Avatar"),verifyJWT,updateUserAvatar)

router.route("/coverImage").patch(upload.single("coverImage"),verifyJWT,updateUserCoverImage)






export default router