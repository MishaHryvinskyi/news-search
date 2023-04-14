import { getNews } from "./api.js";
import LoadeMoreBtn from "./components/LoadMoreBtn.js";
const refs = {
    form: document.getElementById('form'),
    newsWrapper: document.getElementById('newsWrapper'),
};

const loadeMoreBtn = new LoadeMoreBtn({
    selector:"#loadMore",
    isHidden: true,
});
console.log(loadeMoreBtn);
loadeMoreBtn.disable();

setInterval(() => loadeMoreBtn.enable(), 3000);

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.news.value;
    getNews(inputValue)
    .then(({ articles }) => { 
        console.log(articles);
    if(articles.length === 0) throw new Error('No data!');

    const markup = articles.reduce(
        (markup, articles) => markup + createMarkup(articles),
         ""
         );
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