import "./App.css";
import SVGbyRouteType from "./component/SVGbyRouteType";
import { getAllRoute, getAllRoutebyType, getAllStop, getRouteByShortName } from "./dao/GTFS";
import MapComp from "./component/Map";

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

  //console.log(allStops)
  //console.log(allRoutes)

  const routesTyped: [string, Route[]][] = Object.entries(getAllRoutebyType());

  const routesList = routesTyped.map(([routeType, routes]) => {
    const laneList = routes.map((route: any) => (
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
      <div className="flex items-start gap-4 py-2" key={Number(routeType)}>
        {SVGbyRouteType(Number(routeType))}
        <ul className="flex flex-wrap items-center gap-2">{laneList}</ul>
      </div>
    );
  });

  const findedList = allStops.map((stop: any) => {
    const laneList = stop.route_short_name.map((routename: string) => {
      const route=getRouteByShortName(routename)
      return (
        <div
          key={route.route_id}
          className="relative flex flex-col items-center justify-center shadow-sm group w-4 h-4 text-xs font-bold"
          style={{
            color: "#" + route.route_text_color,
            backgroundColor: "#" + route.route_color,
          }}
        >
          <div className="leading-none">{route.route_short_name}</div>
        </div>
      );
    });
    return (
      <li key={stop.stop_id}>
        <div className="flex items-center w-full gap-2 p-2 transition-colors border border-transparent rounded-lg group hover:shadow hover:border-slate-50 hover:bg-slate-800 ">
          <div className="text-xs font-medium leading-none text-slate-700 group-hover:text-white">
            {stop.stop_name}
          </div>
          <ul className="flex flex-wrap items-center gap-2">{laneList}</ul>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="flex flex-col items-stretch w-screen h-full justify-stretch lg:flex-row">
        <MapComp allStops={allStops} />
        <div className="shrink-0">
          <div className="flex-col hidden gap-4 px-8 py-4 overflow-y-scroll transition shadow-lg lg:h-screen lg:flex lg:max-w-lg bg-slate-100">
            <div className="flex flex-col p-4 space-y-4 bg-white rounded-lg">
              <div className="text-sm font-medium uppercase text-slate-800">
                {allRoutes.length} lignes à Nantes
              </div>
              {routesList}
            </div>
            <div className="flex flex-col p-4 space-y-4 bg-white rounded-lg grow">
              <div className="text-sm font-medium uppercase text-slate-800">
                {allStops.length} arrêts trouvés sur {allStops.length}
              </div>
              <ul className="space-y-1">{findedList}</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
