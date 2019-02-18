import models from "../models";

const { User, Follower } = models;
/**
 * FollowerController
 *
 * @class
 */
export default class FollowerController {
  /**
   *
   * followUser
   *
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @return {object} - It returns the response object
   */
  static async followUser(req, res) {
    const { id } = req.user;
    const { username } = req.params;
    try {
      const user = await User.findOne({
        where: {
          username
        }
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const results = await Follower.findOrCreate({
        where: {
          followingId: user.id,
          followerId: id
        }
      }).spread((follower, created) => {
        if (created) {
          return res.status(201).json({
            message: "Follow successful"
          });
        } else {
          res.status(409).json({ message: "You are already following this author" });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Following user failed", errors: error.stack });
    }
  }

  /**
   *
   * unFollow
   *
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @return {object} - It returns the response object
   */
  static async unFollow(req, res) {
    const { id } = req.user;
    const { username } = req.params;
    try {
      const user = await User.findOne({
        where: {
          username
        }
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const results = await Follower.destroy({
        where: {
          followingId: user.id,
          followerId: id
        }
      });
      if (results <= 0) {
        return res
          .status(404)
          .json({ message: "You have already unfollowed this author" });
      }
      return res.status(202).json({ message: "You have unfollowed this author" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unfollowing user failed", errors: error.stack });
    }
  }

  /**
   *
   * getAllFollowers
   *
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @return {object} - It returns the response object
   */
  static async getAllFollowers(req, res) {
    const { username } = req.params;
    try {
      const user = await User.findOne({
        where: {
          username
        }
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const followers = await Follower.findAll({
        where: {
          followingId: user.id
        },
        include: [
          {
            model: User,
            attributes: ["id", "username", "firstname", "lastname", "image", "bio"]
          }
        ]
      });
      res.json({ followers });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unknown error occurred", errors: error.stack });
    }
  }

  /**
   *
   * getFollowings
   *
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @return {object} - It returns the response object
   */
  static async getFollowings(req, res) {
    const { username } = req.params;
    try {
      const user = await User.findOne({
        where: {
          username
        },
        attributes: ["id", "username"],
        include: [
          {
            model: User,
            as: "followings",
            attributes: ["id", "username", "firstname", "lastname", "image", "bio"]
          }
        ]
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unknown error occurred", errors: error.stack });
    }
  }
}
