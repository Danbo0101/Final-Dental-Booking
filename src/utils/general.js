const formatCurrencyVND = (price) => {
  return price.toLocaleString("vi-VN") + " VNĐ";
};

const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(':');

  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';

  // Convert 24-hour to 12-hour format
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12; // Midnight case
  }

  return `${hour}:${minutes} ${period}`;
}

export { formatCurrencyVND, convertTo12HourFormat };
