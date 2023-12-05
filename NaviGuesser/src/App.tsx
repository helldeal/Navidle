import "./App.css";
import { getAllRoute, getAllRoutebyType, getAllStop } from "./dao/GTFS";
import MapComp from "./component/Map";
import RoutesList from "./component/RouteList";
import FindedList from "./component/FindedList";
import { useEffect, useState } from "react";
import { searchStop } from "./dao/Search";
import { text } from "stream/consumers";

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
  const [allStopsFinded, setAllStopsFinded] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [pointed, setPointed] = useState(null);
  //console.log(allStops)
  //console.log(allRoutes)
  const routesTyped: [string, Route[]][] = Object.entries(getAllRoutebyType());

  function handleSearch(text:string){ 
    const result = searchStop(text)
    if(result.length>0){
      console.log(result)
      setSearch("")
      setPointed(result[0].stop)
      allStopsFinded.push(result[0].stop)
    }
  }

  return (  
    <>
      {allStopsFinded && allStops && allRoutes && (
        <div className="flex flex-col items-stretch w-screen h-full justify-stretch lg:flex-row">
          <div className="relative z-30 flex items-start justify-end w-screen p-2 lg:justify-center lg:w-auto grow gap-x-2">
            <div className="flex items-start justify-end lg:justify-center">
              <div className="relative">
                <form onSubmit={(e)=>{
              e.preventDefault();handleSearch(search)
                }}>
                <input
                  className="w-64 px-4 py-2 text-sm text-center border rounded-full shadow-xl lg:w-80 border-slate-200 lg:text-base"
                  placeholder="Saisissez une station, et tapez ↩️"
                  type="text"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                </form>
              </div>
            </div>
            <div className="relative z-50 flex flex-col items-center gap-4 lg:absolute lg:top-2 lg:right-2">
              <button className="p-2 text-white transition-transform rounded-full shadow-xl bg-slate-900 hover:scale-105">
                <svg
                  className="w-6 h-6"
                  x-show="! expanded"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                </svg>
              </button>
            </div>
            <MapComp
              allStops={allStopsFinded}
              pointed={pointed}
              setPointed={setPointed}
            />
          </div>
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
                  <FindedList
                    allStopsFinded={allStopsFinded}
                    setPointed={setPointed}
                  />
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
