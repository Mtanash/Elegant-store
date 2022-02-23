import { publicAxios } from "./axios";

export const getDashboardData = () => publicAxios.get("/dashboard");
