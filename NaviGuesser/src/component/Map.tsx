import { MapContainer, Marker, Popup, TileLayer  } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { LatLngExpression, divIcon } from 'leaflet';
import { getFirstRouteShortNameForStop } from '../dao/GTFS';


export default function MapComp({allStops}:any) {
    const ShowAll= allStops.map((stop:any) => {
      const position:LatLngExpression = [stop.stop_lat, stop.stop_lon]
      const route = getFirstRouteShortNameForStop(stop)
      const style=`
      display: block;
      width: 100%;
      height: 100%;
      background-color: #${route.route_color};
      border-color: #${route.route_text_color};
      border-radius: 9999px;
      `
      
      const customMarkerIcon = divIcon({  
        html: `<span style="${style}" />`,
        className: 'leaflet-marker-icon rounded-full shadow border !origin-center leaflet-zoom-animated leaflet-interactive'
      });
      return(
        <Marker position={position} icon={customMarkerIcon} key={stop.stop_id}>
          <Popup>
            {stop.stop_name}
          </Popup>
        </Marker> 

      )
    }
    );
    return(
        <MapContainer
          center={{ lat: 47.213, lng: -1.55054562 }}
          zoom={13}
          className='relative z-30 flex items-start justify-end w-screen p-2 lg:justify-center lg:w-auto grow gap-x-2'>
          <div className="flex items-start justify-end lg:justify-center"></div>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          />
          {ShowAll}
        </MapContainer>
      )
}