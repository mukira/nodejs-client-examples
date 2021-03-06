var smartliving = require('smartliving');
var grove = require('jsupm_grove');

smartliving.credentials = require('./credentials');

// Create the Grove LED object using GPIO pin 4
var d4 = new grove.GroveLed(4);

// Set up the LED actuator
led = smartliving.addAsset(
  "d4",
  "A little LED",
  "A connected LED",
  "boolean",
  function(){
      console.log("LED actuator enrolled")
  },function(command) {
    if(command=="true"){
      d4.on();
    }else{
      d4.off();
    }
}
);

// Create the Grove button object using GPIO pin 2
// NOTE: We're using the GroveButton UPM library which behaves exactly the same for PIR Motion sensor
var d2 = new grove.GroveButton(2);

// Set up the PIR sensor
pir = smartliving.addAsset(
	"d2",
	"Motion detector",
	"Detects passive infrared motion",
	"bool",
	function(){
    console.log("Motion detector enrolled")
	}
);

smartliving.connect();

var state = false; //Don't send the value if it hasn't changed

setInterval(function(){
 
  var reading = d2.value();
	
  if (state != reading){ 				 
    if (state){
       smartliving.send("false", "d2");
    }else{
       smartliving.send("true", "d2");
    }
	  state = !state;
  }
},100);