import createTable  from "./creatingTable.js";


class Table {
#url
    constructor(url){
        this.#url = url;

        createTable(this.#url)
        
    }   



get url(){
    return this.#url
}

set url(newUrl){
    this.#url = newUrl;
}


}


const movieTable = new Table('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json')
