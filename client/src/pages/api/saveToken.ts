import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
      if (req.method === "DELETE") {
        req.session.destroy();
		res.send({ ok: true });
		return;
      } else if (req.method === "POST") {
        const { token } = req.body;
		(req.session as any).token = {
          token,
        };
        await req.session.save();
		res.send({ ok: true });
		return;
      }
    } catch (error) {
    }
	res.send({ ok: true });
	return;
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
