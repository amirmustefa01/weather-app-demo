import React from 'react';
import ReactECharts from 'echarts-for-react';
import ChartOptions from './options';

const HourlyTempChart = (props) => {
  const { chartData, dayOfWeek, multiDate } = props;

  React.useEffect(() => {

  }, [multiDate])
  // const twoWeekForecast = chartData?.days[0]?.hours
  const firstDay = new Date().getDay();
  const twoWeekForecast = chartData?.days;
  const nextEventDay = dayOfWeek > firstDay ? dayOfWeek - firstDay : 6 - dayOfWeek;
  if(!multiDate) {
    console.log("firstDay: ", firstDay)
    console.log("twoWeekForecast: ", twoWeekForecast)
    const hourlyTempData = [];
    let maxTemp = 0;
    let minTemp = 100;
    for(let i = 5; i < 21; i++) {
      const temperature = chartData?.days[nextEventDay]?.hours[i]?.temp;
      hourlyTempData.push(temperature);
      if(maxTemp < temperature) maxTemp = temperature;
      if(minTemp > temperature) minTemp = temperature;
    }
    console.log("hourlyTempData: ", hourlyTempData)
    const option = ChartOptions.hourlyTemperatureChart(hourlyTempData, maxTemp, minTemp);
    return <ReactECharts option={option} />
  } else {
    const upcomingEvent = nextEventDay;
    const afterUpcomingEvent = nextEventDay + 7;
    const nextHourlyTempData = [];
    const afterNextHourlyTempData = [];
    let maxTemp = 0;
    let minTemp = 100;
    for(let i = 5; i < 21; i++) {
      const nextTemperature = chartData?.days[upcomingEvent]?.hours[i]?.temp;
      const afterNextTemperature = chartData?.days[afterUpcomingEvent]?.hours[i]?.temp;
      nextHourlyTempData.push(nextTemperature);
      afterNextHourlyTempData.push(afterNextTemperature);
      if(maxTemp < nextTemperature) maxTemp = nextTemperature;
      if(minTemp > nextTemperature) minTemp = nextTemperature;
    }
    const option = ChartOptions.multiDateHourlyTemperatureChart([nextHourlyTempData, afterNextHourlyTempData], maxTemp, minTemp);
    return <ReactECharts option={option} />
  }

}

export { HourlyTempChart };
