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
var cookie_sid_flag;
var trans_func_data;

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

app.post("/profile", jsonParser,async function(request, response) {
	const cookie_session_id = await request.body;
	if(!cookie_session_id) return response.status(400);
	try{
		consoleLog('cookie_session_id.session_id == ' + cookie_session_id.session_id);
	} catch {
		consoleLog('cookie_session_id.session_id == "none"');
	};
	if (cookie_session_id.session_id == undefined) {
		cookie_sid_flag = 0;
	} else {
		cookie_sid_flag = 1;
	};
	consoleLog('cookie_session_id_flag == ' + cookie_sid_flag);
	if (cookie_sid_flag == 1) {
		var user_id = await SQL_servise.session_id_comp(cookie_session_id.session_id);
		trans_func_data = SQL_servise.return_user_data(user_id);
		consoleLog(trans_func_data);
		// consoleLog('cookie_session_id.session_id == ' + cookie_session_id.session_id);
	} else {
		trans_func_data = await 0;
		// consoleLog('cookie_session_id.session_id == "none"');
		response.status(401);//Разбберись с переадресацией на страницу входа
	};
	
});

app.use("/profile", function(request, response, next) {
	setTimeout(function() {
		next()
	},1000);
});

app.get("/profile",function(request, response){
	setTimeout(function() {
		var profileHeader = "";
		var profileContent = "";
		var replace_data
		fs.readFile("koc_profile.html",async function(error, data) {
			if (error) {
				response.status(500);
				consoleLog("Ошибка 500 при прогрузке файла", error);
			} else {
				var local_trans_func_data = await trans_func_data;
				var local_cookie_sid_flag = await cookie_sid_flag;
				consoleLog("trans_func_data " + local_trans_func_data);
				consoleLog("cookie_session_id_flag " + local_cookie_sid_flag);
				if (cookie_sid_flag == 1) {
					profileHeader = "Данные пользователя";
					profileContent = "flag = 1";
				} else {
					profileHeader = "Вы не зарегестрированы";
					profileContent = "flag = 0";
				};
				replace_data = data.toString()
					.replace(/{profileHeader}/g, profileHeader)
					.replace(/{profileContent}/g, profileContent);
				response.end(replace_data);
			};
		});
	},1000);
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

app.get("/login_get",function(request, response) {
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
	var session_id;
	SQL_servise.autentification(login, password)
		.then(function(value) {
			session_id =  value;// вот это надо вернуть как куки
			consoleLog("session_id "+session_id);
			response.cookie('session_id', session_id, {maxAge: 43200000});
			response.redirect("/");
	})
		.catch(function(error) {
			consoleLog("Ошибка входа", error);
			// response.send('<script>alert("Ошибка входа")</script>');
			response.redirect("/login");
		});

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
	consoleLog("Пользователь получил ошибку 404 пытаясь перейти по: " + "Http://localhost" + request.url);
});
//обработчики конец

app.listen(port, function() {
	console.log("");
	console.log(time_start + " | Сервер запущен по адресу Http://localhost:" + port);
	console.log("");
});