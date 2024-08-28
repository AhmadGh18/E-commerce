import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
const center = [33.883346253230904, 35.517484664916985];

const Map = () => {
  const { token } = useStateContext();

  const [position, setPosition] = useState(center);
  const [displayCoords, setDisplayCoords] = useState({
    lat: center[0],
    lng: center[1],
  });
  const [city, setCity] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      nav("/login");
    }
  });
  const fetchLocationInfo = async (lat, lng) => {
    try {
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch location information");
      }
      const data = await response.json();
      setCity(data.city || "Unknown City");
    } catch (error) {
      console.error("Error fetching location information:", error);
    }
  };

  const handleAcceptLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setPosition([latitude, longitude]); // Set marker position
          setDisplayCoords({ lat: latitude, lng: longitude });
          fetchLocationInfo(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        { timeout: 10000 } // Optional: Set a timeout to limit the time to get location
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };
  function AddLocationToLocalStorage() {
    localStorage.setItem(
      "UserLocation",
      JSON.stringify({
        longitude: position[0],
        latitude: position[1],
        city: city,
      })
    );
    if (localStorage.getItem("UserLocation")) {
      nav("/payment");
    }
  }
  useEffect(() => {
    handleAcceptLocation(); // Request user location on component mount
  }, []);

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setDisplayCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        fetchLocationInfo(e.latlng.lat, e.latlng.lng); // Update city info on map click
      },
      dragend() {
        const center = map.getCenter();
        setDisplayCoords({ lat: center.lat, lng: center.lng });
        fetchLocationInfo(center.lat, center.lng); // Update city info on map drag end
      },
    });

    return null;
  };

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={position}
          icon={L.icon({
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            Latitude: {position[0]} <br />
            Longitude: {position[1]} <br />
            City: {city}
          </Popup>
        </Marker>
        <MapEvents />
      </MapContainer>
      {/* <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "white",
          padding: "5px",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        <p>Latitude: {displayCoords.lat}</p>
        <p>Longitude: {displayCoords.lng}</p>
        <p>City: {city}</p>
      </div> */}
      <button
        onClick={AddLocationToLocalStorage}
        className="bg-black p-3 text-white rounded-md mt-4 m-auto flex"
      >
        Finish paument
      </button>
    </div>
  );
};

export default Map;
