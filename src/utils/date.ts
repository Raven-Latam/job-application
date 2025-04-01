export default function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
