import jwt from "jsonwebtoken"

// admin authentication middleware


const authUser = async (req, res, next) => {
    try {

        const { gtoken } = req.headers
        if (!gtoken) {
            return res.status(401).json({ success: false, message: "Not Authorized Login Again" })
        }
        const token_decode = jwt.verify(gtoken, process.env.JWT_SECRET_GUEST)

        req.user = { userId: token_decode.id };

        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}



export default authUser