export const formatDateDay = (date) => {
  if (isNaN(date)) {
    throw "Invalid Date";
  }

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  try {
    // en-CA used for a date as 'yyyy-mm-dd'
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    return formatter.format(date).replace(/\//g, '-');
  } catch (error) {
    throw error;
  }
}

export const formatDate = (date) => {
  if (isNaN(date)) {
    throw "Invalid Date";
  }

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  try {
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    return formatter.format(date)
  } catch (error) {
    throw error;
  }
}

export const generateObjectIdAsUUIDv4 = function () {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  const randomPart = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
  console.log(randomPart)

  return [
    timestamp.padEnd(8, '0'), // Pad timestamp to 8 hex digits
    randomPart.substring(0, 4),
    '4' + randomPart.substring(5, 8), // Ensure version 4
    (Number.parseInt(randomPart[8], 16) & 0x3 | 0x8).toString(16) + randomPart.substring(9, 12), // Ensure variant (RFC4122)
    randomPart.substring(12)
  ].join('-');
};
