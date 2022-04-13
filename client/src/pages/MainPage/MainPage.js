import React from 'react'
import './MainPage.css';
import Map, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import axios from "axios";
import { format } from "timeago.js";

const MAPBOX_TOKEN = 'pk.eyJ1IjoieW91Z3hsIiwiYSI6ImNrenVueHJubjE4dmUyb21vbDFlbHJ6MmgifQ.xrcqtzTV5exBR3oKOsucPQ';

function MainPage() {
    const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = e => {
    const { lat: lat, lng: long } = e.lngLat;
    setNewPlace({ lat, long });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);


  return (
    <div className='map__frame' style={{ height: "95vh", width: "100vw" }}>
      <Map
        // {...viewport}
        initialViewState={{
          latitude: 46,
          longitude: 17,
          zoom: 4
        }}
        // {...viewport}
        style={{maxWidth: "100vw", maxHeight: "95vh"}}
        mapStyle="mapbox://styles/yougxl/ckzvdgj3h001014o5palirrer"
        // onViewportChange={(viewport) => setViewport(viewport)}
        mapboxAccessToken={MAPBOX_TOKEN}
        transitionDuration="200"
        // mapStyle="mapbox://styles/yougxl/ckzvdgj3h001014o5palirrer"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={currentUsername && handleAddClick}
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <AddLocationAltRoundedIcon
                style={{
                  fontSize: 7 * viewport.zoom,
                  color:
                    currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Место:</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Обзор:</label>
                  <p className="desc">{p.desc}</p>
                  <label>Оценка:</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarOutlinedIcon className="star" />)}
                  </div>
                  <label>Информация</label>
                  <span className="username">
                    Создано: <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              // offsetLeft={-3.5 * viewport.zoom}
              // offsetTop={-7 * viewport.zoom}
            >
              <AddLocationAltRoundedIcon
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Место:</label>
                  <input
                    placeholder="Введите название места"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Обзор:</label>
                  <textarea
                    placeholder="Расскажите что-нибудь об этом месте."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Оценка:</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Добавить место
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
      </Map>
    </div>
  )
}

export default MainPage