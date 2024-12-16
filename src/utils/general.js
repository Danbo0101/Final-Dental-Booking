const formatCurrencyVND = (price) => {
  return price.toLocaleString("vi-VN") + " VNĐ";
};

const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(':');

  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minutes} ${period}`;
}

const sortByStep = (data) => {
  return data.sort((a, b) => {
    const stepA = parseInt(a.step.split(" ")[1], 10);
    const stepB = parseInt(b.step.split(" ")[1], 10);
    return stepA - stepB;
  });
}

export { formatCurrencyVND, convertTo12HourFormat, sortByStep };
