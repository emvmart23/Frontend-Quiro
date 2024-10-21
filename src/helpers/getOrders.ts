import api from "@/service";

export const getOrders = async () => {
  try {
    const { data } = await api.get("/orders");
    return data;
  } catch (error) {
    console.log(error);
  }
};
