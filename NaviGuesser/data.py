import pandas as pd

pd.set_option('display.max_columns', 14)
pd.set_option('display.width', 1000)
# Loading the necessary files
routes_df = pd.read_csv('NaviGuesser/gtfs-tan/routes.txt')
trips_df = pd.read_csv('NaviGuesser/gtfs-tan/trips.txt')
stop_times_df = pd.read_csv('NaviGuesser/gtfs-tan/stop_times.txt', low_memory=False)
stops_df = pd.read_csv('NaviGuesser/gtfs-tan/stops.txt')

# Exclure certaines lignes spécifiques
excluded_routes = ['LC', 'LCE', 'LCN', 'LCO', 'LN', 'LO', 'LS']
routes_df = routes_df[~routes_df['route_short_name'].isin(excluded_routes)]

# Identifier les arrêts principaux (supposer que les arrêts principaux n'ont pas de parent_station ou sont leur propre parent)
parent_stops = stops_df[stops_df['parent_station'].isna() | (stops_df['stop_id'] == stops_df['parent_station'])]

# Fusion des DataFrames pour obtenir les informations sur les arrêts pour chaque route
route_trip_df = pd.merge(trips_df[['route_id', 'trip_id']], routes_df[['route_id', 'route_short_name', 'route_long_name']], on='route_id')
route_trip_stop_df = pd.merge(route_trip_df, stop_times_df[['trip_id', 'stop_id']], on='trip_id')
route_stop_df = pd.merge(route_trip_stop_df, stops_df, on='stop_id')

# Regroupement par arrêt parent et rassemblement des lignes pour chaque arrêt
stops_with_routes = route_stop_df.groupby('stop_id').agg({
    'stop_name': 'first',  # Prendre le nom de l'arrêt
    'stop_lat': 'first',  # Prendre le nom de l'arrêt
    'stop_lon': 'first',  # Prendre le nom de l'arrêt
    'parent_station': 'first',  # Prendre le nom de l'arrêt
    'route_short_name': lambda x: list(x.unique())  # Liste des lignes uniques pour chaque arrêt
}).reset_index()

stops_with_routes=pd.merge(parent_stops,stops_with_routes[['parent_station','route_short_name']], right_on='parent_station', left_on='stop_id')

def combine_lists(series):
    return list(set(series.sum()))

stops_with_routes=stops_with_routes.groupby('stop_id').agg({
    'stop_name': 'first',  # Prendre le nom de l'arrêt
    'stop_lat': 'first',  # Prendre le nom de l'arrêt
    'stop_lon': 'first',  # Prendre le nom de l'arrêt
    'route_short_name': combine_lists,  
}).reset_index()

# Conversion du DataFrame en JSON
json_stops_with_routes = stops_with_routes.to_json(orient='records')

# Chemin du fichier pour stocker le JSON
stops_routes_file_path = 'parent_stops_with_routes.json'

# Écriture du JSON dans un fichier
with open(stops_routes_file_path, 'w') as file:
    file.write(json_stops_with_routes)

json_result = routes_df.to_json(orient='records')

# Chemin du fichier où stocker le JSON
file_path = 'routes.json'

# Écrire le JSON dans un fichier
with open(file_path, 'w') as file:
    file.write(json_result)