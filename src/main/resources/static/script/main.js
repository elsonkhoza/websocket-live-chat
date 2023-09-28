"use strict"
var joinArea = document.querySelector("#join");
var usernameInput = document.querySelector("#username-input");
var joinBtn = document.querySelector("#join-btn");
var spinner = document.querySelector("#join-sp");

var chatArea = document.querySelector("#chat");
var chats= document.querySelector("#chats");
var msgInput = document.querySelector("#msginput");
var disconnectBtn = document.querySelector("#disbtn");
var sendBtn = document.querySelector("#sendbtn");



var username=null;
var stompClient=null;

joinBtn.addEventListener("click", (event) => {

  username=usernameInput.value.trim();
  if(username){
    spinner.classList.remove("hide");
    setTimeout(() => {
      joinArea.classList.add("hide");
      chatArea.classList.remove("hide");
  
        var socket=new SockJS('/ws');
        stompClient=Stomp.over(socket);
        stompClient.connect({},onConnected,onError); 
  
    }, 1000);
  } else {

    alert("Enter username to start");
  }
  event.preventDefault()

});



function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.add",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
    console.log("error");
}

sendBtn.addEventListener("click",(event)=>{
  var message=msgInput.value;
    
  if(message && stompClient) {

    console.log(message);
      var chatMessage = {
          sender: username,
          message: message,
          type: 'CHAT'
      };
      stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
  }
  event.preventDefault();

})


function onMessageReceived(payload) {
    var chatMessage = JSON.parse(payload.body);

    console.log(message);

    var message=null;

    var messageElement = document.createElement('div');

    if(chatMessage.type === 'JOIN') {
        messageElement.classList.add('notify');
        message = chatMessage.sender + ' joined chat';

    } else if (chatMessage.type === 'DISCONNECT') {
        messageElement.classList.add('notify');
        message = chatMessage.sender + ' left chat';
    } else {
        messageElement.classList.add('chat-receive');
        message = chatMessage.sender +": "+ chatMessage.message;
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message);
    textElement.appendChild(messageText);
    messageElement.appendChild(textElement);

    chats.appendChild(messageElement);
    chats.scrollTop=chats.scrollHeight;
}


