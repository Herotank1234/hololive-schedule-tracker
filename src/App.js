import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";
import moment from "moment-timezone";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function App() {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [utcOffset, setUtcOffset] = useState("1");

  const getScheduleData = async () => {
    const respData = await axios.get(process.env.REACT_APP_API_URL,
      {
        params: {
          "org": "Hololive",
          "sort": "start_scheduled"
        },
        headers: {
          "X-APIKEY": process.env.REACT_APP_API_KEY
        }
      })
      .then((resp) => {
        console.log(resp.data);
        return resp.data;
      });

    const strippedData = respData.map((data) => {
      return {
        yt_video_key: data.id,
        title: data.title,
        thumbnail: `http://img.youtube.com/vi/${data.id}/0.jpg`,
        live_schedule: moment(data.start_scheduled),
        channel_name: data.channel.name,
      }
    });

    return strippedData;
  }
  
  useEffect(() => {
    setLoading(true)
    getScheduleData()
    .then((data) => {
      setScheduleData(data)
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="ScheduleData">
        {loading &&
          <div className="Spinner">
              <ClipLoader/>
          </div>
        } 
        {!loading && 
          scheduleData.map((data, i) =>  (
            <Card data={data} utcOffset={utcOffset} live={true} key={i}/>
          ))
        }
      </div>
      <div>
        <Footer utcOffset={utcOffset} setUtcOffset={setUtcOffset}/>
      </div>
    </div>
  );
}

export default App;
