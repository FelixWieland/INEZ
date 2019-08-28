let request= require("./dbRequests");


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
/*
request.createUser("tim","abc",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});

*/



/*
let id="";
request.createShoppingList("ABC", "1",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
		id=data._id;
	}
});
request.createShoppingList("ABC", "2",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
		id=data._id;
	}
});
/*
*/
request.addProductToShoppingList("5d66b6b3c8fc280b34f12497", "5d60504025e690b4eefece03", "g",250,function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});

/*
request.getShoppingListsById("5d66a8c806c8a43bac0ef4fc",function (err, data){
	if (err) console.log(err);
	else {
		console.log(data);
	}
});
 */

request.deleteUser("tim",function (err, data){
	if (err) console.log(err);
	else {
		console.log(data);
	}
});



/*
request.getShoppingLists("tim",function (err, data){
	if (err) console.log(err);
	else {
		console.log(data);
	}
});

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


