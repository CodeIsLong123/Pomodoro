import { useEffect, useState } from "react";


/*
Das hier soll später die Pomodoro Fuktion werden, aber erstmal folgen wir dem Guide
Im Fall des Pomodoro Timers, müssen wir den Prop ändern zu Targetdate sodass, der user vielleicht selber verschiedene 
Zeiten einstellen kann


Ausserdem, das hier wird ein Custom Hook -> nochmal ganz untersuchen was ein Custom und ein nicht Custom hook sind
*/ 
const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();
  
    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, [countDownDate]);
  
    return getReturnValues(countDown);
  };

  const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  
    return [ hours, minutes, seconds];
  };
  
  export { useCountdown };