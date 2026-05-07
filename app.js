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

//вывод логов в консоль
function consoleLog(text, err) {
	if(err == undefined) err = "";
	var time = new Date().toLocaleTimeString();
	console.log(time + " | " + text + " | " + err);
};

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
//переадресация начало
app.get("/register", function(request, response) {
	response.redirect("login");
});
//переадресация конец
//тестовые ссылки начало
app.get("/testConnection", function(request, response) {
	response.send(SQL_servise.checkConnection());
});
//тестовые ссылки конец
//обработчики начало
//обработка входа
app.post("/login", urlencodedParser,async function(request, response) {
	if(!request.body) return response.sendStatus(400);
	var login = request.body.email;
	var password = request.body.password;
	var session_id = await SQL_servise.autentification(login, password);
	consoleLog("session_id "+session_id); // вот это надо вернуть как куки
});

//обработка регистрации
app.post("/register", function(request, response) {
	response.redirect("login");
});

//обработка листа
app.post("/lists", jsonParser, function(request, response) {
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
	console.log("");
	console.log(time_start + " | Сервер запущен по адресу Http://localhost:" + port);
	console.log("");
});