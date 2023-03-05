import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AccordionButton,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { Device } from "./forms/device-form/constants";
import { Link } from "react-router-dom";

export interface Gateway {
  _id: string;
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: Device[];
}

interface GatewayTableProps {
  gateways: Gateway[];
}

const GatewayTable: React.FC<GatewayTableProps> = ({ gateways }) => {
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Serial Number</Th>
          <Th>Name</Th>
          <Th>IP Address</Th>
          <Th>Devices</Th>
        </Tr>
      </Thead>
      <Tbody>
        {gateways.map((gateway) => (
          <Tr key={gateway._id}>
            <Td>
              <Link to={`/gateways/${gateway._id}`}>
                {gateway.serialNumber}
              </Link>
            </Td>
            <Td>
              <Link to={`/gateways/${gateway._id}`}>{gateway.name}</Link>
            </Td>
            <Td>
              <Link to={`/gateways/${gateway._id}`}>{gateway.ipAddress}</Link>
            </Td>
            <Td>
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Devices
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {gateway.devices.map((device) => (
                      <Text key={device._id}>UID: {device.uid}</Text>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GatewayTable;
