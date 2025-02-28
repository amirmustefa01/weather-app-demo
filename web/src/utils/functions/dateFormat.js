
const DAYS_OF_THE_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satruday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class DateFormat {

  static fullDateString(dateObj) {
    const dateValue = new Date(dateObj)
    const dayOfWeekInt = dateValue.getDay();
    const dayOfWeekString = DAYS_OF_THE_WEEK[dayOfWeekInt];
    const monthString = MONTHS[dateValue.getMonth()];
    const dateString = dateValue.getDate();
    const yearString = dateValue.getFullYear();

    return `${dayOfWeekString}, ${monthString} ${dateString} ${yearString}`
  }

  static dayOfWeekString(dateObj) {
    return `${DAYS_OF_THE_WEEK[dateObj.getDay()]}`
  }

  static nextForecastIndex(nextEventDate, weatherData) {
    const nextEventDayIndex = nextEventDate.getDay();
    const firstDay = new Date().getDay();
    const twoWeekForecast = weatherData?.days;
    const nextEventDay = nextEventDayIndex > firstDay ? nextEventDayIndex - firstDay : 6 - nextEventDayIndex;
    return twoWeekForecast[nextEventDay]
  }

  static getDateObjFromIndex(index, dataArray) {
    const firstDay = new Date().getDay();
    const daysAhead = ((7 - firstDay) + index);
    const dataObj = dataArray[daysAhead];
    const exactDateString = dataObj?.datetime.replace(/-/g, "/");
    const dateObj = new Date(exactDateString)
    return dateObj;
  }

  static getDateAWeekAhead(dateString) {
    const currentDate = new Date(dateString);
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 7);
    return futureDate.toDateString();
  }

  static afterNextForecastIndex(nextEventDate, weatherData) {
    const currentDate = new Date(nextEventDate);
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 7);
    const nextEventDayIndex = futureDate.getDay();
    const firstDay = new Date().getDay();
    const twoWeekForecast = weatherData?.days;
    const nextEventDay = nextEventDayIndex > firstDay ? nextEventDayIndex - firstDay : 6 - nextEventDayIndex;
    return twoWeekForecast[nextEventDay + 7]
  }
}

export default DateFormat;
