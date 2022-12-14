import Axios, { AxiosResponse } from "axios";

type Endpoint = "/get-project" | "/get-budget" | "/checkout" | "/coupon";

const client = Axios.create({
  baseURL: "http://localhost:9442",
  headers: {
    "Content-Type": "application/json",
  },
});

interface Props {
  endpoint: Endpoint;
  payload: any;
}

export const sendPayload = async ({
  endpoint,
  payload,
}: Props): Promise<AxiosResponse> => {
  try {
    return await client.post(endpoint, payload);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
