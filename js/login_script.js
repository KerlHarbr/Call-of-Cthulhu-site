function reg_form_show() {//переход к регистрации
	document.getElementById("entery_title").className = "form_title no_display";
	document.getElementById('reg_title').className = "form_title";
	document.getElementById('password_again_box').className = "";
	document.getElementById('entery_button_box').className = "custom_button no_display";
	document.getElementById('reg_button_box').className = "custom_button no_display";
	document.getElementById('finish_reg_button_box').className = "custom_button";
	document.getElementById('forgot_id').className = "forgot no_display";
};
function get_session_cookie(session_id) {
	document.cookie = session_id;
	console.log(document.cookie);
};