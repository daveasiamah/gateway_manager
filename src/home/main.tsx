import React, { useEffect, useState } from "react";
import { Container, Heading, Flex, useToast, Box } from "@chakra-ui/react";
import AddGatewayForm from "../components/forms/gateway-form";
import { Gateway } from "../components/forms/gateway-form/constants";
import GatewayTable from "../components/gateway-table";
import {
  Device,
  fetchDevices,
} from "../components/forms/device-form/constants";
import {
  handleCreateGateWay,
  fetchGateways,
} from "../components/forms/gateway-form/constants";

function Home() {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const toast = useToast();

  const fetchData = () => {
    fetchDevices(setDevices, toast);
    fetchGateways(setGateways);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxW="1000px" centerContent>
      <Heading size={"lg"} color="gray.600" mt={8} mb={8}>
        Add Gateway
      </Heading>
      <AddGatewayForm
        Submit={(values: Gateway) =>
          handleCreateGateWay(values, setGateways, toast)
        }
        devices={devices}
        refetchData={fetchData}
      />
      <Heading size={"lg"} color="gray.600" mt={8} mb={8}>
        Gateways
      </Heading>
      <Flex w="100%">
        {gateways && gateways.length > 0 ? (
          <GatewayTable gateways={gateways} />
        ) : (
          <h1>No gateways loaded.</h1>
        )}
      </Flex>
      <Container>
        <Box h={100}></Box>
      </Container>
    </Container>
  );
}

export default Home;
