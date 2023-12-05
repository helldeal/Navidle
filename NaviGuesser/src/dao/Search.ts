import { getAllStop } from "./GTFS";

function findMostAccurateStop(stops: any[], search: string) {
  const scores = stops.map((stop) => {
    const name = stop.stop_name.toLowerCase();
    const s = search.toLowerCase();
    const index = name.indexOf(s);
    if (index === -1) {
      return 0;
    } else if (index === 0) {
      return s.length / name.length;
    } else {
      return s.length / (name.length + index);
    }
  });
  const stopScore = stops.map((stop, index: number) => {
    return {
      stop:stop,
      score: scores[index],
    };
  });
  const sortedStops = stopScore.sort(
    (a: { score: number }, b: { score: number }) => b.score - a.score
  );
  return sortedStops.filter(stop=>stop.score>0.7)
}

export function searchStop(inputText: string, maxResults = 20) {
  const stops = getAllStop();
  // Calcul de la distance pour chaque médicament et tri par proximité
  return findMostAccurateStop(stops, inputText).slice(0, maxResults);
}