import Landingpage from "./pages/Landingpage";
import "./App.scss";
import { Router } from "@reach/router";
import Products from "./pages/Products";
import Sellers from "./pages/Sellers";

function App() {
  return (
    <Router className="App">
      <Landingpage exact path="/" />
      <Products exact path="/products" />
      <Sellers path="/sellers" />
    </Router>
  );
}

export default App;
