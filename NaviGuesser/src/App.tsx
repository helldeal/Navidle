import "./App.css";
import SVGbyRouteType from "./component/SVGbyRouteType";
import { getAllRoute, getAllRoutebyType, getAllStop } from "./dao/GTFS";

interface Route {
  route_id: string;
  route_type: number;
  route_text_color: string;
  route_color: string;
  route_short_name: string;
  // ... other properties
}

function App() {
  const routes = getAllRoute();
  const stops = getAllStop();
  
  // Assuming routesTyped is an array of [route_type, Route[]] pairs
  const routesTyped: [string, Route[]][] = Object.entries(getAllRoutebyType());
  
  const routesList = routesTyped.map(([routeType  , routes]) => {
    const laneList = routes.map((route:any) => (
      <li key={route.route_id}>
        <div
          className="relative flex flex-col items-center justify-center shadow-sm group w-6 h-6 text-[10px] font-bold"
          style={{
            color: "#" + route.route_text_color,
            backgroundColor: "#" + route.route_color,
          }}
        >
          <div className="leading-none">{route.route_short_name}</div>
          <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"></div>
        </div>
      </li>
    ));
    return (
      <div className="flex items-start gap-4 py-2">
        {SVGbyRouteType(Number(routeType))}
        <ul className="flex flex-wrap items-center gap-2">{laneList}</ul>
      </div>
    );
  });
  return (
    <>
      <div className="flex flex-col items-stretch w-screen h-full justify-stretch lg:flex-row">
        <div className="relative z-30 flex items-start justify-end w-screen p-2 lg:justify-center lg:w-auto grow gap-x-2">
          <div className="flex items-start justify-end lg:justify-center"></div>
        </div>
        <div className="shrink-0">
          <div className="flex-col hidden gap-4 px-8 py-4 overflow-y-scroll transition shadow-lg lg:h-screen lg:flex lg:max-w-lg bg-slate-100">
            <div className="flex flex-col p-4 space-y-4 bg-white rounded-lg">
              <div className="text-sm font-medium uppercase text-slate-800">
                {routes.length} lignes à Nantes
              </div>
              {routesList}
            </div>
            <div className="flex flex-col p-4 space-y-4 bg-white rounded-lg grow">
              <div className="text-sm font-medium uppercase text-slate-800">
                Aucun arrêt trouvé sur {stops.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
