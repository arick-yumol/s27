let http = require('http');


// Mock Database
let user_s27_activity = [
	{
		"firstName": "Mary Jane",
		"lastName": "Dela Cruz",
		"mobileNo": "09123456789",
		"email": "mjdelacruz@mail.com",
		"password": 123
	},
	{
		"firstName": "John",
		"lastName": "Doe",
		"mobileNo": "09123456789",
		"email": "jdoe@mail.com",
		"password": 123
	}
]

http.createServer(function(request, response) {
	if (request.url == "/profile" && request.method == "GET") {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.write(JSON.stringify(user_s27_activity));
		response.end();
	}
	else if (request.url == "/register" && request.method == "POST") {
		let requestBody = '';

		request.on('data', function(data){
			requestBody += data;
		})

		request.on('end', function() {
			console.log(typeof requestBody);

			requestBody = JSON.parse(requestBody);

			let newUser = {
				"firstName": requestBody.firstName,
				"lastName": requestBody.lastName,
				"mobileNo": requestBody.mobileNo,
				"email": requestBody.email,
				"password": requestBody.password
			}

			user_s27_activity.push(newUser)
			console.log(user_s27_activity)

			response.writeHead(200, {'Content-Type': 'application/json'});
			response.write(JSON.stringify(newUser));
			response.end();
		})
	}

}).listen(4000);