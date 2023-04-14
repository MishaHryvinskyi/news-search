export default class LoadeMoreBtn {
    constructor({ selector, isHidden = false }){
        this.button = this.getButton(selector);
    }

    getButton(selector){
        return document.querySelector(selector);
    }

    disable(){
        
    }
}