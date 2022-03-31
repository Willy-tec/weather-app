import {useState, useEffect} from "react";
import "./App.css";
import useFindTown from "./script/useFindTown";
import useFindWeather from "./script/useFindWeather";
import useLocation from "./script/useLocation";

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [canLocate, setCanLocate] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [town, setTown] = useState("");
  const [cityInfo, setCityInfo] = useState({
    name: "",
    country: "",
    sunrise: "",
    sunset: "",
  });
  const [currentCondition, setCurrentCondition] = useState({
    condition: "",
    date: "",
    hour: "",
    humidity: 0,
    icon: "",
    icon_big: "",
    pressure: 0,
    tmp: 0,
    wnd_dir: "",
    wnd_gust: 0,
    wnd_spd: 0,
  });

  useEffect(() => {
    if (canLocate) {
      useFindTown(lat, lon).then((data) => {
        setTown(data.toLowerCase());
      });
    }
  }, [canLocate]);

  useEffect(() => {
    if (town !== "")
      useFindWeather(town).then((data) => {
        setCityInfo((prevState) =>
          Object.assign({}, prevState, data.city_info)
        );
        setCurrentCondition((prevState) =>
          Object.assign({}, prevState, data.current_condition)
        );
        setLoad(true);
      });
  }, [town]);

  const handleClick = () => {
    useLocation()
      .then((data) => {
        setLat(data.lat);
        setLon(data.lon);
        setCanLocate(true);
      })
      .catch((err) => {
        console.log(err);
        setCanLocate(false);
        setLoad(true);
      });
  };

  return (
    <>
      <header className="App-header"></header>
      {isLoad ? (
        canLocate ? (
          <main className="App-main">
            <h1>{`${cityInfo.name}, ${cityInfo.country}`}</h1>
            <p>
              Relevé du {currentCondition.date} à {currentCondition.hour} h
            </p>
            <p>
              <span>
                Levé du soleil: <b>{cityInfo.sunrise}</b>
              </span>{" "}
              <span>
                Couché du soleil: <b>{cityInfo.sunset}</b>
              </span>
            </p>
            <p>{currentCondition.condition}</p>
            <p>Taux d'humidité : {currentCondition.humidity}%</p>
            <p>Pression : {currentCondition.pressure}hPa</p>
            <p>Température : {currentCondition.tmp}°</p>
            <img src={currentCondition.icon_big} alt="" />
          </main>
        ) : (
          <p>Une erreur est survenu</p>
        )
      ) : (
        <button onClick={handleClick}>Trouver ma position</button>
      )}
    </>
  );
}

export default App;

