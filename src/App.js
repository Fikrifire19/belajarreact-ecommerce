import React from "react";
import Header from "./components/Header/index";
import Homepage from "./pages/homepage/Homepage";
import "./styles.scss";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Homepage />
    </div>
  );
}
