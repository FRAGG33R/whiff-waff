import axios from "axios";

export const api = axios.create({
	  baseURL: "http://34.173.232.127/api/v1",
});

export const localApi = axios.create({
	  baseURL: "http://localhost:3000/api",
});