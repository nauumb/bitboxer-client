export const currentDateToISO8601 = () => {
  return new Date().toISOString().split(".")[0];
};

export const formatDateFromISO8601 = (date) => {
  return date.replace("T", " ");
};
