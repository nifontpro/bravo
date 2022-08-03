import {API_SERVER_URL} from 'core/config/api.config'
import {getContentType} from "@/core/utils/api.helpers";
import axios from "axios";

export const axiosCore = axios.create({
	baseURL: API_SERVER_URL,
	headers: getContentType()
})
