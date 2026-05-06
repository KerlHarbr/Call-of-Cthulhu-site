//начало подключения модулей и объявления приколов
const mysql = require("mysql2");
// var time = new Date().toLocaleTimeString();
//конец подключения модулей и объявления приколов
//начало создание пдключения
const connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: "cok",
		password: "Boobs123/"
	});
exports.newConnection = connection;
//конец создание пдключения
exports.checkConnection = function(){//проверка подключения
	var time = new Date().toLocaleTimeString();
	connection.connect(function(err) {
		if(err) {
			return console.error(time + " | Ошибка подключения к БД. | " + err.message);
		} else {
			console.log(time + " | Подключение к БД успешно.")
		}
	});
	return connection;
};
exports.killConnection = function(){//отключение
	connection.end(function(err) {
		if(err) {
			return console.error(time + " | Ошибка отключения отк БД. | " + err.message);
		}
		console.log(time + " | Подключение разорвано.");
	});
};
exports.query_log = function(err, results, fields) {//вывод .query в консоль
	var time = new Date().toLocaleTimeString();
	console.log("-----------| Начало вывода "+ time +" | ------------");
	if(err != null) {
		console.log(err);
	};
	console.log(results);
	console.log(fields);

	console.log("-----------| Конец вывода "+ time +" | -------------");
};
//для формы входа начало
exports.autentification = function(login, password) {
	var time = new Date().toLocaleTimeString();
	var login_promise = connection.promise().query("SELECT Login FROM users WHERE Login =?", login, function(err, results, fields) {
		resolve(results);
	});
	//передаём в переменную пасс результат работы говна снизу.
	var password_promise = connection.promise().query("SELECT Passwod FROM users WHERE Passwod =?", password, async function(err, results, fields) {
		if(err != null) {
			console.log(err);
		};
		resolve(results);
	});
	Promise.all([login_promise, password_promise]).then(function(values) {
		var [data1, data2] = values;
		var login_inner;
		var password_inner;

		if(data1[0][0] == undefined) {
			login_inner = null;
		} else {
			login_inner = data1[0][0].Login;
		};
		if(data2[0][0] == undefined) {
			password_inner = null;
		} else {
			password_inner = data2[0][0].Passwod;
		};
		console.log(data1, data2);
		if(login_inner == login) {
			console.log("Логин совпал");
			if (password_inner == password) {
				console.log("Авторизация разрешена");
			} else {
				console.log("Не верный пароль");
			};
		} else {
			console.log("Не верный логин или пароль");
		};
	});

};
exports.auterisation = function() {

};

exports.registration = function() {

};
//для формы входа конец
