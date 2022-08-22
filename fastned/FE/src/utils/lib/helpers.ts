function timeDifference(current: number, previous: number) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
}

function relativeDays(timestamp: number) {
  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / oneDayInMs,
  );

  return rtf.format(daysDifference, 'day');
}

export {
  timeDifference,
  relativeDays,
};
