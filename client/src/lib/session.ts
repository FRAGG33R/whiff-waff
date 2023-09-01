import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async (req, res)=>{
        return { ...req.session,}

    },
    {
        cookieName: "token",
        password: "Lo7s8sidjlsmiwpamsldldl851KWH@#$O852",
        cookieOptions:{
            secure: process.env.ENV === "production"
        }
    }
)