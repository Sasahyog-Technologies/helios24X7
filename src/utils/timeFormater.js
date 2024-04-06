export function FormatTime(timeString) {
  let timeParts = timeString.split(":");
  let hours = parseInt(timeParts[0], 10);
  let minutes = parseInt(timeParts[1], 10);
  let seconds = parseInt(timeParts[2], 10);

  let date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  let formattedTime = date.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  console.log(formattedTime);
  return formattedTime;
}
