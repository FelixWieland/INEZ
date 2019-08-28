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
request.createUser("Tim","abc",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
	}
});


*/
/*

let id="";
request.createShoppingList("Tim", "1",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
		id=data._id;
	}
});
request.createShoppingList("Tim", "2",function (err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
		id=data._id;
	}
});
/*
*/

/*
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
/*
request.getAllProductsByGroupId("5d625be7bb9fb093bf5fa4f6", function (err, data) {
	if (err) console.log(err);
	else {
		console.log(2);
		console.log(data);
	}
});


/*
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


*/


request.getShoppingLists("Tim",function(err, data) {
	if (err) console.log(err);
	else {
		console.log(data);
		console.log("")
		console.log("")
		let s_id = data[0]._id;
		request.deleteShoppingList("Tim",s_id, function (err, data){
			if (err) console.log(err);
			else {
				console.log(data);
			}
		});
	}
});



/*

let s_id=0;
request.getShoppingLists("Tim",function(err, data){
	if (err) console.log(err);
	else {
		console.log(data);
		console.log("")
		console.log("")
		s_id=data[0]._id;
		console.log(s_id + "sid")
		request.getAllProducts(function (err, data2) {
			d=[];
			if (err)
				console.log(err);
			else {
				console.log(data[0]);


				request.addProductToShoppingList(s_id, data2[0]._id, "kg", "2",function (err, data){
					if (err) console.log(err);
					else {
						console.log(data);
					}
				});
				d=data;


			}
		});
	}
});
*/



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
			request.addProductToShoppingList(s_id, data[0]._id, "kg", "2",function (err, data){
				if (err) console.log(err);
				else {
					console.log(data);
				}
			});
			d=data;


		}
	});
}, the_interval);

*/
