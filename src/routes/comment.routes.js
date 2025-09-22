import { Router } from "express";
import { addComment, getAllComments, updateComment, deleteComment } from "../controllers/comment.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router= Router()

router.route("/:videoId/comment").post(verifyJWT,addComment)

router.route("/:videoId/comment").get(getAllComments)

router.route("/:commentId/comment").post(updateComment)

router.route("/:commentId/comment").post(deleteComment)