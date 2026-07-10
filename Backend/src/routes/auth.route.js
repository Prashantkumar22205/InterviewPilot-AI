const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
router.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
router.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
router.get("/get-me", authMiddleware.authUser, authController.getMeController)


/**
 * @route PATCH /api/auth/change-password
 * @description Change logged-in user's password
 * @access Private
 */
router.patch(
    "/change-password",
    authMiddleware.authUser,
    authController.changePasswordController
);

module.exports=router