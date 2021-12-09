export const twitterSearchQuery =
  'https://api.twitter.com/2/tweets/search/recent?query=';

export function formatTime(string) {
  let dateObj = new Date(Date.parse(string));
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  return `${hours}:${minutes} Uhr`;
}
