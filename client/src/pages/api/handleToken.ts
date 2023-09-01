import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handlerData(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method === "DELETE") {
        req.session.destroy();
        res.send({ true: true });
        return;
      } else if (req.method === "POST") {
        const { token } = req.body;

        (req.session as any).token= {
          token,
        };

        await req.session.save();
        res.send({ true: true });
        return;
      }
    } catch (error) {
      console.log(" Error : ", error);
    }
    res.send({ true: true });
    return;
  },
  {
    cookieName: "token",
    password: "Lo7s8sidjlsmiwpamsldldl851KWH@#$O852",
    cookieOptions: {
      secure: process.env.ENV === "production",
    },
  }
);
