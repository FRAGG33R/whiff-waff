import axios from "axios";

export const api = axios.create({
	  baseURL: "http://e3r10p16.1337.ma:3001/api/v1/",
});


export const localApi = axios.create({
	  baseURL: "http://localhost:3000/api",
});