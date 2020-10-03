const fs = require('fs');

module.exports = class BookInfo{
    constructor(bookName, authorName, bookDescription){
        this.bookName = "Unknown";
        this.authorName = "Anonymous";
        this.bookDescription = "None";
    }

    submitBook(req){
        if(req.body.bookName != ""){
            this.bookName = req.body.bookName;}
            if(req.body.authorName != ""){
            this.authorName = req.body.authorName;}
            if(req.body.bookDescription != ""){
            this.bookDescription = req.body.bookDescription;}
            
    }
}