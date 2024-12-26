import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstHeader from "./components/FirstHeader";
import SecondHeader from "./components/SecondHeader";
import ThirdHeader from "./components/ThirdHeader";
import PropertySlider from "./components/PropertySlider";
import SearchBox from "./components/SearchBox";
import PropertyListing from "./components/PropertyListing";
import AgentsSlider from "./components/AgentsSlider";
import PropertyExplorer from "./components/ExploreProperty";
import MobileAppPromo from "./components/MobileAppPromo";
import ClientsSlider from "./components/ClientsSlider";
import NewsletterSection from "./components/NewsletterSection";
import Footer1 from "./components/Footer1";
import Footer2 from "./components/Footer2";
import PropertyInfo from "./components/PropertyInfo";
import FavProperty from './Pages/FavProperty'
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminLayout from "./Pages/AdminLayout";


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Route for Home Page */}
        <Route
          path="/"
          element={
            <div>
              <FirstHeader />
              <SecondHeader />
              <ThirdHeader />
              <PropertySlider />
              <SearchBox />
              <PropertyListing />
              <AgentsSlider />
              <PropertyExplorer />
              <MobileAppPromo />
              <ClientsSlider />
              <NewsletterSection />
              <Footer1 />
              <Footer2 />
            </div>
          }
        />

        {/* Dynamic Route for Property Information Page */}
        <Route path="/property/:id" element={<PropertyInfo />} />
        <Route path='/favouriteproperty' element={<FavProperty/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
