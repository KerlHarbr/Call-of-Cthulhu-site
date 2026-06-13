const fs = require("fs");
const express = require("express");
//вывод логов в консоль
exports.consoleLog = function(text, err) {
	if(err == undefined) err = "";
	var time = new Date().toLocaleTimeString();
	console.log(time + " | " + text + " | " + err);
};

//запись логов в файл
exports.logToFile = function(text, err) {
	if(err == undefined) err = "no err";
	var time = new Date().toLocaleTimeString();
	var date = new Date().toLocaleDateString();
	var log_path = "C:/CoC-data/logs/"+date+".txt";
	text_inner = time + " | " + text;
	fs.writeFile(log_path, '\n'+text_inner, { flag: 'a+' }, function(error) {
		if(error){
			consoleLog("Ошибка записи лога", error);
		};
	});
}