import { toast, ToastPosition } from "react-toastify";

interface Props {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: any;
}

const kToastConfig: Props = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

type msgType = "error" | "success" | "info" | "warn";

export const showToaster = (title: string, type: msgType) => {
  toast[type](title, kToastConfig);
};
