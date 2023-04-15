
// Кнопка при натисканні на яку 
// повинно завантажуватися нова інформація
export default class LoadeMoreBtn {
    constructor({ selector, isHidden = false }){
        this.button = this.getButton(selector); // посилання на кнопку в DOMі
        isHidden && this.hide();
    }

    getButton(selector){
        return document.querySelector(selector);
    }// метод який отримує посилання на елемент кнопки по селектору

    disable(){
        this.button.disabled = true;
        this.button.textContent = "Loading...";
    }// переводить в неактивний стан

    enable(){
        this.button.disabled = false;
        this.button.textContent = "Load More";
    }// звичайний активний стан
    
    hide(){
        this.button.classList.add("hidden");
    }// показує кнопку

    show(){
        this.button.classList.remove("hidden");
    }// показуєзховати кнопку
}