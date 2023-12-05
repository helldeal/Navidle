import { useState } from "react";
import { getStopsForRoute } from "../dao/GTFS";
import SVGbyRouteType from "./SVGbyRouteType";

export default function RoutesList({
  routesTyped,
  allStopsFinded,
  allStops,
}: any) {
  const [display, setDisplay] = useState<any>(null);
  const routesList = routesTyped.map(([routeType, routes]: any) => {
    const laneList = routes.map((route: any) => {
      const stopListFindedbyRoute = getStopsForRoute(route, allStopsFinded);
      const stopListbyRoute = getStopsForRoute(route, allStops);
      return (
        <li key={route.route_id}>
          <div
            className="relative flex flex-col items-center justify-center shadow-sm group w-6 h-6 text-[10px] font-bold hover:opacity-100"
            style={{
              color: "#" + route.route_text_color,
              backgroundColor: "#" + route.route_color,
            }}
            onClick={() => setDisplay(route)}
          >
            <div className="leading-none">{route.route_short_name}</div>
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
              style={{
                backgroundImage: `conic-gradient(transparent 0deg ${
                  (stopListFindedbyRoute.length * 360) / stopListbyRoute.length
                }deg, rgba(255, 255, 255, 0.7) ${
                  (stopListFindedbyRoute.length * 360) / stopListbyRoute.length
                }deg 360deg)`,
              }}
            ></div>
          </div>
        </li>
      );
    });
    return (
      <div className="flex items-start gap-4 py-2" key={Number(routeType)}>
        {SVGbyRouteType(Number(routeType))}
        <ul className="flex flex-wrap items-center gap-2">{laneList}</ul>
      </div>
    );
  });
  return (
    <div className="relative divide-y divide-slate-100">
      {routesList}
      {display && (
        <div className="absolute inset-x-0 z-10 flex flex-col items-stretch justify-between p-4 text-sm text-center text-gray-800 -translate-y-1/2 bg-white border rounded-lg shadow-2xl top-1/2 gap-y-4 border-slate-100">
          <button className="absolute right-2 top-2">
            <svg
              className="w-6 text-slate-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="currentColor"
              onClick={() => setDisplay(null)}
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
          <div className="flex items-center justify-start gap-x-4">
            <div className="flex items-center gap-x-1">
              {SVGbyRouteType(Number(display.route_type))}
              <div className="font-bold">Ligne</div>
              <div
                className="relative flex flex-col items-center justify-center shadow-sm group  w-6 h-6 text-[10px] font-bold"
                style={{
                  color: "#" + display.route_text_color,
                  backgroundColor: "#" + display.route_color,
                }}
              >
                <div className="leading-none">{display.route_short_name}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center self-center justify-center px-8 py-4 rounded-lg gap-y-2 bg-slate-50">
            <div className="text-lg font-bold">
              🏆{" "}
              {(
                (getStopsForRoute(display, allStopsFinded).length * 100) /
                getStopsForRoute(display, allStops).length
              ).toFixed(2)}
              %
            </div>
            <div className="text-xs leading-none whitespace-nowrap">
              {getStopsForRoute(display, allStopsFinded).length} {getStopsForRoute(display, allStopsFinded).length>1?'stations':'station'} sur{" "}
              {getStopsForRoute(display, allStops).length}
            </div>
          </div>
          <div className="flex overflow-y-scroll max-h-40">
            <ul className="text-xs">
              {getStopsForRoute(display, allStopsFinded).map((stop: any) => (
                <li
                  className="flex items-center gap-x-1"
                  key={display.stop_id}
                >
                  <svg
                    className="w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill={'#'+display.route_color}
                  >
                    <path d="M246,106.65l-36-40A8,8,0,0,0,204,64H136V32a8,8,0,0,0-16,0V64H40A16,16,0,0,0,24,80v64a16,16,0,0,0,16,16h80v64a8,8,0,0,0,16,0V160h68a8,8,0,0,0,5.95-2.65l36-40A8,8,0,0,0,246,106.65ZM200.44,144H40V80H200.44l28.8,32Z"></path>
                  </svg>
                  <span>{stop.stop_name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
