
import NewsApiService from "./NewsApiService.js";
import LoadeMoreBtn from "./components/LoadMoreBtn.js";

const refs = {
    form: document.getElementById('form'),
    newsWrapper: document.getElementById('newsWrapper'),
}; //знаходимо елементи розмітки

const newsApiService = new NewsApiService(); //обєкт за допомогою якого ми керуємо запитами

const loadeMoreBtn = new 
LoadeMoreBtn({
    selector:"#loadMore",
    isHidden: true,
}); // поточна кнопка з методами для керування станами кнопки


refs.form.addEventListener('submit', onSubmit); //вішаєм подію сабміту
loadeMoreBtn.button.addEventListener('click', fetchArticles); //виклик функції фетчАртікалі по кліку

function onSubmit(e) {
    e.preventDefault();
    loadeMoreBtn.show();
    const form = e.currentTarget;
    newsApiService.query = form.elements.news.value; 

    newsApiService.resetPage();
    clearNewsList();
    fetchArticles().finally(() => form.reset());
}


function fetchArticles(){
    loadeMoreBtn.disable();
    return getArticlesMarkup().then((markup) => {
        updateNewsList(markup);
        loadeMoreBtn.enable();
    })
    .catch(onError);    
}

function getArticlesMarkup(){
    return newsApiService.getNews().then(({ articles }) => { 
    if(articles.length === 0) throw new Error('No data!');

    return articles.reduce(
        (markup, articles) => markup + createMarkup(articles),
         ""
         );
    });
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
    refs.newsWrapper.insertAdjacentHTML("beforeend", markup);
}

function clearNewsList() {
    refs.newsWrapper.innerHTML = "";
}

function onError (err) {
    console.error(err);
    loadeMoreBtn.hide();
    clearNewsList();
    updateNewsList("<p class='not-found'>NOT FOUND!</p>");
}