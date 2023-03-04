import React, { useRef, useState } from "react";
import {
  Container,
  Text,
  Heading,
  HStack,
  Link,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Divider,
  Center,
} from "@chakra-ui/react";
import { NavLink as ReactRouterLink } from "react-router-dom";
import AddDeviceForm from "../components/forms/device-form";
import { Device } from "../constants";
import {
  fetchGateways,
  Gateway,
} from "../components/forms/gateway-form/constants";
import { fetchDevices } from "../components/forms/device-form/constants";

function Header() {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  const fetchData = () => {
    fetchDevices(setDevices, toast);
    fetchGateways(setGateways);
  };

  const handleClose = () => {
    onClose();
    fetchData();
  };

  return (
    <>
      <Container maxW="container.xl">
        <HStack spacing={24} py={4} borderBottom="1px" borderColor="gray.300">
          <Heading size="md">Gateway Manager</Heading>
          <HStack spacing={8}>
            <Link as={ReactRouterLink} to="/">
              Home
            </Link>
            <Center height="50px">
              <Divider orientation="vertical" />
            </Center>
            <Button onClick={onOpen} size="sm" mt={20} bg="teal.100">
              Add device
            </Button>
          </HStack>
        </HStack>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={handleClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Device</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <AddDeviceForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}

export default Header;
