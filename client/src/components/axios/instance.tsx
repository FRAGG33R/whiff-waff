import axios from "axios";

// export const api = axios.create({
// 	  baseURL: "http://34.173.232.127/api/v1",
// });

export const api = axios.create({
	baseURL: "http://e3r10p16.1337.ma:3001/api/v1",
});

let hostname;

if (typeof window === 'undefined') {
  const os = require('os');
  hostname = os.hostname();

}
else
  hostname = window.location.hostname;

export const localApi = axios.create({
	  baseURL: `http://${hostname}:3000/api`,
});