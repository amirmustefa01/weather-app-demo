"use client"
import Image from "next/image";
import React from "react";
import hooks from "@/utils/hooks/_hooks";

export default function PageHeader({ headerDate, headerLocation }) {
  const [showDateDropdown, setShowDateDropdown] = React.useState(false);
  const [showInputDropdown, setShowInputDropdown] = React.useState(false);
  const updateEventDay = hooks.useApiPostRequest({ requestUrl: 'https://0uq8qdawbc.execute-api.us-east-1.amazonaws.com/change-day' })

  const makeUpdateReq = async (index) => {
    await updateEventDay({ newDayIndex: index })
    setShowDateDropdown(false)
    window.location.reload()
  }

  return (
    <div style={{position: "relative", top: 0, left: 0, width: "100%", padding: "42px 4vw", boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <h6 onClick={() => window.location.href = "/"} style={{flexShrink: 0, fontFamily: "DM Sans", fontSize: 24, color: "#2c2c2c"}}>Weather.io</h6>
      <div style={{position: "relative", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "16px", padding: "10px 18px", background: "#ffffff99", border: "1px solid #ffffff", borderRadius: "12px", boxShadow: "0px 12px 24px #00000025"}}>
        <div onClick={() => setShowDateDropdown(true)} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px"}}>
          <Image src={'/icons/clock_repeat.svg'} alt={"clock repeat icon"} width={16} height={16} style={{opacity: 0.75}} />
          <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, color: "#2c2c2c"}}>{headerDate}</p>
        </div>
        <div style={{width: 1, height: 16, background: "#2c2c2c50"}} />
        <div onClick={() => setShowInputDropdown(true)} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "8px"}}>
          <Image src={'/icons/pinmap.svg'} alt={"pin map icon"} width={16} height={16} style={{opacity: 0.75}} />
          <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 14, color: "#2c2c2c"}}>{headerLocation}</p>
        </div>
        <div style={{position: "absolute", top: 50, left: 0, width: 250, flexDirection: "column", alignItems: "center", gap: 12, padding: "12px 24px", background: "#ffffff", border: "1.5px solid white", borderRadius: 10, zIndex: 99, display: showDateDropdown ? "flex" : "none"}}>
          {(function(){
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satruday"].map((day, index) => {
              return (
                <div onClick={() => makeUpdateReq(index)} key={index} style={{minWidth: "66%", padding: "10px 18px", border: "1px solid #2c2c2c80", borderRadius: 8, display: "flex", justifyContent: "center"}}>
                  <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#2c2c2c", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>{day}</label>
                </div>
              )
            })
          })()}
          <div onClick={() => setShowDateDropdown(false)} style={{minWidth: "66%", padding: "10px 18px", background: "#2c2c2c", borderRadius: 8, display: "flex", justifyContent: "center"}}>
            <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#ffffff", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>Close Dropdown</label>
          </div>
        </div>
        <div style={{position: "absolute", top: 50, right: 0, width: 250, flexDirection: "column", alignItems: "center", gap: 12, padding: "12px 24px", background: "#ffffff", border: "1.5px solid white", borderRadius: 10, zIndex: 99, display: showInputDropdown ? "flex" : "none"}}>
          <input placeholder={"Enter A Zipcode"} style={{width: "100%", fontFamily: "DM Sans", fontSize: 12, color: "#2c2c2c", background: "#ffffff"}} />
          <div onClick={() => setShowInputDropdown(false)} style={{minWidth: "66%", padding: "10px 18px", background: "#27ae60", borderRadius: 8, display: "flex", justifyContent: "center"}}>
            <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#ffffff", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>Save Address</label>
          </div>
          <div onClick={() => setShowInputDropdown(false)} style={{minWidth: "66%", padding: "10px 18px", background: "#2c2c2c", borderRadius: 8, display: "flex", justifyContent: "center"}}>
            <label style={{width: "100%", fontFamily: "DM Sans", fontWeight: "500", fontSize: 12, color: "#ffffff", letterSpacing: "1px", textAlign: "center", textTransform: "uppercase"}}>Close Dropdown</label>
          </div>
        </div>
      </div>
      <div style={{flexShrink: 0, display: "flex", flexDirection: "row", justifyContent: "end", alignItems: "center", gap: "12px"}}>
        <div style={{width: 24, height: 24, background: "lavender", borderRadius: 24}} />
        <p style={{fontFamily: "DM Sans", fontWeight: "500", fontSize: 16, color: "#2c2c2c"}}>Amir M.</p>
      </div>
    </div>
  );
}
