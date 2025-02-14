import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

type MapViewProps = {
  center: {
    lat: number;
    lng: number;
  };
};

export const MapView: React.FC<MapViewProps> = ({ center }) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        style={{ width: "500px", height: "500px", borderRadius: "12px" }}
        defaultCenter={center}
        defaultZoom={15}
        gestureHandling={"greedy"}
      />
    </APIProvider>
  );
};
