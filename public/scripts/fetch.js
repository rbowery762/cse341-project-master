//const { Socket } = require("socket.io");
//import openSocket from 'socket.io-client';


const socket = io();
const _csrf = document
    .querySelector('meta[name="_csrf"]') 
    .getAttribute('content');



    
function display(json){
    let list = "";
    for(i = 0; i < json.length; i++){
        list += "<li>" + json[i].name + "</li>";
    }
    document.getElementById("json").innerHTML = list;
} 

window.addEventListener("load", () => {  

    fetch('/pr10/fetch')
    .then(res => res.json())
    .then(data => {
        let displaySet = data;
        socket.on('broadcast', function(recievedData){
            console.log("Hi");
            console.log(broadcastData);
            // if(recievedData){
             displaySet = recievedData.avengers;
        //}
        })
        display(displaySet);
    })
    .catch(console.error);
}) 

function submission(){
fetch('/pr10/insert', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({_csrf, name: document.getElementById("name").value}) 
})
    .then(res => res.json())
    .then(data => {
        socket.emit("broadcast", data);
        display(data.avengers);
    })
    .catch(console.error);
}