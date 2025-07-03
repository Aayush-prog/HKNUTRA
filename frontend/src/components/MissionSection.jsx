import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import * as ReactIcons from "react-icons/fa";
export default function MissionSection() {
  const api = import.meta.env.VITE_URL;
  const [mission, setMission] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const iconMap = {
    ...ReactIcons,
  };
  function IconRenderer({ iconName, color }) {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return <span>Icon not found</span>;
    return (
      <IconComponent
        className={`mb-2 text-support text-4xl inline-block ${color}`}
      />
    );
  }
  const fetchMission = async () => {
    setLoading(true);
    const response = await axios.get(`${api}/mission/`);
    if ((response.status = 200)) {
      setMission(response.data.data);
      setLoading(false);
    } else {
      setError(response.data.message);
      setLoading(false);
    }
  };
  useEffect(fetchMission, []);
  if (loading) return <Loading />;
  return (
    <div>
      <h2 className="text-green-500">Our Mission</h2>
      <p></p>
      {mission.length > 0 &&
        mission.map((item, idx) => (
          <div className="flex ">
            <IconRenderer iconName={item.icon} color={item.color} />
            <div>
              <h3 className={`${color}`}>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
