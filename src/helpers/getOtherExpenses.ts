import api from "@/service";

export const getOtherExpenses = async () => {
  const { data } = await api.get("/other");
  return data;
};
