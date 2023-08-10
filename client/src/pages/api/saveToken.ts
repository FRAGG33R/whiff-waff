
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
	async function saveToken(req : NextApiRequest, res : NextApiResponse) {
	  const { token } = req.body;
	  console.log('body : ', req.body);
	  (req.session as any).token = {
		token
	  };
	  await req.session.save();
	  res.send({ ok: true });
	},
	{
	  cookieName: "token",
	  password: "aissamaissamaissamaissamaissamaissamaissamaissamaissamaissamaissam",
	  cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	  },
	},
  );


  