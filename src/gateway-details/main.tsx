import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  useToast,
} from "@chakra-ui/react";

import { ArrowLeftIcon, DeleteIcon } from "@chakra-ui/icons";

import { useParams } from "react-router-dom";
import { Gateway } from "../components/gateway-table";
import { fetchGateway } from "./constants";

function GatewayDetails() {
  const [gateway, setGateway] = useState<Gateway>();
  const params = useParams();
  const toast = useToast();

  const url = process.env.REACT_APP_BASE_SERVER_URL;

  const refetchGateway = () => {
    fetchGateway(setGateway, Object.values(params));
  };

  const handleDeleteDevice = async (gatewayId: string, deviceId: string) => {
    try {
      const response = await fetch(
        `${url}/gateways/${gatewayId}/devices/${deviceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gatewayId, deviceId }),
        }
      );

      refetchGateway();

      toast({
        title: "Success",
        description: `${response.statusText}, Completed Successfully.`,
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
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

  useEffect(() => {
    fetchGateway(setGateway, Object.values(params));
  }, []);

  return (
    <Container maxW="container.xl" pl={8} pr={8} pb={8}>
      <Card mt={6}>
        <CardHeader>
          <Heading size="lg" color="gray.500">
            Gateway Details
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="md" textTransform="capitalize">
                Name
              </Heading>
              <Text pt="2" fontSize="md">
                {gateway?.name}
              </Text>
            </Box>
            <Box>
              <Heading size="md" textTransform="capitalize">
                Serial Number
              </Heading>
              <Text pt="2" fontSize="md">
                {gateway?.serialNumber}
              </Text>
            </Box>
            <Box>
              <Heading size="md" textTransform="capitalize">
                IP Address
              </Heading>
              <Text pt="2" fontSize="md">
                {gateway?.ipAddress}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <Heading size="lg" color="gray.500" mt={8} pl={4}>
        Devices
      </Heading>
      <Center>
        <Table variant="striped" size="sm" mt={6}>
          <Thead>
            <Tr>
              <Th>UID</Th>
              <Th>Vendor</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gateway?.devices.map((device) => (
              <Tr key={device._id}>
                <Td>
                  <Text size={"sm"}>{device.uid}</Text>
                </Td>
                <Td>
                  <Text size={"sm"}>{device.vendor}</Text>
                </Td>
                <Td>
                  <Flex direction="row" justify="space-between" w={"65px"}>
                    <Stat>
                      {device.status === "online" ? (
                        <StatArrow type="increase" />
                      ) : (
                        <StatArrow type="decrease" />
                      )}
                    </Stat>
                    <Text size={"sm"} textTransform="capitalize">
                      {device.status}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Box>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete Device"
                      size="sm"
                      icon={<DeleteIcon />}
                      onClick={() =>
                        handleDeleteDevice(gateway._id, device._id)
                      }
                    />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
    </Container>
  );
}

export default GatewayDetails;
