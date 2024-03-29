export function calculateEndDate(startDate, durationInMonths) {
  console.log(startDate);
  if (typeof startDate === "string") {
    startDate = new Date(startDate);
  }
  const t = new Date(startDate);
  const p = new Date();
  p.setMonth(t.getMonth() + parseInt(durationInMonths));
  return p.toISOString();
}
