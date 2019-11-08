// Clear previous cookies
function clearListCookies()
{
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
  {
    var spcook =  cookies[i].split("=");
    deleteCookie(spcook[0]);
  }
  function deleteCookie(cookiename)
  {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var expires = ";expires="+d;
    var name=cookiename;
    //alert(name);
    var value="";
    document.cookie = name + "=" + value + expires + "; path=/acc/html";
  }
}

clearListCookies()

// Pomodoro Clock Function
$workT = $("#work-time");
$breakT = $("#break-time");
$status = $("#status");

$('#break-minus').click(function() {
  $status.text("Break!");
  if (+$breakT.text() > 1){
    $breakT.text(+$breakT.text() - 1);
  }
});

$("#break-plus").click(function() {
  $status.text('Break!');
  $breakT.text(+$breakT.text() + 1);
});

$('#work-minus').click(function() {
  $status.text('Work!');
  if (+$workT.text() > 1) {
    $workT.text(+$workT.text() - 1);
  }
});

$('#work-plus').click(function() {
  $status.text('Work!');
  $workT.text(+$workT.text() + 1);
});

var audio = new Audio('https://soundbible.com/grab.php?id=1377&type=wav');

function beep() {
  audio.play();
}

function pad(val) {
  return ('00' + val).slice(-2);
}

var el = document.getElementById("timer");

function updateDisplay(t) {
  let hours = Math.floor(t / 3600);
  t -= hours * 3000;
  let minutes = Math.floor(t / 60);
  t -= minutes * 60;
  let seconds = Math.floor(t);
  el.innerHTML = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

time = 0;
updateDisplay(time);
var running = true;
var tlast = (new Date()).getTime();

function update() {

  if (time <= 0.0) {
    return;
  }

  var tnow = (new Date()).getTime();
  var dt = (tnow - tlast)/1000.0;
  tlast = tnow;
  time -= dt;
  if ($status.text() === 'Work!') {
    totalTime = ($workT.text() * 60);
    water = 'rgba(25, 139, 201, 1)';
  }

  if ($status.text() === 'Break!') {
    totalTime = ($breakT.text() * 60);
    water = 'rgba(255, 0, 0, 1)';
  }

  fraction = 1 - (time / totalTime);

  $('#progress').waterbubble({
    data: fraction,
    animation: false,
    waterColor: water,
  });

  if(time <= 0){
    if($status.text() == "Work!") {
      beep();
      $status.text('Break!');
      time = $breakT.text() * 60;
    } else {
      beep();
      $status.text('Work!');
      time = $workT.text() * 60;
    }
  }

  updateDisplay(time);
  if (running) {
    requestAnimationFrame(update);
  }
}

function run() {
  $status.text('Work!');
  if (time <= 0.0) {
    time = $workT.text() * 60;
  }

  tlast = (new Date()).getTime();
  running = true;
  document.getElementById("break-minus").disabled = true;
  document.getElementById("break-time").disabled = true;
  document.getElementById("break-plus").disabled = true;

  document.getElementById("work-minus").disabled = true;
  document.getElementById("work-time").disabled = true;
  document.getElementById("work-plus").disabled = true;
  requestAnimationFrame(update);
}

function pause() {
  running = false;
}

function stop() {
  running = false;
  time = 0;
  el.innerHTML = '00:00:00';
  $status.text('Work!');
  $workT.text(25);
  $breakT.text(5);
  $('#progress').waterbubble({
    data: 10.0,
    animation: false,
    waterColor: 'rgba(25, 139, 201, 1)',
  });
  document.getElementById("break-minus").disabled = false;
  document.getElementById("break-time").disabled = false;
  document.getElementById("break-plus").disabled = false;

  document.getElementById("work-minus").disabled = false;
  document.getElementById("work-time").disabled = false;
  document.getElementById("work-plus").disabled = false;
}

var bStart = document.getElementById('start');
var bPause = document.getElementById('pause');
var bReset = document.getElementById('reset');

bStart.onclick = run;
bPause.onclick = pause;
bReset.onclick = stop;

$('#progress').waterbubble({

  // bubble size
  radius: 100,

  // border width
  lineWidth: undefined,

  // data to present
  data: 0.0,

  // color of the water bubble
  waterColor: 'rgba(25, 139, 201, 1)',

  // text color
  textColor: 'rgba(06, 85, 128, 0.8)',

  // custom font family
  font: '',

  // show wave
  wave: true,

  // custom text displayed inside the water bubble
  txt: undefined,

  // enable water fill animation
  animation: false,

});
