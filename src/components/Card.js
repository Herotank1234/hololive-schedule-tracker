import "./Card.css"
import Tooltip from "@mui/material/Tooltip"
import Zoom from '@mui/material/Zoom';

const handleClick = (key) => {
  window.open(`https://www.youtube.com/watch?v=${key}`, 
    "_blank", "noopener,noreferrer")
}

function Card({ data, utcOffset, live }) {
  return (
    <Tooltip
      placement="top-end"
      TransitionComponent={Zoom} 
      title={data.title} 
      arrow>
      <div 
        className={live ? "LiveCardContainer" : "UpcomingCardContainer"} 
        onClick={() => handleClick(data.yt_video_key)}> 
        <div className="Thumbnail">
          <img src={data.thumbnail} alt="" height="100%"/>
        </div>
        <div className="DetailContainer">
          <div className="InformationContainer">
            <p className="Information">{data.title}</p>
          </div>
          <div className="InformationContainer">
            <p className="Information">{data.channel_name}</p>
          </div>
          <div className="InformationContainer">
            <p className="Information">{data.live_schedule.utcOffset(utcOffset).format("DD-MM-YYYY HH:mm")}</p>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}

export default Card;