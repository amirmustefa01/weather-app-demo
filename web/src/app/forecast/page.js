"use client"
import React from "react";
import Image from "next/image";
import Components from "@/components/_components";
import hooks from "@/utils/hooks/_hooks";
import DateFormat from "@/utils/functions/dateFormat";
import * as Charts from "../../charts/charts";

const WEATHER_DATA_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export default function Forecast() {
  const [openComparison, setOpenComparison] = React.useState(false);
  const requestUrl = `${WEATHER_DATA_BASE_URL}10026?unitGroup=us&key=KLVGWCSLHJBXSEUE98R4RNXRN`;
  const weatherData = hooks.useApiRequest({ requestUrl });
  const eventData = hooks.useApiRequest({ requestUrl: 'https://0uq8qdawbc.execute-api.us-east-1.amazonaws.com/' });

  const nextEventDate = eventData?.data && weatherData?.data ? DateFormat.getDateObjFromIndex(eventData?.data?.data?.dayIndex, weatherData?.data?.days) : null;
  const pageTitle = !openComparison ? "Weather Forecast" : "Compare Forecasts";
  const pageSubtitle = !openComparison ? `Weather forecast for ${nextEventDate ? DateFormat.fullDateString(nextEventDate) : 'loading ...'}` : "Hello World";
  const weatherCardTitle = !openComparison ? `This ${nextEventDate ? DateFormat.dayOfWeekString(nextEventDate) : 'loading...'}'s Forecast` : "";
  const nextEventData = weatherData?.data && nextEventDate ? DateFormat.nextForecastIndex(nextEventDate, weatherData?.data) : null;
  const headerDate = nextEventDate && eventData?.data ? `Every ${DateFormat.fullDateString(nextEventDate).split(",")[0]}, ${eventData?.data?.data?.eventTime}` : 'Loading ...';
  const headerLocation = eventData?.data ? `${eventData?.data?.data?.location}` : 'Loading ...';

  return (
    <div style={{position: "relative", boxSizing: "border-box", width: "100svw", minHeight: "100svh"}}>
      <Components.PageBackgroundImage />
      <Components.PageHeader headerDate={headerDate} headerLocation={headerLocation} />
      <div style={{position: "relative", paddingTop: "2vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 48, padding: "0 4vw"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            <h1 style={{width: "100%", fontFamily: "DM Sans", fontSize: 64, lineHeight: "80px", fontWeight: "500", color: "#2c2c2c", textAlign: "left"}}>{pageTitle}</h1>
            <p style={{width: "100%", marginTop: 0, fontFamily: "DM Sans", fontSize: 18, lineHeight: "28px", fontWeight: "400", color: "#2c2c2c99", textAlign: "left"}}>{pageSubtitle}</p>
          </div>
          {(function(){
            if(!openComparison) {
              return (
                <div onClick={() => setOpenComparison(true)} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, padding: "16px 32px", background: "#2c2c2c", borderRadius: 12, boxShadow: "0px 12px 42px #00000066"}}>
                  <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#ffffff", letterSpacing: "1.25px", textAlign: "center", textTransform: "uppercase"}}>Compare Next Week</p>
                </div>
              )
            } else {
              return (
                <div onClick={() => setOpenComparison(false)} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, padding: "16px 32px", background: "#e74c3c", borderRadius: 12, boxShadow: "0px 12px 42px #e74c3c66"}}>
                  <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#ffffff", letterSpacing: "1.25px", textAlign: "center", textTransform: "uppercase"}}>Remove Comparison</p>
                </div>
              )
            }
          })()}
        </div>
        <div style={{boxSizing: "border-box", width: "100%", padding: "2vw 4vw", display: "flex", flexDirection: "row", alignItems: "stretch", gap: 36}}>
          <div style={{position: "relative", boxSizing: "border-box", flex: 3, display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
            <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>{weatherCardTitle}</p>
            {/* <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} /> */}
            {(function(){
              if(!weatherData?.isLoading && weatherData?.data) {
                if(!openComparison) {
                  return (
                    <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 18}}>
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 18}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                          <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "88px", color: "#2c2c2c", verticalAlign: "top"}}>{nextEventData ? Math.round(nextEventData?.temp) : '--'}</span>
                          <span style={{position: "relative", left: 4, fontFamily: "DM Sans", fontSize: 64, lineHeight: "72px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          <span style={{position: "relative", left: 10, fontFamily: "DM Sans", fontSize: 32, lineHeight: "48px", fontWeight: "500", color: "#2c2c2c", verticalAlign: "top"}}>F</span>
                        </div>
                      </div>
                      <p style={{marginTop: 2, fontFamily: "DM Sans", fontWeight: "400", fontSize: 17, color: "#2c2c2c"}}>{nextEventData?.description.slice(0, -1)} ...</p>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>{nextEventDate ? DateFormat.fullDateString(nextEventDate) : 'loading ...'}</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/clock.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>12 PM - 4 PM EST</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>{headerLocation}</p>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 8}}>
                      <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8, marginTop: 12}}>
                        <Image src={'/icons/clock.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                        <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>12 PM - 4 PM EST</p>
                      </div>
                      <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8, marginTop: 12}}>
                        <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                        <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Central Park, New York 10026</p>
                      </div>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 24}} />
                      <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", gap: 6, marginTop: 8}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8, marginTop: 12}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={18} height={18} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, lineHeight: "17px", color: "#2c2c2c"}}>Friday, March 3rd 2025</p>
                        </div>
                        <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 12, padding: "8px 0px"}}>
                          <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={36} height={36} style={{opacity: 1}} />
                          <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                            <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 36, lineHeight: "36px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                            <span style={{position: "relative", left: 2, fontFamily: "DM Sans", fontSize: 24, lineHeight: "26px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          </div>
                          <p style={{marginLeft: 8, fontFamily: "DM Sans", fontWeight: "400", fontSize: 14, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                        </div>
                      </div>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 8}} />
                      <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", gap: 6, marginTop: 8}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8, marginTop: 12}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={18} height={18} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, lineHeight: "17px", color: "#2c2c2c"}}>Friday, March 10th 2025</p>
                        </div>
                        <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 12, padding: "8px 0px"}}>
                          <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={36} height={36} style={{opacity: 1}} />
                          <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                            <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 36, lineHeight: "36px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                            <span style={{position: "relative", left: 2, fontFamily: "DM Sans", fontSize: 24, lineHeight: "26px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          </div>
                          <p style={{marginLeft: 8, fontFamily: "DM Sans", fontWeight: "400", fontSize: 14, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                        </div>
                      </div>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 8}} />

