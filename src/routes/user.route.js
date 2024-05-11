import { Router } from "express";
import { loginUser, logoutUser, registerUser, RefreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
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

 // secured routes 
  router.route("/logout").post(verifyJWT, logoutUser)
   
   router.route("/refreshToken").post(RefreshAccessToken)
    router.route("/changePassword").post(verifyJWT, changeCurrentPassword)
    router.route("/currentUser").get(verifyJWT, getCurrentUser)
    router.route("/updateAccount").patch(verifyJWT, updateAccountDetails)
    router.route("/updateAvatar").patch(verifyJWT,upload.single("avatar"), updateUserAvatar)
export default router