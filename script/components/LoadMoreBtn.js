export default class LoadeMoreBtn {
    constructor({ selector, isHidden = false }){
        this.button = this.getButton(selector);
    }

    getButton(selector){
        return document.querySelector(selector);
    }

    disable(){
        this.button.disabled = true;
        this.button.textContent = "Loading...";
    }

    enable(){
        this.button.disabled = false;
        this.button.textContent = "Load More";
    }
}