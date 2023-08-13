import '../app/globals.css'

import React from 'react'
import FriendsPage from '@/components/friends/friendsPage'

export default function Friends()
{
	return (
		<div className='flex md:min-h-screen h-screen items-center justify-center text-white bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet'>
			<FriendsPage />
		</div>

	)
}