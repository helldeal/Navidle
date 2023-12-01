/*import { openDb } from 'gtfs';
import { readFile } from 'fs/promises';
const config = JSON.parse(
  await readFile(new URL('./config.json', import.meta.url))
);
const db = openDb(config);

const routes = getRoutes(
    {}, // No query filters
    ['route_id', 'route_short_name', 'route_color'], // Only return these fields
    [['route_short_name', 'ASC']], // Sort by this field and direction
    { db: db } // Options for the query. Can specify which database to use if more than one are open
  );*/