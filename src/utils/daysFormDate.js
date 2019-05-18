const daysFormDate = date => Math.ceil((Date.now() - new Date(date)) / 86400000);

export default daysFormDate;
