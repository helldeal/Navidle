import stop from './parent_stops_with_routes.json';
import route from './routes.json';

export function getAllRoute(){   
  try {
    const medicaments=JSON.parse(JSON.stringify(route))
    return medicaments
  } catch (error) {
    console.error('Error reading JSON file', error);
  }
}

export function getAllStop(){   
  try {
    const medicaments=JSON.parse(JSON.stringify(stop))
    return medicaments
  } catch (error) {
    console.error('Error reading JSON file', error);
  }
}
