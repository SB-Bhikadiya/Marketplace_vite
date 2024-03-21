import React, { useEffect, useState } from "react";

const Clock = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const leading0 = (num) => {
    return num < 10 ? "0" + num : num;
  };

  useEffect(() => {
    const getTimeUntil = () => {
      const time = new Date(deadline).getTime() - Date.now();
      if (time < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    getTimeUntil();
    const interval = setInterval(getTimeUntil, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div>
      <div className="Clock-days">{leading0(timeLeft.days)}d</div>
      <div className="Clock-hours">{leading0(timeLeft.hours)}h</div>
      <div className="Clock-minutes">{leading0(timeLeft.minutes)}m</div>
      <div className="Clock-seconds">{leading0(timeLeft.seconds)}s</div>
    </div>
  );
};

export default Clock;
