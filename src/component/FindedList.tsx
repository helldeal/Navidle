import { getRouteByShortName } from "../dao/GTFS";

export default function FindedList({allStopsFinded,setPointed}: any) {
  const findedList = allStopsFinded.map((stop: any) => {
    const laneList = stop.route_short_name.map((routename: string) => {
      const route = getRouteByShortName(routename);
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
        <div className="flex items-center w-full gap-2 p-2 transition-colors border border-transparent rounded-lg group hover:shadow hover:border-slate-50 hover:bg-slate-800" 
        onClick={()=>{
          setPointed(stop)
          }}>
          <div className="text-xs font-medium leading-none text-slate-700 group-hover:text-white">
            {stop.stop_name}
          </div>
          <ul className="flex flex-wrap items-center gap-2">{laneList}</ul>
        </div>
      </li>
    );
  });
  return findedList;
}
