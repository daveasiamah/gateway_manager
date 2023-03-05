import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./header";
import Home from "./home";
import GatewayDetails from "./gateway-details/main";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/gateways/:gatewayId" component={GatewayDetails} exact />
      </Switch>
    </Router>
  );
}

export default App;
