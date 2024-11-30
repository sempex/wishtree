import { useEffect, useState } from "react";

export default function ChristmasCountdown() {
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0);

  useEffect(() => {
    const calculateDaysUntilChristmas = () => {
      const today = new Date();
      const year = today.getFullYear();
      const christmasDate = new Date(year, 11, 25);

      if (today > christmasDate) {
        christmasDate.setFullYear(year + 1);
      }

      const diffTime = christmasDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilChristmas(diffDays);
    };

    calculateDaysUntilChristmas();
  }, []);

  return (
    <div className="flex flex-col items-center">
        <p className="text-4xl font-extrabold text-gray-800 mb-3">
          Countdown to Christmas
        </p>
      <p className="text-lg text-gray-600">
        {daysUntilChristmas > 0
          ? `${daysUntilChristmas} day${
              daysUntilChristmas > 1 ? "s" : ""
            } until Christmas!`
          : "Merry Christmas!"}
      </p>
    </div>
  );
}
