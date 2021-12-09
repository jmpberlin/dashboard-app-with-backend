export const twitterSearchQuery =
  'https://api.twitter.com/2/tweets/search/recent?query=';

export function formatTime(string) {
  let dateObj = new Date(Date.parse(string));
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  return `${hours}:${minutes} Uhr`;
}

export function mergeUsersIntoPosts(users, posts) {
  let mergedArr = [];
  for (let i = 0; i <= 2; i++) {
    mergedArr.push({});
    mergedArr[i].user = users[i];
    mergedArr[i].post = posts[i];
  }
  return mergedArr;
}

export function processTwitterData(raw) {
  let apiData = raw.data.resFromTwitter;
  let users = apiData.includes.users.splice(0, 3);
  let posts = apiData.data.splice(0, 3);
  let mergedArr = mergeUsersIntoPosts(users, posts);
  return mergedArr;
}
export function processWeatherObj(raw) {
  let copiedArr = [...raw];

  copiedArr.forEach((e) => {
    e.date = new Date(e.dt_txt);
  });
  let processed = [];
  for (let i = 0; i <= 19; i++) {
    processed.push({});
    processed[i].time = copiedArr[i].date.getHours() + ' Uhr';
    processed[
      i
    ].icon = `http://openweathermap.org/img/wn/${copiedArr[i].weather[0].icon}@2x.png`;

    processed[i].description = copiedArr[i].weather[0].description;
    processed[i].temp = copiedArr[i].main.temp + ' ° C';
    processed[i].key = copiedArr[i].dt;
    if (i === 0) {
      processed[i].time = 'jetzt';
    }
  }

  return processed;
}
