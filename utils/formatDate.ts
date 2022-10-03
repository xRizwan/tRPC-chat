import { DateTime } from "luxon";

// converts date to the required format in order to display on the browser
const convertToString = (date: Date): string => {
  const obj = new Date(date);
  const datetime = DateTime.fromJSDate(obj);
  const ago = datetime.toRelative();

  // if time ago is greater than 1 hour than display in a different format
  if (!ago?.includes("second") && !ago?.includes("minute")) {
    return `${datetime.weekdayShort} ${datetime.toFormat("MMM dd - hh:mma")}`;
  }

  return ago;
};

export default convertToString;
