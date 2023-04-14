// Your API key is: 8ece45ab03a7434e9e4dffc54874f777

import { getNews } from "./api.js";

const result = getNews("cat");
console.log(result);

const refs = {
    form: document.getElementById('form'),
    newsWrapper: document.getElementById('newsWrapper'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit (evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const inputValue = (form.elements.news.value);
    getNews(inputValue).then(({ articles }) => { 
        console.log(articles);
    
    if(articles.length === 0) throw new Error('No data!');

    const markup = articles.reduce(
        (markup, articles) => markup + createMarkup(articles),
         ""
         );
         console.log(markup);
         updateNewsList(markup);
})
    .catch(onError)
    .finally(() => form.reset())
}


function createMarkup({ title, author, url, urlToImage, description }) {
    return `<div class="card">
        <h2 class="article-title">${title}</h2>
        <h3 class="article-author">${author || "Unknows"}</h3>
        <img src="${urlToImage || "https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985001.jpg&fm=jpg"}  height="420" class="article-img">
        <p class="article-description">${description}</p>
        <a href="${url}" target="_blank" class="article-link">Read more</a>
    </div>
    `;
}

function updateNewsList(markup) {
    refs.newsWrapper.innerHTML = markup;
}

function onError (err) {
    console.error(err);
    updateNewsList("<p class='not-found'>NOT FOUND!</p>");
}