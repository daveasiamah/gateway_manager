import * as yup from "yup";
import { Device } from "../device-form/constants";

export interface Gateway {
  _id: string;
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: Device[];
}

export interface DeviceOptions {
  value: string;
  label: string;
}

export const initialValues: Gateway = {
  _id: "",
  serialNumber: "",
  name: "",
  ipAddress: "",
  devices: [],
};

export const validationSchema = yup.object({
  serialNumber: yup.string().required("Serial number is required"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  ipAddress: yup
    .string()
    .required("IP address is required")
    .matches(
      /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      "IP address must be a valid IPv4 address"
    ),
  devices: yup
    .array()
    .of(yup.string())
    .min(1, "At least one device must be selected")
    .max(10, "Only up to 10 devices can be selected")
    .nullable(),
});

const url = process.env.REACT_APP_BASE_SERVER_URL;

export const handleCreateGateWay = async (
  values: Gateway,
  setGateways: Function,
  toast: any
) => {
  try {
    const response = await fetch(`${url}/gateways`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setGateways(data.docs);
    fetchGateways(setGateways);
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

export const fetchGateways = async (setGateways: Function) => {
  try {
    const response = await fetch(`${url}/gateways`);
    const data = await response.json();
    setGateways(data.docs);
  } catch (error) {
    console.log(error);
  }
};
