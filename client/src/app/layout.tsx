import "./globals.css";

export const metadata = {
  title: "WHIFF-WHAFF",
  description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

  return (
    <html lang="en">
		<head>
       	 <link rel='icon' href='/favicon.ico'/>
      	</head>
        <body >{children}</body>
    </html>
  );
}