{/* 
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 18}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                          <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "88px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                          <span style={{position: "relative", left: 4, fontFamily: "DM Sans", fontSize: 64, lineHeight: "72px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          <span style={{position: "relative", left: 10, fontFamily: "DM Sans", fontSize: 32, lineHeight: "48px", fontWeight: "500", color: "#2c2c2c", verticalAlign: "top"}}>F</span>
                        </div>
                      </div>
                      <p style={{marginTop: 2, fontFamily: "DM Sans", fontWeight: "400", fontSize: 17, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Friday, March 3rd 2025</p>
                        </div>
                      </div> */}
                    </div>
                  )
                }
              }
            })()}
          </div>
          <div style={{position: "relative", flex: 8, display: "flex", flexDirection: "row", padding: 0, alignItems: "start", gap: 16}}>

            <div style={{position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
              <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "start"}}>
                <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Hourly Forecast</p>
                {/* <div style={{position: "relative", display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center", background: "#2c2c2c10", borderRadius: 10}}>
                  <div style={{position: "absolute", top: 3, left: 3, width: 84, height: 26, background: "#ffffff", borderRadius: 7, boxShadow: "0 2px 10px #00000018", zIndex: 0}} />
                  <div style={{width: 90, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, padding: "10px 0px", zIndex: 1}}>
                    <div style={{width: 6, height: 6, borderRadius: 6, background: "#3498db", boxShadow: "0 0 8px #3498db99"}} />
                    <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, lineHeight: "12px", color: "#2c2c2c"}}>Temp</p>
                  </div>
                  <div style={{width: 1, height: 12, background: "#2c2c2c50"}} />
                  <div style={{width: 90, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, padding: "10px 0px", zIndex: 1}}>
                    <div style={{width: 6, height: 6, borderRadius: 6, background: "#3498db", boxShadow: "0 0 8px #3498db99"}} />
                    <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, lineHeight: "12px", color: "#2c2c2c"}}>Rain</p>
                  </div>
                  <div style={{width: 1, height: 12, background: "#2c2c2c50"}} />
                  <div style={{width: 90, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, padding: "10px 0px", zIndex: 1}}>
                    <div style={{width: 6, height: 6, borderRadius: 6, background: "#3498db", boxShadow: "0 0 8px #3498db99"}} />
                    <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, lineHeight: "12px", color: "#2c2c2c"}}>Wind</p>
                  </div>
                </div> */}
                <div style={{position: "relative", display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center", background: "#2c2c2c10", borderRadius: 10}}>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, padding: "10px 20px", zIndex: 1}}>
                    <div style={{width: 20, height: 3, borderRadius: 3, background: "#3498db", boxShadow: "0 0 8px #3498db99"}} />
                    <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, lineHeight: "12px", color: "#2c2c2c"}}>This Week</p>
                  </div>
                  <div style={{width: 1, height: 12, background: "#2c2c2c50"}} />
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, padding: "10px 20px", zIndex: 1}}>
                    <div style={{width: 20, height: 3, borderRadius: 3, background: "repeating-linear-gradient(90deg, #3498db 0px, #3498db 4.5px, #2c2c2c00 4.5px, #2c2c2c00 7.5px)"}} />
                    <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, lineHeight: "12px", color: "#2c2c2c"}}>Next Week</p>
                  </div>
                </div>
              </div>
              <div style={{position: "relative", width: "100%", flexGrow: 1, boxSizing: "border-box", paddingTop: 8}}>
                <div style={{position: "relative", top: 8, bottom: 0, left: 0, right: 0, width: "100%", height: "100%", padding: 0}}>
                  {(function(){
                    if(!weatherData?.isLoading && weatherData?.data) {
                      return <Charts.HourlyTempChart chartData={weatherData?.data} dayOfWeek={5} multiDate={openComparison} />
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{boxSizing: "border-box", width: "100%", padding: "0vw 4vw", display: "flex", flexDirection: "row", alignItems: "stretch", gap: 36}}>
          <div style={{position: "relative", flex: 3, boxSizing: "border-box", display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
            <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Weather Alerts</p>
            <p style={{width: "90%", marginTop: 4, fontFamily: "DM Sans", fontWeight: "400", fontSize: 13, lineHeight: "20px", color: "#2c2c2c99", letterSpacing: "0.2px"}}>Important warnings or insights about the weather.</p>
            <div style={{position: "relative", width: "100%", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 16, margin: 8}}>
              <p style={{width: "100%", fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c99", letterSpacing: "0.2px", textAlign: "center"}}>No weather alerts ...</p>
            </div>
            {/* <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 24}}>
              {(function(){
                return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satruday"].map((day, index) => {
                  return (
                    <div key={index} style={{minWidth: "66%", padding: "10px 18px", border: "1px solid #2c2c2c80", borderRadius: 8, display: "flex", justifyContent: "center"}}>
                      <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#2c2c2c", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>{day}</label>
                    </div>
                  )
                })
              })()}
              <div style={{width: "66%", padding: "10px 18px", border: "1px solid #2c2c2c80", borderRadius: 8, display: "flex", justifyContent: "center"}}>
                <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#2c2c2c", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>Friday</label>
              </div>
              <div style={{width: "66%", padding: "10px 18px", border: "1px solid #2c2c2c80", borderRadius: 8, display: "flex", justifyContent: "center"}}>
                <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#2c2c2c", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>12:00 PM EST</label>
              </div>
              <div style={{width: "66%", padding: "10px 18px", border: "1px solid #2c2c2c80", borderRadius: 8, display: "flex", justifyContent: "center"}}>
                <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#2c2c2c", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>4 Hours</label>
              </div>
            </div> */}
          </div>
          <div style={{position: "relative", flex: 8, display: "flex", flexDirection: "column", padding: 0, justifyContent: "start", alignItems: "start"}}>
            <p style={{marginTop: 8, fontFamily: "DM Sans", fontWeight: "500", fontSize: 18, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Weekly Forecast</p>
            <div style={{position: "relative", width: "100%", marginTop: 16, display: "flex", flexDirection: "row", padding: 0, justifyContent: "space-between", alignItems: "start", gap: 16}}>
              {(function(){
                return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satruday"].map((day, index) => {
                  return (
                    <div key={index} style={{boxSizing: "border-box", flexGrow: 1, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 12, boxShadow: "0px 8px 24px #00000025"}}>
                      <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "600", fontSize: 12, color: "#2c2c2c", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase", marginTop: 6}}>{day.slice(0, 3)}</label>
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={32} height={32} style={{opacity: 1, marginTop: 20}} />
                      <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start", marginTop: 20}}>
                        <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 36, lineHeight: "36px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                        <span style={{position: "relative", left: 2, fontFamily: "DM Sans", fontSize: 24, lineHeight: "26px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>
        </div>
        <div style={{position: "relative", boxSizing: "border-box", width: "100%", display: "flex", flexDirection: "column", padding: "3vw 4vw 16vh 4vw", justifyContent: "start", alignItems: "start"}}>
          <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 18, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Advanced Forecast Data</p>
          <div style={{position: "relative", width: "100%", marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(364px, 1fr))", gap: 24, overflow: "hidden"}}>
            <div style={{position: "relative", boxSizing: "border-box", flex: 1, minWidth: 364, display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
              <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Percipitation</p>
              <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
              {(function(){
                if(!weatherData?.isLoading && weatherData?.data) {
                  return (
                    <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 18}}>
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 18}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                          <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "88px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                          <span style={{position: "relative", left: 4, fontFamily: "DM Sans", fontSize: 64, lineHeight: "72px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          <span style={{position: "relative", left: 10, fontFamily: "DM Sans", fontSize: 32, lineHeight: "48px", fontWeight: "500", color: "#2c2c2c", verticalAlign: "top"}}>F</span>
                        </div>
                      </div>
                      <p style={{marginTop: 2, fontFamily: "DM Sans", fontWeight: "400", fontSize: 17, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Friday, March 3rd 2025</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/clock.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>12 PM - 4 PM EST</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Central Park, New York 10026</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              })()}
            </div>
            <div style={{position: "relative", boxSizing: "border-box", flex: 1, minWidth: 364, display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
              <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Windshield</p>
              <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
              {(function(){
                if(!weatherData?.isLoading && weatherData?.data) {
                  return (
                    <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 18}}>
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 18}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                          <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "88px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                          <span style={{position: "relative", left: 4, fontFamily: "DM Sans", fontSize: 64, lineHeight: "72px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          <span style={{position: "relative", left: 10, fontFamily: "DM Sans", fontSize: 32, lineHeight: "48px", fontWeight: "500", color: "#2c2c2c", verticalAlign: "top"}}>F</span>
                        </div>
                      </div>
                      <p style={{marginTop: 2, fontFamily: "DM Sans", fontWeight: "400", fontSize: 17, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Friday, March 3rd 2025</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/clock.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>12 PM - 4 PM EST</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Central Park, New York 10026</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              })()}
            </div>
            <div style={{position: "relative", boxSizing: "border-box", flex: 1, minWidth: 364, display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
              <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Humidity</p>
              <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
              {(function(){
                if(!weatherData?.isLoading && weatherData?.data) {
                  return (
                    <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 18}}>
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 18}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                          <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "88px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                          <span style={{position: "relative", left: 4, fontFamily: "DM Sans", fontSize: 64, lineHeight: "72px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          <span style={{position: "relative", left: 10, fontFamily: "DM Sans", fontSize: 32, lineHeight: "48px", fontWeight: "500", color: "#2c2c2c", verticalAlign: "top"}}>F</span>
                        </div>
                      </div>
                      <p style={{marginTop: 2, fontFamily: "DM Sans", fontWeight: "400", fontSize: 17, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Friday, March 3rd 2025</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/clock.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>12 PM - 4 PM EST</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Central Park, New York 10026</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              })()}
            </div>
            <div style={{position: "relative", boxSizing: "border-box", flex: 1, minWidth: 364, display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
              <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>UV Index</p>
              <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
              {(function(){
                if(!weatherData?.isLoading && weatherData?.data) {
                  return (
                    <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 18}}>
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 18}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                          <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "88px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                          <span style={{position: "relative", left: 4, fontFamily: "DM Sans", fontSize: 64, lineHeight: "72px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          <span style={{position: "relative", left: 10, fontFamily: "DM Sans", fontSize: 32, lineHeight: "48px", fontWeight: "500", color: "#2c2c2c", verticalAlign: "top"}}>F</span>
                        </div>
                      </div>
                      <p style={{marginTop: 2, fontFamily: "DM Sans", fontWeight: "400", fontSize: 17, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Friday, March 3rd 2025</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/clock.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>12 PM - 4 PM EST</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Central Park, New York 10026</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              })()}
            </div>
            <div style={{position: "relative", boxSizing: "border-box", flex: 1, minWidth: 364, display: "flex", flexDirection: "column", padding: "28px 24px", background: "#ffffff99", border: "1.5px solid white", borderRadius: 20, boxShadow: "0px 16px 36px #00000033"}}>
              <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 15, color: "#2c2c2c", letterSpacing: "1px", textTransform: "uppercase"}}>Visibility</p>
              <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 10}} />
              {(function(){
                if(!weatherData?.isLoading && weatherData?.data) {
                  return (
                    <div style={{position: "relative", width: "100%", display: "flex", flexDirection: "column", marginTop: 18}}>
                      <Image src={'/icons/partly-cloudy-day.svg'} alt={"map pin icon"} width={48} height={48} style={{opacity: 1}} />
                      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 18}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "start"}}>
                          <span style={{fontFamily: "DM Sans", fontWeight: "300", fontSize: 88, lineHeight: "88px", color: "#2c2c2c", verticalAlign: "top"}}>96</span>
                          <span style={{position: "relative", left: 4, fontFamily: "DM Sans", fontSize: 64, lineHeight: "72px", fontWeight: "200", color: "#2c2c2c", verticalAlign: "top"}}>&deg;</span>
                          <span style={{position: "relative", left: 10, fontFamily: "DM Sans", fontSize: 32, lineHeight: "48px", fontWeight: "500", color: "#2c2c2c", verticalAlign: "top"}}>F</span>
                        </div>
                      </div>
                      <p style={{marginTop: 2, fontFamily: "DM Sans", fontWeight: "400", fontSize: 17, color: "#2c2c2c"}}>Partly cloudy throughout the day ...</p>
                      <div style={{width: "100%", height: 1, background: "#2c2c2c33", marginTop: 16}} />
                      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/calendar.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Friday, March 3rd 2025</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/clock.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>12 PM - 4 PM EST</p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "end", gap: 8}}>
                          <Image src={'/icons/pinmap.svg'} alt={"map pin icon"} width={20} height={20} style={{opacity: 1}} />
                          <p style={{fontFamily: "DM Sans", fontWeight: "400", fontSize: 15, lineHeight: "20px", color: "#2c2c2c"}}>Central Park, New York 10026</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
