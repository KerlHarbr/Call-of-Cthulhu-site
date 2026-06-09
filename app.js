//импорт модулей
const fs = require("fs");
const express = require("express");

const SQL_am = require("./js/sql");
//определение всякого
const app = express(); //создаём объект с классом экспресс
const time_start = new Date().toLocaleTimeString(); //это время запуска
const port = 3000; //это порт сервера
const urlencodedParser = express.urlencoded({extended: false});//парсер для формы входа
const jsonParser = express.json();//парсер для джисуна
const SQL_servise = SQL_am; //свой модуль

app.use(express.static("styles"));
app.use(express.static("js"));
app.use(express.static("pics"));

//маршрутизация начало
app.get("/", function(request, response){
	response.sendFile(__dirname + "/main.html");
});

app.get("/help", function(request, response){
	response.sendFile(__dirname + "/help.html");
});



app.get("/profile", function(request, response){
	response.sendFile(__dirname + "/profile.html");
});


app.get("/copyright", function(request, response){
	response.sendFile(__dirname + "/copyright.html");
});

app.get("/login", function(request, response) {
	response.sendFile(__dirname + "/login_form.html")
});
//маршрутизация ктулху

app.get("/coc", function(request, response) {
	response.sendFile(__dirname + "/coc_main.html");
});

app.get("/coc/lists", function(request, response){
	response.sendFile(__dirname + "/koc_sheet.html");
});

app.get("/coc/guide", function(request, response) {
	response.sendFile(__dirname + "/koc_materials.html");
});

app.get("/coc/guide/htm_sheet", function(request, response) {
	response.sendFile(__dirname + "/koc_materials_make_a_sheet.html");
});
//маршрутизация конец

//обработчики начало
//обработка входа
app.post("/login", urlencodedParser, function(request, response) {
	if(!request.body) return response.sendStatus(400);
	console.log(request.body.email);
});

//обработка листа
app.post("/coc/lists", jsonParser, function(request, response) {
	const sheet = request.body;
	if(!sheet) return response.status(400);//в sheet прилетает json листка. Как на лонгстори
	const responseText = 'znach ' + sheet.character_name;
	response.send(responseText);
});

//обработка ошибки 404
app.use(function(request, response) {
	var time = new Date().toLocaleTimeString();
	response.status(404);
	response.sendFile(__dirname + "/404.html");
	console.log(time + " | Пользователь получил ошибку 404 пытаясь перейти по: " + "Http://localhost" + request.url);
});
//обработчики конец

app.listen(port, function() {
	console.log(time_start + " | Сервер запущен по адресу Http://localhost:" + port);
});