import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import BrandDetails from "./components/BrandDetails";
import CarDetails from "./components/CarDetails";
import Feedback from "./components/Feedback";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
         
          <Route
            path="/brand/:brandName"
            element={
              <Layout>
                <BrandDetails />
              </Layout>
            }
          />
          <Route
            path="/brand/:brandName/:model"
            element={
              <Layout>
                <CarDetails />
              </Layout>
            }
          />
          <Route
            path="/feedback"
            element={
              <Layout>
                <Feedback />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
