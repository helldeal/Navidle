import pandas as pd
pd.set_option('display.max_columns', 14)
pd.set_option('display.width', 1000)
# Loading the necessary files
routes_df = pd.read_csv('NaviGuesser/gtfs-tan/routes.txt')
trips_df = pd.read_csv('NaviGuesser/gtfs-tan/trips.txt')
stop_times_df = pd.read_csv('NaviGuesser/gtfs-tan/stop_times.txt', low_memory=False)
stops_df = pd.read_csv('NaviGuesser/gtfs-tan/stops.txt')

# Merging the data to get the route for each stop
# First, merge trips with routes
route_trip_df = pd.merge(trips_df[['route_id', 'trip_id']], routes_df[['route_id', 'route_short_name', 'route_long_name']], on='route_id')
# Then, merge with stop_times
route_trip_stop_df = pd.merge(route_trip_df, stop_times_df[['trip_id', 'stop_id']], on='trip_id')
# Finally, merge with stops
route_stop_df = pd.merge(route_trip_stop_df, stops_df, on='stop_id')

# Removing duplicates and sorting
route_stop_df = route_stop_df.drop_duplicates(subset=['route_id', 'stop_id']).sort_values(by=['route_id', 'stop_id'])

def getRouteWithStop(idRoute):
    # Filtering for the specified route
    route_stops = route_stop_df[route_stop_df['route_short_name'] == idRoute].sort_values(by=['trip_id', 'stop_id'])
    
    # Dropping duplicates and resetting index
    unique_stops_route = route_stops.drop_duplicates(subset=['stop_id']).reset_index(drop=True)
    
    return unique_stops_route

# Display all stop information for route 27
route_27_stops_info = getRouteWithStop('27')
#print(route_27_stops_info)
json_result = routes_df.to_json(orient='records')

# Chemin du fichier où stocker le JSON
file_path = 'routes.json'

# Écrire le JSON dans un fichier
with open(file_path, 'w') as file:
    file.write(json_result)