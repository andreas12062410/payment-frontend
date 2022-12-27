import Axios, { AxiosResponse } from "axios";

type Endpoint = "/get-project" | "/get-budget" | "/checkout" | "/coupon";

const client = Axios.create({
  // baseURL: "https://api.koders.in",
  baseURL: "http://192.168.29.62:9442",
  headers: {
    "Content-Type": "application/json",
  },
});

interface Props {
  endpoint: Endpoint;
  payload: any;
  readError?: boolean;
}

export const sendPayload = async ({
  endpoint,
  payload,
  readError = false,
}: Props): Promise<AxiosResponse> => {
  try {
    return await client.post(endpoint, payload);
  } catch (error: any) {
    if (readError) throw error;
    else throw new Error(error.message);
  }
};
