import { createContext } from "react";
import { Device } from "../constants";

export const DeviceContext = createContext<Device>({
  _id: "",
  uid: 0,
  vendor: "",
  status: "",
});
