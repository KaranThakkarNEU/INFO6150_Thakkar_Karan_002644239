import React from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

const HourlyTable = () => {
  let { state } = useLocation();
  const [hourlyData, setHourlyData] = React.useState();

  React.useEffect(() => {
    // Set the hourlyData state after getting data from the location state
    setHourlyData(state.weatherData[state.date]);
  }, [state.weatherData, state.date]); // Add dependencies to useEffect

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <div>
        {hourlyData ? (
          <Table
            striped
            bordered
            hover
            variant="dark"
            style={{ borderSpacing: "20px", border: "1px solid black" }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Day</th>
                <th style={{ border: "1px solid black" }}>Time</th>
                <th style={{ border: "1px solid black" }}>Temperature</th>
                <th style={{ border: "1px solid black" }}>Feels like</th>
                <th style={{ border: "1px solid black" }}>Humidity</th>
                <th style={{ border: "1px solid black" }}>Speed</th>
                <th style={{ border: "1px solid black" }}>Description</th>
                <th style={{ border: "1px solid black" }}>Image</th>
              </tr>
            </thead>
            <tbody>
              {hourlyData.map((data, index) => (
                <tr style={{ textAlign: "center" }}>
                  <td>{state.day}</td>
                  <td>{data.dt_txt}</td>
                  <td>{data.main.temp}</td>
                  <td>{data.main.feels_like}</td>
                  <td>{data.main.humidity}</td>
                  <td>{data.wind.speed}</td>
                  <td>{data.weather[0].description}</td>
                  <td>
                    <img
                      alt="weather icon"
                      style={{ height: "40px", width: "70px" }}
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default HourlyTable;
