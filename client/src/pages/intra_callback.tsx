import { useEffect, useState } from 'react';
import '../app/globals.css'
import { useRouter } from 'next/router'
import { api, localApi } from '@/components/axios/instance';
import axios from 'axios';


function parseJwt(token : string) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export default function IntraCallback()
{
	const router = useRouter();
	const {code} = router.query;

	const intraAuth = async () => {
		try {
			const authRes = await api.get(`/auth/signin/42?code=${code}`)
			console.log(authRes.status);
			if (authRes.status === 201) {
				console.log('local');
				localStorage.setItem('token', authRes.data.token);
				// console.log(parseJwt(authRes.data.token).userName);
				console.log('before sending !');
				await localApi.post('/saveToken', {token : authRes.data.token})
				// console.log('after sending');
				router.push(`/profile/${parseJwt(authRes.data.token).userName}`);
			}
			console.log(authRes.data.token);
			console.log(authRes.status);
			
		}
		catch(err) {
			console.log('err');
			
			console.log(err);
			localStorage.removeItem('token');
			router.push('/login');
		}
	}
	useEffect(() =>
	{
		console.log('-', code);
		
		if (!code)
			return;
		else
			intraAuth();
		// setCode(router.query.code)
	}, [code])
	return (
		<div className='w-screen h-screen flex items-center justify-center text-black font-extrabold font-teko text-7xl'>
			Waiting
		</div>
	)
}