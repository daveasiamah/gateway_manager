import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Select from "react-select";
import {
  Gateway,
  DeviceOptions,
  validationSchema,
  initialValues,
} from "./constants";
import { Device } from "../device-form/constants";

function AddGatewayForm(props: {
  Submit: Function;
  refetchData: Function;
  devices: Device[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDevices, setSelectedDevices] = useState<DeviceOptions[]>([]);
  const { Submit, refetchData } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      handleSubmit(values);
      resetForm();
      setSelectedDevices([]);
      setLoading(false);
    },
  });

  const options = props?.devices?.map((device: Device) => ({
    value: device._id,
    label: `${device.uid} - ${device.vendor} `,
  })) ?? [{ value: "no device", label: "Device not Loaded" }];

  const handleSubmit = (values: Gateway) => {
    Submit(values);
    refetchData();
  };

  const handleChange = (selectedOptions: any) => {
    setSelectedDevices(selectedOptions);
    formik.setFieldValue(
      "devices",
      selectedOptions.map((option: { value: any }) => option.value)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <FormControl
        isInvalid={
          !!(formik.touched.serialNumber && formik.errors.serialNumber)
        }
        mb={3}
      >
        <FormLabel htmlFor="serialNumber">Serial number</FormLabel>
        <Input
          id="serialNumber"
          placeholder="Enter serial number"
          {...formik.getFieldProps("serialNumber")}
        />
        <FormErrorMessage>{formik.errors.serialNumber}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!(formik.touched.name && formik.errors.name)}
        mb={3}
      >
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          placeholder="Enter name"
          {...formik.getFieldProps("name")}
        />
        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!(formik.touched.ipAddress && formik.errors.ipAddress)}
        mb={3}
      >
        <FormLabel htmlFor="ipAddress">IP address</FormLabel>
        <Input
          id="ipAddress"
          placeholder="Enter IP address"
          {...formik.getFieldProps("ipAddress")}
        />
        <FormErrorMessage>{formik.errors.ipAddress}</FormErrorMessage>
      </FormControl>
      <FormControl
        mb={3}
        isInvalid={!!(formik.touched.devices && formik.errors.devices)}
      >
        <FormLabel htmlFor="devices">Devices</FormLabel>
        <Select
          value={selectedDevices}
          onChange={handleChange}
          options={options}
          isMulti
        />
        <FormErrorMessage>
          {Array.isArray(formik.errors.devices)
            ? formik.errors.devices.map((error) => (
                <div>{error.toString()}</div>
              ))
            : formik.errors.devices}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        disabled={formik.isSubmitting}
        isLoading={loading}
        loadingText="Submitting"
        mt={4}
        w="100%"
        size="lg"
        bg="teal.200"
      >
        Add Gateway
      </Button>
    </form>
  );
}

export default AddGatewayForm;
