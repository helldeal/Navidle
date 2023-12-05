import stop from './parent_stops_with_routes.json';
import route from './routes.json';



export function getAllRoute() {   
  try {
    return JSON.parse(JSON.stringify(route)) ;
  } catch (error) {
    console.error('Error reading JSON file', error);
  }
}

export function getAllStop() {   
  try {
    return JSON.parse(JSON.stringify(stop))
  } catch (error) {
    console.error('Error reading JSON file', error);
  }
}

export function getAllRoutebyType() {
  try {
    const routes = JSON.parse(JSON.stringify(route));
    return routes.reduce((acc: { [x: string]: any[]; }, currentRoute: { route_type: string | number; }) => {
      acc[currentRoute.route_type] = acc[currentRoute.route_type] || [];
      acc[currentRoute.route_type].push(currentRoute);

      return acc;
    }, {} );
  } catch (error) {
    console.error('Error processing JSON file', error);
  }
}

export function getFirstRouteShortNameForStop(stop:any) {
  return getRouteByShortName(stop.route_short_name[0]) 
}

export function getRouteByShortName(routeShortName: string) {
  const Allroute=getAllRoute()
  const route = Allroute.find((r:any) => r.route_short_name === routeShortName);
  return route || null; // Return the route if found, otherwise null
}

export function getStopsForRoute(route: any,stops:any) {
  return stops.filter((stop:any) => 
    stop.route_short_name.includes(route.route_short_name)
  );
}