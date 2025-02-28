import Image from "next/image";

export default function PageBackgroundImage() {
  const imageSrc = 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg';
  return (
    <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
      <Image 
        src={imageSrc}
        alt={"Event background image"}
        fill={true} 
        style={{objectFit: "cover"}}
      />
      <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#ffffff80", backdropFilter: "blur(25px)"}} />
    </div>
  );
}
