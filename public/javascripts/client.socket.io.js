//Function to get the time stamp to show it on the client side
function getCurrentTime(){
var currentdate = new Date($.now()); 
var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + "  "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        +currentdate.getSeconds()+ ":"
        + currentdate.getMilliseconds();
return datetime;
}

//create a websocket connection with localhost
var server_name = "http://localhost:3000/";
//Connect to the server
var socket = io.connect(server_name);

//On receiving server-pong laber from the server invole the handler
socket.on("server-pong", function(data) {
	//Add the message to client log area
	$("#clientPingPongMessage").prepend("<h6>" + getCurrentTime() +  " Pong Received from Sever." +"</h6>")
	console.log("Client: Received server message: "+data.text);
});

//This method gets involked when the send ping button is clicked from the pagae
$( "#sendPing" ).click(function() {
	//Add the message to client log area
	$("#clientPingPongMessage").prepend("<h6>" + getCurrentTime() +  " Ping sent to the sever." +"</h6><hr/>")
  	//emit the ping from the client to the sever on click of the button
  	socket.emit("client-ping",  {text: "ping"});
});
//Gets invoked on receiving the ping from the server usign web socekt
socket.on("server-ping", function(data) {
	//Add the message to sever log area
	$("#serverPingPongMessage").prepend("<h6>" + getCurrentTime() +  " Ping Received from Sever." +"</h6><hr/>")
	//send the pong from the server
	socket.emit("client-pong",  {text: "pong"});
	//Add the message to sever log area
	$("#serverPingPongMessage").prepend("<h6>" + getCurrentTime() +  " Pong sent to the sever." +"</h6>")
});

