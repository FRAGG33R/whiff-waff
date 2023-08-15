'use client'
import { useEffect } from "react";
import Card from "../assets/card";
import { useRouter } from "next/router";

export default function SignInComponent()
{
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Card Mode="signin"/>
		</div>
	)
}