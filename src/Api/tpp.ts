import axios from "./axios.ts";

export const paymentCardRequest = async (data: {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  country: number;
  city: string;
  postalCode: string;
}) => {
  try {
    return await axios.post(`/tpp/paymentcard`, data);
  } catch (error) {
    console.log(error);
  }
};
