import axios from "axios";

export const api = axios.create({
	  baseURL: "http://e1r12p4.1337.ma:3000/api/v1/",
	//   withCredentials: true,
});