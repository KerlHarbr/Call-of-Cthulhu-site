//импорт модулей
const fs = require("fs");
const express = require("express");
//определение всякого
const app = express(); //создаём объект с классом экспресс
const time_start = new Date().toLocaleTimeString(); //это время запуска
const port = 3000; //это порт сервера
const urlencodedParser = express.urlencoded({extended: false});//парсер для форм


app.use(express.static("styles"));
app.use(express.static("js"));
app.use(express.static("pics"));

//маршрутизация начало
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

app.get("/login", function(request, response) {
	response.sendFile(__dirname + "/login_form.html")
});
//маршрутизация конец

//обработка входа
app.post("/login", urlencodedParser, function(request, response) {
	if(!request.body) return response.sendStatus(400);
	console.log(request.body.email);
});

app.use(function(request, response) {
	var time = new Date().toLocaleTimeString();
	response.status(404);
	response.sendFile(__dirname + "/404.html");
	console.log(time + " | Пользователь получил ошибку 404 пытаясь перейти по: " + "Http://localhost" + request.url);
});

app.listen(port, function() {
	console.log(time_start + " | Сервер запущен по адресу Http://localhost:" + port);
});