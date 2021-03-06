var smartliving = require('smartliving');
var smc = require('smc');	//OSX System Management Controller

smartliving.credentials = require('./credentials');

cpu = smartliving.addAsset(
	"102",
	"Mac CPU Temp",
	"Monitors the temperature of the top secret nuclear reactor controller... AKA my Mac ",
	"double",
	function(){
		console.log("Mac CPU temperature sensor enrolled")
	});

fan = smartliving.addAsset(
	"103",
	"Mac fan speed", 
	"Gives a reading from the fan controller",
	"int",
	function(){
		console.log("Fan RPM enrolled")
	});

smartliving.connect();

setInterval(function(){
	smartliving.send(smc.temperature(), "102");  
	smartliving.send(smc.fanRpm(0), "103"); 
},5000);