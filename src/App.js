import Landingpage from "./pages/Landingpage";
import "./App.scss";
import { Router } from "@reach/router";
import Sellers from "./pages/Sellers";
import Discover from "./pages/Discover";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router className="App">
      <Landingpage exact path="/" />
      <Sellers path="/sellers" />
      <Discover path="/discover" />
      <About path="/about" />
      <ProductPage path="/product/:id" />
    </Router>
  );
}

export default App;
