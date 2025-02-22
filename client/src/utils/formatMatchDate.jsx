import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { pl } from "date-fns/locale";

export const formatMatchDate = (dateString) => {
  const date = parseISO(dateString);
  const time = format(date, "HH:mm");

  if (isToday(date)) {
    return (
      <>
        <span className="block font-semibold">{time}</span>
      </>
    );
  }

  if (isTomorrow(date)) {
    return (
      <>
        <span className="block font-medium">Tomorrow</span>
        <span className="block font-semibold">{time}</span>
      </>
    );
  }

  return (
    <>
      <span className="block font-medium">{format(date, "dd.MM", { locale: pl })}</span>
      <span className="block font-semibold">{time}</span>
    </>
  );
};
