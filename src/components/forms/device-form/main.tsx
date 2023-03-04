import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./constants";
import { handleSubmit } from "./constants";

function AddDeviceForm() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) =>
      handleSubmit(values, resetForm, setLoading, toast),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        isInvalid={!!(formik.touched.uid && formik.errors.uid)}
        mb={3}
      >
        <FormLabel htmlFor="uid">UID</FormLabel>
        <Input
          id="uid"
          placeholder="Enter UID"
          {...formik.getFieldProps("uid")}
        />
        <FormErrorMessage>{formik.errors.uid}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!(formik.touched.vendor && formik.errors.vendor)}
        mb={3}
      >
        <FormLabel htmlFor="vendor">Vendor</FormLabel>
        <Input
          id="vendor"
          placeholder="Enter Vendor"
          {...formik.getFieldProps("vendor")}
        />
        <FormErrorMessage>{formik.errors.vendor}</FormErrorMessage>
      </FormControl>

      <FormControl mb={3}>
        <FormLabel htmlFor="status">Status</FormLabel>
        <Select id="status" {...formik.getFieldProps("status")}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </Select>
        <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        disabled={formik.isSubmitting}
        isLoading={loading}
        loadingText="Submitting"
        mt={4}
        w="100%"
      >
        Add Device
      </Button>
    </form>
  );
}

export default AddDeviceForm;
