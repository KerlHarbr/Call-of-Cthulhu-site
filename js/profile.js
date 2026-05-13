async function cookies_post() {
	const cookies_input = document.cookie.split(";");
	var output_data = {};
	for(cookie of cookies_input) {
		const parts = cookie.split("=");
		output_data[parts[0]] = parts[1];
	};
	// console.log(output_data);
	if(output_data == "") {
		var response = await fetch("/profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: {"session_id": none }
		});
	} else {
		var response = await fetch("/profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(output_data)
		});
	};
};
cookies_post();//отправка значения
async function set_data() {
	var test = "penis";
	var response;
	try {
		response = await fetch("/profile", {
			method: "PUT",
			body: test
		});
		console.log(test);
	} catch(error) {
		console.log("ну не получилось", error);
	};
	console.log("test " + test);
};
set_data();