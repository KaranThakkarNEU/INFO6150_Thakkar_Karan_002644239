import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

const DaysCard = () => {
  const [weatherData, setWeatherData] = React.useState();
  const [hourlyData, sethourlyData] = React.useState();

  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast?lat=42.361145&lon=-71.057083&appid=eabb6829c431710522b64a283ec96303&units=metric"
      );
      return setWeatherData(summarizeWeatherData(res.data.list));
    }
    fetchData();
  }, []);

  const summarizeWeatherData = (data) => {
    // Group data by day
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item.dt * 1000); // Convert epoch time to milliseconds
      const dayKey = date.toISOString().split("T")[0]; // Use date as the key

      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }

      acc[dayKey].push(item);
      return acc;
    }, {});

    sethourlyData(groupedData);

    // Summarize data for each day
    const summarizedData = Object.keys(groupedData).map((dayKey) => {
      const dayData = groupedData[dayKey];
      const firstDataPoint = dayData[0]; // Use the first data point for basic info

      return {
        date: new Date(firstDataPoint.dt * 1000).toISOString().split("T")[0], // Convert epoch time to Date
        day: getDayOfWeek(new Date(firstDataPoint.dt * 1000)),
        temp_max: firstDataPoint.main.temp_max,
        temp_min: firstDataPoint.main.temp_min,
        weather: firstDataPoint.weather[0].description,
        icon: firstDataPoint.weather[0].icon,
        description: firstDataPoint.weather[0].description,
      };
    });

    return summarizedData;
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getUTCDay()];
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100vh",
      }}
    >
      {weatherData ? (
        weatherData.map((data, index) => (
          <Link
            to={"/hourly"}
            state={{ weatherData: hourlyData, date: data.date, day: data.day }}
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: "10rem",
                backgroundColor: "rgb(182 179 179)",
                margin: "1rem",
                padding: "1rem",
                borderRadius: "15px",
                cursor: "pointer",
                height: "10rem",
              }}
            >
              <Card.Img
                style={{ height: "40px", width: "70px" }}
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    background: "#007BFF", // Add background color for visibility
                    borderRadius: "5px",
                    padding: "0.5rem",
                    width: "fit-content",
                  }}
                >
                  <Badge bg="primary">{data.day}</Badge>
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Temp: {data.temp_max}&deg;C</ListGroup.Item>
                <ListGroup.Item>
                  High/low: {`${data.temp_max}/${data.temp_min}`}&deg;C
                </ListGroup.Item>
                <ListGroup.Item>Weather Type:{data.description}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Link>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default DaysCard;
