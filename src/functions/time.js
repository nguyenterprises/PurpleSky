export const humanTimeHour = (unix, timeZone) => {
  let options = {
    hour: "numeric",
    timeZone: timeZone,
  };
  return new Intl.DateTimeFormat("en-US", options).format(unix);
}
export const humanTimeMinute = (unix, timeZone) => {
  let options = {
    hour: "numeric",
    minute: "numeric",
    timeZone: timeZone,
  };
  return new Intl.DateTimeFormat("en-US", options).format(unix);
}

export const timeLowerCase = (upper) => {
  let lower = upper.replace(/ /g, "").toLowerCase();
  return lower
}

export const humanTimeDayOfWeek = (unix, timeZone) => {
  let options = {
    weekday: "short",
    timeZone: timeZone,
  };
  return new Intl.DateTimeFormat("en-US", options).format(unix);
}

export const humanTime = (unix, timeZone) => {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: timeZone,
  };
  return new Intl.DateTimeFormat("en-US", options).format(unix);
}

export const humanDate = (unix, timeZone) => {
  let options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    timeZone: timeZone,
  };
  return new Intl.DateTimeFormat("en-US", options).format(unix);
}

export const isoToHumanTime = (isoDate, timeZone) => {
  const date = new Date(isoDate);
  const options = { year: '2-digit', month: 'numeric', day: 'numeric', hour: "numeric", minute: "numeric", timeZone: timeZone };
  const readableDate = date.toLocaleDateString('en-US', options);
  return readableDate
}