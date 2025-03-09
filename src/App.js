import React from "react";
import CompanySearch from "./components/CompanySearch";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <CompanySearch />
      <Analytics />
    </div>
  );
}

export default App;