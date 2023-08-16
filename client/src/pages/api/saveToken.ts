import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextResponse } from "next/server";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    
	try {
      if (req.method === "DELETE") {
        req.session.destroy();
		res.send({ ok: true });
      } else if (req.method === "POST") {

        const { token } = req.body;
        console.log('save this :',token);
		
		(req.session as any).token = {
          token,
        };
		console.log((req.session as any).token)
        await req.session.save();
		console.log('saved successfuly !');
		res.send({ ok: true });
      }
    } catch (error) {
      console.log("saveToken Error : ", error);
    }
	res.send({ ok: true });

  },
  {
    cookieName: "token",
    password:
      "$Kv4v3r6t8b7x5fd2a9c73baa7495d8268b048dc791c301621da7129s3C9g1#2qweIokLKJXx",
    cookieOptions: {
      secure: process.env.ENV === "production",
    },
  }
);
