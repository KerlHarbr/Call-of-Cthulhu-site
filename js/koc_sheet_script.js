function get_value(id){
	/возвращает значение переменной по айди/
	return document.getElementById(id).value;
}
function set_value(id, value){
	/передаёт необходимое значение в переменную по айди/
	document.getElementById(id).setAttribute('value', value);
}
function set_text_by_id(id, text) {
	document.getElementById(id).textContent = text;
}
function get_text_by_id(id){
	return document.getElementById(id).textContent;
}


function skill_count(full_skill_id, half_skill_id, fifth_skill_id) {
	set_value(half_skill_id, Math.floor(get_value(full_skill_id) / 2));
	set_value(fifth_skill_id, Math.floor(get_value(full_skill_id) / 5));
}
function speed_count(str_id, dex_id, bod_id, age_id, speed_id) {
	var str = Number(get_value(str_id));
	var dex = Number(get_value(dex_id));
	var bod = Number(get_value(bod_id));
	var age = Number(get_value(age_id));
	var result = 0;
	switch(age){

		case 40:
		case 41:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 48:
		case 49:
			result -= 1;
			break;

		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 58:
		case 59:
			result -= 2;
			break;

		case 60:
		case 61:
		case 62:
		case 63:
		case 64:
		case 65:
		case 66:
		case 67:
		case 68:
		case 69:
			result -= 3;
			break;

		case 70:
		case 71:
		case 72:
		case 73:
		case 74:
		case 75:
		case 76:
		case 77:
		case 78:
		case 79:
			result -= 4;
			break;

		case 80:
		case 81:
		case 82:
		case 83:
		case 84:
		case 85:
		case 86:
		case 87:
		case 88:
		case 89:
			result -= 5;
			break;

		default:
			break;
	}

	if (dex < bod && str < bod) {
        result += 7;
    } else if (dex > bod && str > bod) {
        result += 9;
    } else {
        result += 8;
    }

    set_value(speed_id, result);
}
function health_count(bod_id, endu_id, max_health_id) {
	var bod = Number(get_value(bod_id));
	var endu = Number(get_value(endu_id));
	set_value(max_health_id, Math.floor((bod+endu)/10));
}
function max_sanity(max_sanity_id, forbiden_id) {
	set_value(max_sanity_id, (99 - Number(get_value(forbiden_id))));
}
function btd_komp_count(str_id, bod_id, btd_id, komp_id) {
	var summ = Number(get_value(str_id)) + Number(get_value(bod_id));
	if (summ > 1 && summ < 65) {
        set_text_by_id(btd_id, "-2");
		set_text_by_id(komp_id, "-2");
    } else if (summ > 64 && summ < 85) {
        set_text_by_id(btd_id, "-1");
		set_text_by_id(komp_id, "-1");
    } else if (summ > 84 && summ < 125) {
        set_text_by_id(btd_id, "0");
		set_text_by_id(komp_id, "0");
    } else if (summ > 124 && summ < 165) {
        set_text_by_id(btd_id, "+1d4");
		set_text_by_id(komp_id, "1");
    } else if (summ > 164 && summ < 205) {
        set_text_by_id(btd_id, "+1d6");
		set_text_by_id(komp_id, "2");
    } else if (summ > 204 && summ < 285) {
        set_text_by_id(btd_id, "+2d6");
		set_text_by_id(komp_id, "3");
    } else if (summ > 284 && summ < 365) {
        set_text_by_id(btd_id, "+3d6");
		set_text_by_id(komp_id, "4");
    } else if (summ > 364 && summ < 445) {
        set_text_by_id(btd_id, "+4d6");
		set_text_by_id(komp_id, "5");
    } else if (summ > 444 && summ < 525) {
        set_text_by_id(btd_id, "+5d6");
		set_text_by_id(komp_id, "6");
    } else {
        set_text_by_id(btd_id, "+6d6");
		set_text_by_id(komp_id, "7");
    } 
}
function make_sheet() {//собирает листок
	var form = document.getElementById("player_sheet");
	var form_length = form.length;

	var output_names = [];
	var output = [];

	for (var i = 0; i < form_length - 1; i++) { //- 1 потому, что у кнопки отправки тоже часть формы
		output_names[i] = form[i+1].id;
		output[i] = form[i+1].value; //+ 1 потому, что у кнопки отправки тоже часть формы
	}
	
	var list_bildup = {};
	for (var i = 0; i < form_length - 1; i++) {
		list_bildup[output_names[i]] = output[i];
	}
	return list_bildup;
}
//отправка листа на сервер
async function send_sheet() {
	var body_bildup = make_sheet();

	var response = await fetch("/lists", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body_bildup)
	});
	const responseText = await response.text(); 
	console.log(responseText);

}
