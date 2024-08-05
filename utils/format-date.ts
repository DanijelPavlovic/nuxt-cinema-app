export const formatDate = (date: string) => {
  const dayjs = useDayjs();

  return dayjs(date).format("DD/MM/YYYY HH:mm");
};
