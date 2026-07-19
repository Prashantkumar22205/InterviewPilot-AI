const userModel = require("../models/user.model");
const { verifyGoogleToken } = require("../services/google.service");
const { generateToken, cookieOptions } = require("../utils/auth");

const googleLoginController = async (req, res) => {
    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required",
            });
        }

        const googleUser = await verifyGoogleToken(credential);

        if (!googleUser.emailVerified) {
            return res.status(400).json({
                message: "Google email is not verified",
            });
        }

        let user = await userModel.findOne({
            email: googleUser.email,
        });

        if (!user) {

            user = await userModel.create({
                username: googleUser.username,
                email: googleUser.email,
                googleId: googleUser.googleId,
                avatar: googleUser.picture,
                authProvider: "google",
            });

        } else if (!user.googleId) {

            user.googleId = googleUser.googleId;
            user.avatar = googleUser.picture;
            user.authProvider = "google";

            await user.save();
        }

        const token = generateToken(user);

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "Google login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            },
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Google authentication failed",
        });

    }
};

module.exports = {
    googleLoginController,
};