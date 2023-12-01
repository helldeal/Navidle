import fs from 'fs';
import csv from 'csv-parser';

const GTFS_FILES_PATH = 'NaviGuesser/gtfs-tan';

function readCsvFile<T>(filePath: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

export async function getTripsForRoute(routeId: string) {
    const trips = await readCsvFile<any>(`${GTFS_FILES_PATH}/trips.txt`);
    return trips.filter(trip => trip.route_id === routeId);
}

export async function getStopTimesForTrip(tripId: string) {
    const stopTimes = await readCsvFile<any>(`${GTFS_FILES_PATH}/stop_times.txt`);
    return stopTimes.filter(stopTime => stopTime.trip_id === tripId);
}

export async function getStop(stopId: string) {
    const stops = await readCsvFile<any>(`${GTFS_FILES_PATH}/stops.txt`);
    return stops.find(stop => stop.stop_id === stopId);
}

export async function getAllStop() {
    const stops = await readCsvFile<any>(`${GTFS_FILES_PATH}/stops.txt`);
    return stops
}

export async function getStopsInOrderForRoute(routeId: string) {
    const trips = await getTripsForRoute(routeId);
    const firstTrip = trips[0]; // Choix d'un trip spécifique
    const stopTimes = await getStopTimesForTrip(firstTrip.trip_id);
    stopTimes.sort((a, b) => a.stop_sequence - b.stop_sequence);

    const stopsInOrder = [];
    for (const stopTime of stopTimes) {
        const stop = await getStop(stopTime.stop_id);
        stopsInOrder.push(stop);
    }

    return stopsInOrder;
}

// Exemple d'utilisation
const routeId = '4'; // ID de la route souhaitée
getStopsInOrderForRoute(routeId).then(stops => {
    console.log('Stops in order for route:', routeId);
    stops.forEach(stop => console.log(stop.stop_name));
});