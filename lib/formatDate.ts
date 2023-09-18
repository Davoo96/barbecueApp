export const formatDate = (inputValue: string) => {
  const date = new Date(inputValue);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const formattedDate = `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
};
