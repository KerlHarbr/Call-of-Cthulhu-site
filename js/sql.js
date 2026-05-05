//начало подключения модулей и объявления приколов
const mysql = require("mysql2");
time = new Date().toLocaleTimeString();
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
	console.log("-----------| Начало вывода "+ time +" | ------------");
	if(err != null) {
		console.log(err);
	};
	console.log(results);
	console.log(fields);

	console.log("-----------| Конец вывода "+ time +" | -------------");
};
//для формы входа начало
exports.autentification = function() {

};

exports.auterisation = function() {
	
};

exports.registration = function() {

};
//для формы входа конец
