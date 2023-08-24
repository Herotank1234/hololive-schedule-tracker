import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";
import moment from "moment-timezone";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function App() {
  const [liveData, setLiveData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
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
        return resp.data;
      });

    let strippedLiveData = [];
    let strippedUpcomingData = [];

    respData.forEach(function(data) {
      if(data.status === "live") {
        strippedLiveData.push(
          {
            yt_video_key: data.id,
            title: data.title,
            thumbnail: `http://img.youtube.com/vi/${data.id}/0.jpg`,
            live_schedule: moment(data.start_scheduled),
            channel_name: data.channel.name
          }
        );
      } else {
        strippedUpcomingData.push(
          {
            yt_video_key: data.id,
            title: data.title,
            thumbnail: `http://img.youtube.com/vi/${data.id}/0.jpg`,
            live_schedule: moment(data.start_scheduled),
            channel_name: data.channel.name
          }
        )
      }
    });

    const strippedData = {
      live: strippedLiveData,
      upcoming: strippedUpcomingData
    };

    return strippedData;
  }
  
  useEffect(() => {
    setLoading(true);
    getScheduleData()
    .then((data) => {
      setLiveData(data.live);
      setUpcomingData(data.upcoming);
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
          liveData.map((data, i) => (
            <Card data={data} utcOffset={utcOffset} live={true} key={i}/>
          ))
        }
        {!loading && 
          upcomingData.map((data, i) => (
            <Card data={data} utcOffset={utcOffset} live={false} key={i}/>
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
