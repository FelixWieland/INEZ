var request= require("./dbRequests");



request.getUser("Felix",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});

/*
request.deleteShoppingList("5d62cfc9db15bf50d4df65e1",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});*/
/*
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
*/
