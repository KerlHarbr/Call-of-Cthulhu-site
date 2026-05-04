//импорт модулей
const fs = require("fs");
const express = require("express");
//определение всякого
const app = express(); //создаём объект с классом экспресс
const time_start = new Date().toLocaleTimeString(); //это время запуска
const port = 3000; //это порт сервера



app.use(express.static("styles"));
app.use(express.static("js"));
app.use(express.static("pics"));

app.get("/", function(request, response){
	response.sendFile(__dirname + "/koc_main.html");
});

app.get("/help", function(request, response){
	response.sendFile(__dirname + "/koc_help.html");
});

app.get("/profile", function(request, response){
	response.sendFile(__dirname + "/koc_profile.html");
});

app.get("/lists", function(request, response){
	response.sendFile(__dirname + "/koc_sheet.html");
});

app.get("/copyright", function(request, response){
	response.sendFile(__dirname + "/koc_copyright.html");
});

app.listen(port, function() {
	console.log(time_start + " | Сервер запущен по адресу Http://localhost:" + port);
});