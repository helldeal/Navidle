import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, divIcon } from "leaflet";
import { getFirstRouteShortNameForStop } from "../dao/GTFS";

export default function MapComp({ allStops, pointed, setPointed }: any) {
  const ShowAll = allStops.map((stop: any) => {
    const position: LatLngExpression = [stop.stop_lat, stop.stop_lon];
    const route = getFirstRouteShortNameForStop(stop);

    const style = `
      display: block;
      width: 10px;  
      height: 10px;
      border-width: 1px;
      background-color: #${route.route_color};
      border-color: #FFFFFF;
      border-radius: 9999px;
      --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
      --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);
      ${
        pointed &&
        stop.stop_id == pointed.stop_id &&
        "animation: scaleAnimation .8s ease-in-out;"
      }
      `;

    const customMarkerIcon = divIcon({
      html: `<span style="${style}" />`,
      className: `${stop.stop_id} leaflet-marker-icon !origin-center leaflet-zoom-animated leaflet-interactive`,
    });
    const animated = document.querySelector(`.${stop.stop_id}`);
    if (animated)
      animated!.addEventListener("animationend", () => {
        setPointed(null);
      });

    return (
      <Marker position={position} icon={customMarkerIcon} key={stop.stop_id}>
        <Popup>{stop.stop_name}</Popup>
      </Marker>
    );
  });

  return (
    <MapContainer
      center={{ lat: 47.213, lng: -1.55054562 }}
      zoom={13}
      className="relative z-30 flex items-start justify-end w-screen p-2 lg:justify-center lg:w-auto grow gap-x-2"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
      />
      {ShowAll}
      <FlyTo pointed={pointed} />
      <div className="flex items-start justify-end lg:justify-center">
        <input
          className="w-64 px-4 py-2 text-sm text-center border rounded-full shadow-xl lg:w-80 border-slate-200 lg:text-base"
          placeholder="Saisissez une station, et tapez ↩️"
        />
      </div>
      <div className="relative z-50 flex flex-col items-center gap-4 lg:absolute lg:top-2 lg:right-2">
        <button className="p-2 text-white transition-transform rounded-full shadow-xl bg-slate-900 hover:scale-105"></button>
      </div>
    </MapContainer>
  );
}

function FlyTo({ pointed }: any) {
  const map = useMap();
  if (pointed) {
    const position: LatLngExpression = [pointed.stop_lat, pointed.stop_lon];
    map.flyTo(position, 15);
  }
  return null;
}
