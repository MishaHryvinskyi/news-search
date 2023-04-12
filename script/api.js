const ENDPOINTS = "https://newsapi.org/v2/everything";
const API_KEY = "8ece45ab03a7434e9e4dffc54874f777";

function getNews(query){
    return fetch(`${ENDPOINTS}?apiKey=${API_KEY}&q=${query}&pageSize=4`)
    .then((data) => data.json())
}

export { getNews };