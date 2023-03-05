const url = process.env.REACT_APP_BASE_SERVER_URL;

export const fetchGateway = async (setGateway: Function, gatewayId: any) => {
  try {
    const response = await fetch(`${url}/gateways/${gatewayId}`);
    const data = await response.json();
    setGateway(data);
  } catch (error) {
    console.log(error);
  }
};
