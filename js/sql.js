//вывод логов в консоль
function consoleLog(text, err) {
	if(err == undefined) err = "";
	var time = new Date().toLocaleTimeString();
	console.log(time + " | " + text + " | " + err);
};
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
	var info_text = "";
	connection.connect(function(err) {
		if(err) {
			info_text = "Ошибка подключения к БД.";
			consoleLog(info_text, err.message);
		} else {
			info_text = "Подключение к БД успешно.";
			consoleLog(info_text);
		}
	});
	return info_text;
};
exports.killConnection = function(){//отключение
	connection.end(function(err) {
		if(err) {
			consoleLog("Ошибка отключения от БД.", err.message);
		} else {
			consoleLog("Подключение разорвано.");
		};
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
	return new Promise(function(resolve_end, reject_end) {
		consoleLog('Попытка входа в учётную запись{ login : "'+login+'", password : "'+password+'" }');
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
			return new Promise(async function(resolve) {
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
				if(login_inner == login) {
					if (password_inner == password) {
						consoleLog('Авторизация разрешена');
						var cookie_return = auterisation_inner(login_inner, password_inner);
						// consoleLog("cookie_return " + cookie_return);
						resolve_end(cookie_return);
					} else {
						reject_end("Не верный пароль");
					};
				} else {
					reject_end("Не верный логин или пароль");
				};
			});
		});
	});

};
auterisation_inner = async function(login) {
	var user_obj;
	var session_obj;
	var session_id;
	user_obj = await connection.promise().query("SELECT * FROM users WHERE Login=?", login, function(err, results, fields) {
		resolve(results);
	});
	session_obj = await connection.promise().query("SELECT * FROM  sessions WHERE SUserKey=?", user_obj[0][0].UsersKey, function(err, results, fields) {
		resolve(results);
	});
	consoleLog(user_obj);
	const max=9999999999999999;
	const min=1000000000000000;
	session_id = Math.floor(Math.random() * (max - min + 1) + min);
	var array = [];
	// var cookie_data = new Promise(function() {});
	if(session_obj[0][0] == undefined) {//если сессии нет, то её надо создать
		//передаём в базу
		array = [user_obj[0][0].UsersKey, session_id];
		connection.query("INSERT INTO sessions(SUserKey, SessionId) values(?, ?)", array, function(err, results) {
			if(err) consoleLog("Ошибка добавления ключа сессии в БД", err);
		});
		//а тут передать это пользователю
		consoleLog("session_id.sql.js " + session_id);
		return(session_id);
	} else {//если сессия есть, то удалить и создать заново
		//передаём в базу
		array = [session_id, user_obj[0][0].UsersKey];
		// consoleLog(array);
		connection.query("UPDATE sessions SET SessionId=? WHERE SUserKey=?", array, function(err, results) {
			if(err) consoleLog("Ошибка обновления ключа сессии в БД", err);
		});
		//а тут передать это пользователю
		consoleLog("session_id.sql.js " + session_id);
		return(session_id);
	};
};
exports.auterisation = auterisation_inner;

registration_inner = function() {

};
exports.registration = registration_inner;
//для формы входа конец

//сверка айди сессии
exports.session_id_comp =async function(session_id) {
	var session_id_inner = session_id;
	consoleLog("session_id_inner == " + session_id_inner);

	var session_id_obj = await connection.promise().query("SELECT * FROM Sessions WHERE SessionId=?", session_id_inner, function(err, results, fields) {
		resolve(results);
	});
	return(session_id_obj[0][0].SUserKey);
};
//вернуть данные пользователя для страницы профиля
exports.return_user_data = async function(user_id) {
	var user_data_obj = await connection.promise().query("SELECT * FROM Users WHERE UsersKey=?", user_id, function(err, results, fields) {
		resolve(results);
	});
	// consoleLog(user_data_obj[0][0].Login);
	// consoleLog(user_data_obj[0][0].RegDate);
	var return_obj = {
		user_login: user_data_obj[0][0].Login,
		reg_date: user_data_obj[0][0].RegDate
	};
	consoleLog("return_obj " + return_obj);
	consoleLog("return_obj[0] " + return_obj.user_login);
	
	return(return_obj);
};
//вернуть данные по листам для страницы листов
exports.return_player_lists_list = async function(user_id) {};
//вернуть данные по конкретному листу
exports.return_player_list = async function(user_id, list_id) {};