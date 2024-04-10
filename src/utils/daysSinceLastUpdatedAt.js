export function DaysSinceLastUpdate(lastUpdatedTimestamp) {
  const now = new Date().getTime();
  const lastUpdatedAt = new Date(lastUpdatedTimestamp).getTime();
  const difference = now - lastUpdatedAt;
  const daysDifference = difference / (1000 * 60 * 60 * 24);
 // console.log(parseInt(daysDifference));
  return parseInt(daysDifference);
}
