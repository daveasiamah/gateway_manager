import * as yup from "yup";
import { Gateway } from "../gateway-form/constants";

export interface Device {
  _id: string;
  uid: number;
  vendor: string;
  status: string;
}

export const initialValues: Device = {
  _id: "",
  uid: 0,
  vendor: "",
  status: "online",
};

export const validationSchema = yup.object({
  uid: yup.string().required("UID is required").min(6, "6 digits required"),
  vendor: yup
    .string()
    .required("Vendor is required")
    .min(10, "Vendor must be at least 10 characters"),
  status: yup.string().oneOf(["online", "offline"], "Invalid status"),
});

const url = process.env.REACT_APP_BASE_SERVER_URL;

export const handleSubmit = async (
  values: any,
  resetForm: any,
  setLoading: any,
  toast: any
) => {
  setLoading(true);
  try {
    const response = await fetch(`${url}/devices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res = await response.json();

    if (res) {
      toast({
        title: "Success",
        description: `The request was successfull.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
    }
  } catch (error) {
    toast({
      title: "Error",
      description: `${error}`,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const fetchDevices = async (setDevices: Function, toast: any) => {
  try {
    const response = await fetch(`${url}/devices`);
    const data = await response.json();
    if (data?.docs) {
      toast({
        title: "Success",
        description: `The request was successfull.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setDevices(data?.docs);
    }
  } catch (error) {
    toast({
      title: "Error",
      description: `${error}`,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    console.log(error);
  }
};
