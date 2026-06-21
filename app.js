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

app.post("/profile", jsonParser,async function(request, response) {
	const cookie_session_id = await request.body;
	if(!cookie_session_id) return response.status(400);
	try{
		// consoleLog('cookie_session_id.session_id == ' + cookie_session_id.session_id);
	} catch {
		// consoleLog('cookie_session_id.session_id == "none"');
	};
	if (cookie_session_id.session_id == undefined) {
		cookie_sid_flag = 0;
	} else {
		cookie_sid_flag = 1;
	};
	// consoleLog('cookie_session_id_flag post ' + cookie_sid_flag);
	if (cookie_sid_flag == 1) {
		var user_id = await SQL_servise.session_id_comp(cookie_session_id.session_id);
		trans_func_data = await SQL_servise.return_user_data(user_id);
		// consoleLog('cookie_session_id.session_id == ' + cookie_session_id.session_id);
	} else {
		trans_func_data = await 0;
		// consoleLog('cookie_session_id.session_id == "none"');
		response.status(401);//Разбберись с переадресацией на страницу входа
	};

	consoleLog("trans_func_data" + trans_func_data);
	response.send(trans_func_data);
});

app.use(async function(request, response, next){
	var profileHeader = "";
	var profileContent = "";
	var replace_data;
	fs.readFile("koc_profile.html",function(error, data) {
		if (error) {
			response.status(500);
			consoleLog("Ошибка 500 при прогрузке файла", error);
			logToFile("Ошибка 500 при прогрузке файла", error);
		};
	});
	setTimeout(function() {
		next();
	},5);
});


app.use("/profile",async function(request, response){
	// var test;
	// try {
	// 	test = await fetch(__dirname + "/profile");
	// 	consoleLog(test.json());
	// } catch(error) {
	// 	consoleLog("ну не получилось", error);
	// };
	// consoleLog("test " + test);
	// response.send("Проверка");
	var profileHeader = "";
	var profileContent = "";
	var replace_data;
	fs.readFile("koc_profile.html",async function(error, data) {
		if (error) {
			response.status(500);
			consoleLog("Ошибка 500 при прогрузке файла", error);
			logToFile("Ошибка 500 при прогрузке файла", error);
		} else {
			// setTimeout(async function() {
				var local_trans_func_data = await trans_func_data;
				var local_cookie_sid_flag = await cookie_sid_flag;
				consoleLog("trans_func_data get " + local_trans_func_data);
				consoleLog("cookie_session_id_flag get " + local_cookie_sid_flag);
				// if (cookie_sid_flag == 1) {
					profileHeader = "Данные пользователя";
					try {
						profileContent = trans_func_data.user_login + "   " + trans_func_data.reg_date;
					} catch(err) {
						consoleLog("error'", err);
					};
				// } else {
				// 	profileHeader = "Вы не зарегестрированы";
				// 	profileContent = "flag = 0";
				// };
				replace_data = data.toString()
					.replace(/{profileHeader}/g, profileHeader)
					.replace(/{profileContent}/g, profileContent);
				response.send(replace_data);
			// },1000);
		};
	});
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
