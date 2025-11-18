import { Tweet } from "../models/tweets.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "Tweet is empty");
  }
  const user_id = req.user._id; //here i am using req.user and not req.params to get user id because anyone can hit the api with someone elses user id.
  const createdTweet = await Tweet.create({
    content: content,
    owner: user_id,
  });
  if (!createdTweet) {
    throw new ApiError(500, "Error occured while creating tweet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdTweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const user = req.params?.userId;
  const Tweets = await Tweet.find({ owner: user });
  return res
    .status(200)
    .json(new ApiResponse(200, Tweets, "All tweets are fetched"));
});

const updateTweets = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const tweet_id = req.params.tweetId;
  const { constent } = req.body;
  const updatedTweet = await Tweet.findOneAndUpdate(
    { owner: user, _id: tweet_id },
    {
      $set: {
        content: constent,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedTweet) {
    throw new ApiError(400, "No tweets were found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet is updated"));
});

const deleteTweets = asyncHandler(async (req, res) => {
  const tweet_id = req.params.tweetId;
  const user = req.user._id;
  const deletedTweet = await Tweet.findOneAndDelete({
    _id: tweet_id,
    owner: user,
  });
  if (!deletedTweet) {
    throw new ApiError(400, "No tweet found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedTweet, "Tweet deleted Successfully"));
});

export { createTweet, getUserTweets, updateTweets, deleteTweets };
