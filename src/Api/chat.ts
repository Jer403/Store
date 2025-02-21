import axios from "./axios.ts";

export const sendMessageRequest = async (message: string) => {
  return await axios.post(`/message/create`, { message });
};

export const getMessagesRequest = async () => {
  return await axios.get(`/messages/user`);
};
