import Axios, { AxiosResponse } from "axios";

type Endpoint =
  | "/get-project"
  | "/get-budget"
  | "/checkout"
  | "/coupon"
  | "/status"
  | "/invoice";

export const client = Axios.create({
  // baseURL: "http://localhost:9442",
  baseURL: "https://api.koders.in",
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
