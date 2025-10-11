import { Router } from "express";
import { addComment, getAllComments, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router= Router()

router.route("/:videoId/comment").post(verifyJWT,addComment)

router.route("/:videoId/comment").get(getAllComments)

router.route("/:commentId/comment").post(updateComment)

router.route("/:commentId/comment").delete(deleteComment)

export default router