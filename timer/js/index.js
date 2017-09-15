var seconds = 1080;
var domText = document.getElementById("countdown");
var countdownTimer ;

var socks = new WebSocket("ws://192.168.43.92:8080");
	socks.onopen = function (event){
		console.log("connected");
		socks.send("test");
	}
	socks.onmessage = function (event){
		if(event.data=="start"){
			secondPassed();
			countdownTimer= setInterval('secondPassed()', 1000);
		}
		else if(event.data=="reset"){
			seconds=1080;
			clearInterval(countdownTimer);
			domText.innerHTML="18:00";
		}
		else if(event.data=="pause"){
			clearInterval(countdownTimer);
		}
		console.log(event.data);
	}


function secondPassed() {
  var minutes = Math.round((seconds - 30)/60),
      remainingSeconds = seconds % 60;

  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;
  if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = "00:00";
  } else {
    seconds--;
  }
}


