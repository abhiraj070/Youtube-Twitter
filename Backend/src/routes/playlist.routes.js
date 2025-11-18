import { Router } from "express";
import {
  updatedplaylistDetails,
  deleteVideofromPlaylist,
  addVideoToPlaylist,
  getPlaylistById,
  getUserPlaylist,
  createPlaylist,
  deletePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/playlist/u/:playlistId").patch(updatedplaylistDetails);

router.route("/playlist/d/:playlistId").delete(deletePlaylist);

router.route("/playlist/a/:playlist/video/:videoId").patch(addVideoToPlaylist);

router
  .route("/playlist/d/:playlistId/video/:videoId")
  .delete(deleteVideofromPlaylist);

router.route("/playlist/g/:playlistId").get(getPlaylistById);

router.route("/playlist/g/:userId").get(getUserPlaylist);

router.route("/playlist/c/:videoId").post(createPlaylist);

export default router;
