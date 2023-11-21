import "./App.css";
import DaysCard from "./components/DaysCard";
import { Routes, Route } from "react-router-dom";
import HourlyTable from "./components/HourlyTable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DaysCard />} />
        <Route path="/hourly" element={<HourlyTable />} />
      </Routes>
    </div>
  );
}

export default App;
