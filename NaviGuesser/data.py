
import pandas as pd
# Loading the necessary files
routes_df = pd.read_csv('NaviGuesser/gtfs-tan/routes.txt')
trips_df = pd.read_csv('NaviGuesser/gtfs-tan/trips.txt')
stop_times_df = pd.read_csv('NaviGuesser/gtfs-tan/stop_times.txt',low_memory=False)
stops_df = pd.read_csv('NaviGuesser/gtfs-tan/stops.txt')

#print(routes_df)

# Merging the data to get the route for each stop
# First, merge trips with routes
route_trip_df = pd.merge(trips_df[['route_id', 'trip_id']], routes_df[['route_id', 'route_short_name', 'route_long_name']], on='route_id')
# Then, merge with stop_times
route_trip_stop_df = pd.merge(route_trip_df, stop_times_df[['trip_id', 'stop_id']], on='trip_id')
# Finally, merge with stops
route_stop_df = pd.merge(route_trip_stop_df, stops_df[['stop_id', 'stop_name']], on='stop_id')

# Removing duplicates and sorting
route_stop_df = route_stop_df.drop_duplicates(subset=['route_id', 'stop_id']).sort_values(by=['route_id', 'stop_id'])

# Preview the resulting DataFrame
route_stop_df.head()
# To get the stops in the order of passage for route 4, we need to look at a specific trip
# Let's find a trip for route 4 and then list the stops in the order they are visited in that trip

# First, get a trip ID for route 4
trip_id_for_route_4 = route_stop_df[route_stop_df['route_short_name'] == '4']['trip_id'].iloc[0]
# Now, filter stop_times_df for this trip ID and order by the stop sequence
stops_in_order_for_route_4 = stop_times_df[stop_times_df['trip_id'] == trip_id_for_route_4].sort_values(by='stop_sequence')
# Merging with stops to get stop names
stops_in_order_for_route_4 = pd.merge(stops_in_order_for_route_4, stops_df[['stop_id', 'stop_name']], on='stop_id')
# Selecting relevant columns
stops_in_order_for_route_4 = stops_in_order_for_route_4[['stop_sequence', 'stop_name']].reset_index(drop=True)

print(stops_in_order_for_route_4)