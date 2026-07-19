const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const { generateToken, cookieOptions } = require("../utils/auth");

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
const registerUserController = async(req,res)=>{
    
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = generateToken(user)
    res.cookie("token",token, cookieOptions)


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {

    const { email, password } = req.body
    
     if ( !email || !password) {
        return res.status(400).json({
            message: "Please provide email and password!!"
        })
    }


    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = generateToken(user)

    res.cookie("token", token,cookieOptions)

    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
  const logoutUserController= async(req, res)=> {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logout successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
const  getMeController = async (req, res) =>{

    const user = await userModel.findById(req.user.id)

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


const changePasswordController = async(req,res)=>{
    try{
     const {currentPassword , newPassword} = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Please provide current password and new password"
            });
        }

         const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }
        
        if (currentPassword === newPassword) {
            return res.status(400).json({
                message: "New password cannot be same as current password"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

         res.status(200).json({
            message: "Password changed successfully"
        });

    }catch(err){
         console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}




module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    changePasswordController
}