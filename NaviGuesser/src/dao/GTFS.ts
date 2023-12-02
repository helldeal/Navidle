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
      // Initialize an array for the route_type if it doesn't exist
      acc[currentRoute.route_type] = acc[currentRoute.route_type] || [];
      // Add the current route to its route_type array
      acc[currentRoute.route_type].push(currentRoute);

      return acc;
    }, {} );
  } catch (error) {
    console.error('Error processing JSON file', error);
  }
}