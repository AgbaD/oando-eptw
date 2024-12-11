import { useEffect, useState } from "preact/hooks";

function useCountdown(fromDate, fromTime, permitShiftType) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Function to combine date and time into a single Date object
    const combineDateAndTime = (date, time) => {
      const datePart = new Date(date).toISOString().split("T")[0]; // Extract the date part
      const timePart = new Date(time).toISOString().split("T")[1]; // Extract the time part
      return new Date(`${datePart}T${timePart}`); // Combine into a valid ISO string
    };

    // Combine fromDate + fromTime
    const startDateTime = combineDateAndTime(fromDate, fromTime);

    // Calculate the endDateTime based on permitShiftType
    const shiftHours = permitShiftType === "TWELVE_HOUR" ? 12 : 24;
    const endDateTime = new Date(
      startDateTime.getTime() + shiftHours * 60 * 60 * 1000
    );

    // Ensure the startDateTime is valid
    if (isNaN(startDateTime.getTime())) {
      console.error("Invalid fromDate or fromTime provided");
      return;
    }

    // Set an interval to update the countdown every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = endDateTime.getTime() - now.getTime();

      if (timeDifference <= 0) {
        clearInterval(intervalId); // Stop the countdown when time's up
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [fromDate, fromTime, permitShiftType]);

  return timeLeft;
}

// Component to display the countdown
const CountdownTimer = ({ fromDate, fromTime, permitShiftType }) => {
  const { hours, minutes, seconds } = useCountdown(
    fromDate,
    fromTime,
    permitShiftType
  );

  return (
    <div>
      <h4 class="countdown-timer">
        {hours} h : {minutes} m : {seconds} s
      </h4>
    </div>
  );
};

export default CountdownTimer;
