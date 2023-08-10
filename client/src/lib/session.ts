import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
	async (req, res) => {
		return { ...req.session };
	  },
	  {
		password: process.env.SESSION_PASSWORD || 'aissam',
		cookieName: 'your-cookie-name',
		cookieOptions: {
		  secure: process.env.NODE_ENV === 'production',
		},
	  }
);