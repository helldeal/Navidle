import SVGbyRouteType from "./SVGbyRouteType";

export default function RoutesList({routesTyped, allStopsFinded,allStops}:any) {
  const routesList = routesTyped.map(([routeType, routes]: any) => {
    const laneList = routes.map((route: any) => {
      return (
        <li key={route.route_id}>
          <div
            className="relative flex flex-col items-center justify-center shadow-sm group w-6 h-6 text-[10px] font-bold opacity-30 hover:opacity-100"
            style={{
              color: "#" + route.route_text_color,
              backgroundColor: "#" + route.route_color,
            }}
          >
            <div className="leading-none">{route.route_short_name}</div>
            <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"></div>
          </div>
          {/*
          <div className="absolute inset-x-0 z-10 flex flex-col items-stretch justify-between p-4 text-sm text-center text-gray-800 -translate-y-1/2 bg-white border rounded-lg shadow-2xl top-1/2 gap-y-4 border-slate-100">
            <div className="flex items-center justify-start gap-x-4">
              <div className="flex items-center gap-x-1">
                <div className="font-bold">Ligne</div>
                <div
                  className="relative flex flex-col items-center justify-center shadow-sm group  w-6 h-6 text-[10px] font-bold"
                  style={{
                    color: "#" + route.route_text_color,
                    backgroundColor: "#" + route.route_color,
                  }}
                >
                  <div className="leading-none">{route.route_short_name}</div>
                </div>
              </div>
            </div>
          </div>
          */}
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
    <>
    {routesList}
    </>
  )
}
