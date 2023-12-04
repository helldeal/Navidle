import "./App.css";
import { getAllRoute, getAllRoutebyType, getAllStop } from "./dao/GTFS";
import MapComp from "./component/Map";
import RoutesList from "./component/RouteList";
import FindedList from "./component/FindedList";
import { useEffect, useState } from "react";

interface Route {
  route_id: string;
  route_type: number;
  route_text_color: string;
  route_color: string;
  route_short_name: string;
}

function App() {
  const allRoutes = getAllRoute();
  const allStops = getAllStop();
  const [allStopsFinded, setAllStopsFinded] = useState(
    allStops.filter((item: any) => item.stop_name === "Joliverie")
  );
  const [pointed, setPointed] = useState(null);

  //console.log(allStops)
  //console.log(allRoutes)

  useEffect(()=>{
    console.log(pointed)
  },[pointed])

  const routesTyped: [string, Route[]][] = Object.entries(getAllRoutebyType());

  return (
    <>
      {allStopsFinded && allStops && allRoutes && (
        <div className="flex flex-col items-stretch w-screen h-full justify-stretch lg:flex-row">
          <MapComp allStops={allStopsFinded} pointed={pointed} setPointed={setPointed}/>
          <div className="shrink-0">
            <div className="flex-col hidden gap-4 px-8 py-4 overflow-y-scroll transition shadow-lg lg:h-screen lg:flex lg:max-w-lg bg-slate-100">
              <div className="flex flex-col p-4 space-y-4 bg-white rounded-lg">
                <div className="text-sm font-medium uppercase text-slate-800">
                  {allRoutes.length} lignes à Nantes
                </div>
                <RoutesList
                  routesTyped={routesTyped}
                  allStopsFinded={allStopsFinded}
                  allStops={allStops}
                />
              </div>
              <div className="flex flex-col p-4 space-y-4 bg-white rounded-lg grow">
                <div className="text-sm font-medium uppercase text-slate-800">
                  {allStopsFinded.length} arrêts trouvés sur {allStops.length}
                </div>
                <ul className="space-y-1">
                  <FindedList allStopsFinded={allStopsFinded} setPointed={setPointed} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
