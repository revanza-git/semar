import dayjs from "dayjs";

// Utility function for date formatting
export const formatDate = (
  dateString: string,
  format: string = "DD/MM/YYYY"
) => {
  return dayjs(dateString).format(format);
};
