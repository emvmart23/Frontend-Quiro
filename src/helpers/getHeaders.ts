import api from "@/service";

export const getHeaders = async () => {
  try {
    const { data } = await api.get("/headers");
    return data;
  } catch (error) {
    console.error("Error fetching headers:", error);
    throw error;
  }
};