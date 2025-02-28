import * as echarts from 'echarts/core';

class ChartOptions {

  static hourlyTemperatureChart(hourlyTempData, maxTemp, minTemp) {
    const option = {
      grid: {
        left: 26,
        top: 16,
        right: 24,
        bottom: 24,
      },
      xAxis: {
        type: 'category',
        data: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontFamily: "DM Sans",
          color: "#2c2c2c",
        }
      },
      yAxis: {
        type: 'value',
        max: Math.round(maxTemp*1.1),
        min: Math.round(minTemp*0.9),
        show: true,
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: true,
          margin: 24,
          formatter: function (value, index) {
            return `${value}°`
          },
          fontFamily: "DM Sans",
          color: "#2c2c2c",
          align: "left"
        },
        splitLine: {
          show: true,
          showMinLine: false,
          lineStyle: {
            type: "dashed",
            color: "#2c2c2c25"
          }
        }
      },
      series: [
        {
          name: "hourly-temp",
          type: "line",
          cursor: "pointer",
          smooth: 0.25,
          encode: {
            x: "hour",
            y: "temperature",
          },
          symbol: "none",
          lineStyle: {
            width: 2.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `#3498db`
              },
              {
                offset: 1,
                color: `#2980b9`
              }]),
            shadowColor: "#3498db99",
            shadowBlur: 12,
            shadowOffsetY: 6
          },
          data: hourlyTempData
        }
      ]
    };
    
    return option;
  }

  static multiDateHourlyTemperatureChart(hourlyTempArrays, maxTemp, minTemp) {
    const nextEventDate = hourlyTempArrays[0];
    const afterNextEventDate = hourlyTempArrays[1];
    const option = {
      grid: {
        left: 26,
        top: 16,
        right: 24,
        bottom: 24,
      },
      xAxis: {
        type: 'category',
        data: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontFamily: "DM Sans",
          color: "#2c2c2c",
        }
      },
      yAxis: {
        type: 'value',
        max: Math.round(maxTemp*1.1),
        min: Math.round(minTemp*0.9),
        show: true,
        axisLabel: {
          showMinLabel: false,
          showMaxLabel: true,
          margin: 24,
          formatter: function (value, index) {
            return `${value}°`
          },
          fontFamily: "DM Sans",
          color: "#2c2c2c",
          align: "left"
        },
        splitLine: {
          show: true,
          showMinLine: false,
          lineStyle: {
            type: "dashed",
            color: "#2c2c2c25"
          }
        }
      },
      series: [
        {
          name: "hourly-temp",
          type: "line",
          cursor: "pointer",
          smooth: 0.25,
          encode: {
            x: "hour",
            y: "temperature",
          },
          symbol: "none",
          lineStyle: {
            type: "solid",
            width: 2.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `#3498db`
              },
              {
                offset: 1,
                color: `#2980b9`
              }]),
            shadowColor: "#3498db99",
            shadowBlur: 12,
            shadowOffsetY: 6
          },
          data: nextEventDate
        },
        {
          name: "hourly-temp",
          type: "line",
          cursor: "pointer",
          smooth: 0.25,
          encode: {
            x: "hour",
            y: "temperature",
          },
          symbol: "none",
          lineStyle: {
            type: "dashed",
            width: 2.5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `#3498db`
              },
              {
                offset: 1,
                color: `#2980b9`
              }]),
            shadowColor: "#3498db99",
            shadowBlur: 12,
            shadowOffsetY: 6
          },
          data: afterNextEventDate
        }
      ]
    };
    
    return option;
  }

}

export default ChartOptions;
