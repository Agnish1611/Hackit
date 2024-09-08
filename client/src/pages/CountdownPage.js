import { useState, useEffect } from "react";
import Clock from "../components/home/Clock";

const CountdownPage = () => {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    const startTimer = () => {
      // Get current date and set time to 1 PM IST (IST is UTC +5:30)
      const now = new Date();
      const targetDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        2, // 1 PM in 24-hour format
        0,
        0
      );

      // Convert target date to IST (offset is +5.5 hours)
      const istOffset = 5.5 * 60 * 60 * 1000;
      const countDownDate = targetDate.getTime() - (now.getTimezoneOffset() * 60 * 1000) + istOffset;

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
          clearInterval(interval);
        } else {
          const days = Math.floor(distance / (24 * 60 * 60 * 1000));
          const hours = Math.floor(
            (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (60 * 60 * 1000)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (60 * 1000)) / 1000);

          setTimerDays(days);
          setTimerHours(hours);
          setTimerMinutes(minutes);
          setTimerSeconds(seconds);
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    };

    startTimer();
  }, []);

  return (
    <div>
      <div className="w-[100%] h-[100vh] count fixed bg-cover bg-no-repeat">
        <Clock
          timerDays={timerDays}
          timerHours={timerHours}
          timerMinutes={timerMinutes}
          timerSeconds={timerSeconds}
          countdown
        />
      </div>
    </div>
  );
};

export default CountdownPage;
