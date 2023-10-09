import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import { Socket } from 'socket.io-client';

export const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children } : any) => {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
		console.log('token :', localStorage.getItem('token'));
        const newSocket = io('http://e3r10p16.1337.ma:8887/', {
			extraHeaders: {
			  authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		  });
		  console.log('newSocket :', newSocket);
		  
        setSocket(newSocket);
        // return () => newSocket.close();
    }, []);

    return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
    );
};
