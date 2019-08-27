var request= require("./dbRequests");


/*
request.getUser("Felix",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});
*/
/*
request.deleteShoppingList("5d62cfc9db15bf50d4df65e1",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});
*/

request.createUser("tim","abc",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});


/*
request.getUser("Tim",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});
*/
let id;
request.createShoppingList("tim", "Wochenende",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
		id=data._id;
	}
});

request.addProductToShoppingList("5d657bd8f7d297174c891e4b", "5d60504025e690b4eefece03", "g",250,function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});



var d;
var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
	console.log("I am doing my 5 minutes check");
	// do your stuff here

	request.getAllProducts(function (err, data) {
		d=[];
		if (err)
			console.log(err);
		else {
			console.log(data[0]);
			d=data;
		}
	});
}, the_interval);


