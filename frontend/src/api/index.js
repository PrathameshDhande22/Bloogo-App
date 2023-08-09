const base_api = import.meta.env.VITE_BASE_API;
import axios from "axios";

const apicall = axios.create({
  baseURL: base_api,
});

export default apicall;
