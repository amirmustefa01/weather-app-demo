"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Components from "@/components/_components";
import hooks from "@/utils/hooks/_hooks";
import DateFormat from "@/utils/functions/dateFormat";

const WEATHER_DATA_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export default function Home() {
  const requestUrl = `${WEATHER_DATA_BASE_URL}10026?unitGroup=us&key=KLVGWCSLHJBXSEUE98R4RNXRN`;
  const weatherData = hooks.useApiRequest({ requestUrl });
  const eventData = hooks.useApiRequest({ requestUrl: 'https://0uq8qdawbc.execute-api.us-east-1.amazonaws.com/' });
  const nextEventDate = eventData?.data && weatherData?.data ? DateFormat.getDateObjFromIndex(eventData?.data?.data?.dayIndex, weatherData?.data?.days) : null;
  const headerDate = nextEventDate && eventData?.data ? `Every ${DateFormat.fullDateString(nextEventDate).split(",")[0]}, ${eventData?.data?.data?.eventTime}` : 'Loading ...';
  const headerLocation = eventData?.data ? `${eventData?.data?.data?.location}` : 'Loading ...';
  const nextEventData = weatherData?.data && nextEventDate ? DateFormat.nextForecastIndex(nextEventDate, weatherData?.data) : null;
  const afterNextEventData = weatherData?.data && nextEventDate ? DateFormat.afterNextForecastIndex(nextEventDate, weatherData?.data) : null;
  const nextWeekDateString = nextEventDate ? DateFormat?.getDateAWeekAhead(nextEventDate) : 'Loading ...';

  return (
    <div style={{position: "relative", boxSizing: "border-box", width: "100svw", minHeight: "100svh"}}>
      <Components.PageBackgroundImage />
      <Components.PageHeader headerDate={headerDate} headerLocation={headerLocation} />
      <div style={{position: "relative", paddingTop: "4vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{maxWidth: "66vw", fontFamily: "DM Sans", fontSize: 64, lineHeight: "80px", fontWeight: "500", color: "#2c2c2c", textAlign: "center"}}>Weekly Ultimate Frisbee Tournament At Central Park</h1>
        <p style={{maxWidth: "66vw", marginTop: 8, fontFamily: "DM Sans", fontSize: 18, lineHeight: "28px", fontWeight: "400", color: "#2c2c2c99", textAlign: "center"}}>Come hang out with the gang every friday around noon to <br />play frisbee and catch up. But also adding more text here just in case.</p>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 36, paddingTop: "5vh"}}>
          <div style={{position: "relative", width: 350, height: 380, display: "flex", flexDirection: "column", padding: "24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
            <p style={{position: "relative", fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Upcoming Events</p>
            <div style={{position: "relative", width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
            <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 16}}>
              <div style={{minWidth: 1.5, height: "70%", flexShrink: 0, background: "#2c2c2c"}} />
              <div style={{position: "relative", flexGrow: 1, display: "flex", flexDirection: "column", gap: 6, marginTop: 8}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8, marginTop: 12}}>
                  <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={18} height={18} style={{opacity: 1}} />
                  <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, lineHeight: "17px", color: "#2c2c2c"}}>{DateFormat.fullDateString(nextEventDate)}</p>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 12, padding: "8px 0px"}}>
                  <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={36} height={36} style={{opacity: 1}} />
                  <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                    <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 36, lineHeight: "36px", color: "#2c2c2c", verticalAlign: "top"}}>{nextEventData ? Math.round(nextEventData?.temp) : '--'}</span>
                    <span style={{position: "relative", left: 2, fontFamily: "DM Sans", fontSize: 24, lineHeight: "26px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                  </div>
                  <p style={{marginLeft: 8, fontFamily: "DM Sans", fontWeight: "400", fontSize: 14, color: "#2c2c2c"}}>{nextEventData ? nextEventData?.description: 'Loading ...'}</p>
                </div>
              </div>
            </div>
            <div style={{position: "relative", width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
            <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 16}}>
              <div style={{minWidth: 1.5, height: "70%", flexShrink: 0, background: "#2c2c2c"}} />
              <div style={{position: "relative", flexGrow: 1, display: "flex", flexDirection: "column", gap: 6, marginTop: 8}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8, marginTop: 12}}>
                  <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={18} height={18} style={{opacity: 1}} />
                  <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, lineHeight: "17px", color: "#2c2c2c"}}>{nextWeekDateString}</p>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 12, padding: "8px 0px"}}>
                  <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={36} height={36} style={{opacity: 1}} />
                  <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                    <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 36, lineHeight: "36px", color: "#2c2c2c", verticalAlign: "top"}}>{afterNextEventData ? Math.round(afterNextEventData?.temp) : '--'}</span>
                    <span style={{position: "relative", left: 2, fontFamily: "DM Sans", fontSize: 24, lineHeight: "26px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                  </div>
                  <p style={{marginLeft: 8, fontFamily: "DM Sans", fontWeight: "400", fontSize: 14, color: "#2c2c2c"}}>{afterNextEventData ? afterNextEventData?.description: 'Loading ...'}</p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => window.location = "./forecast"} style={{position: "relative", width: 350, height: 380, display: "flex", flexDirection: "column", padding: "24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033", cursor: "pointer"}}>
            <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Weather Forecast</p>
            <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
            {(function(){
              if(!weatherData?.isLoading && weatherData?.data) {
                return (
                  <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 18}}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 6}}>
                      <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={18} height={18} style={{opacity: 1}} />
                      <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, lineHeight: "14px", color: "#2c2c2ccc", marginTop: -1}}>{headerLocation}</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 12}}>
                      <h3 style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "100px", color: "#2c2c2c"}}>
                        {nextEventData ? Math.round(nextEventData?.temp) : '--'}<span style={{fontWeight: "200"}}>&deg;</span>
                      </h3>
                      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexGrow: 1}}>
                        <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      </div>
                    </div>
                    <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, color: "#2c2c2c"}}>{nextEventData?.description.slice(0, -1)} ...</p>
                    <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                    <div style={{display: "flex", flexDirection: "column", gap: 12, marginTop: 18}}>
                      <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                        <Image src={'/icons/rain_cloud.svg'} alt={"map pin icon"} width={18} height={18} style={{opacity: 1}} />
                        <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, lineHeight: "19px", color: "#2c2c2ccc"}}>Chance of Rain: </p>
                        <p style={{flexGrow: 1, fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, lineHeight: "19px", color: "#2c2c2c", textAlign: "right"}}>{nextEventData?.precipprob}%</p>
                      </div>
                      <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                        <Image src={'/icons/wind.svg'} alt={"map pin icon"} width={18} height={18} style={{opacity: 1}} />
                        <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, lineHeight: "19px", color: "#2c2c2ccc"}}>Wind Speeds: </p>
                        <p style={{flexGrow: 1, fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, lineHeight: "19px", color: "#2c2c2c", textAlign: "right"}}>{nextEventData?.windspeed} mph</p>
                      </div>
                    </div>
                  </div>
                )
              }
            })()}
            <p style={{position: "absolute", bottom: 18, left: 0, width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 13, letterSpacing: "1px", color: "#2c2c2c", textAlign: "center", textTransform: "uppercase"}}>Explore Forecast</p>
          </div>
          <div style={{width: 350, height: 380, display: "flex", flexDirection: "column", padding: "24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
            <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Message Board</p>
            <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
          </div>
        </div>
      </div>
    </div>
  );
}
