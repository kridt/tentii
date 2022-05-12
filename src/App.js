import Landingpage from "./pages/Landingpage";
import "./App.scss";
import { Router } from "@reach/router";
import Sellers from "./pages/Sellers";
/* import Discover from "./pages/Discover"; */
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import SellerSIte from "./pages/SellerSIte";
import Signup from "./pages/Signup";
import SignUpSeller from "./pages/SignUpSeller";

function App() {
  return (
    <Router className="App">
      <Landingpage exact path="/" />
      <Sellers path="/sellers" />
      {/* <Discover path="/discover" /> */}
      <About path="/about" />
      <ProductPage path="/product/:id" />
      <SellerSIte path="/sellerSite/:id" />
      <Signup path="/signup" />
      <SignUpSeller path="/signUpSeller" />
    </Router>
  );
}

export default App;
