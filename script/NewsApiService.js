
// const ENDPOINTS = "https://newsapi.org/v2/everything";
// const API_KEY = "8ece45ab03a7434e9e4dffc54874f777";

// function getNews(query){
//     return fetch(`${ENDPOINTS}?apiKey=${API_KEY}&q=${query}&pageSize=5`)
//     .then((data) => data.json())
// } 

// export { getNews };

export default class NewsApiService {
    static ENDPOINTS =
     "https://newsapi.org/v2/everything/";
    static API_KEY =
     "8ece45ab03a7434e9e4dffc54874f777";

     // конструктор в якому зберігається запит, і зберігаєьбся сторінка
    constructor(){
        this.query = ""; // запит користувача
        this.page = 1; //сторінка на котрій користувач знаходиться
    } 

    //метод щоб робити запит
    getNews(){
        const url = `${NewsApiService.ENDPOINTS}?apiKey=${NewsApiService.API_KEY}&q=${this.query}&pageSize=5&page=${this.page}`;
        
        return fetch(url).then((data) => {
            this.incrementPage();
            return data.json();
        });
    } 

    incrementPage(){
        this.page +=1;
    } //оновлює сторінку, додає одиницю

    resetPage(){
        this.page = 1;
    } // скидує сторінку на першу
}