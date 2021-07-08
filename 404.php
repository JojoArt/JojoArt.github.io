<!doctype html>
<html>
<head>
<title>404 ERROR</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="victor hachard" />
<link type="text/plain" rel="author" href="http://victorhachard.fr/humans.txt" />
<base href="{{base_url}}" />
<link rel="stylesheet" href="404.css">
<link rel="icon" type="icon/png" href="images/404.ico" />
</head>
<body>

<script type="text/javascript">
	(function () {
	var timeLeft = 10,
	cinterval;
	var timeDec = function (){
	 timeLeft--;
	 document.getElementById('countdown').innerHTML = timeLeft;
	 if(timeLeft === 0){
		clearInterval(cinterval);
		window.location.replace('/');
	}
	};

	cinterval = setInterval(timeDec, 1000);
	})();
</script>

  <div class="background">
	<div class="box">
      <div class="content">
        <h1>404 ERROR</h1>
	    <p class="errorDetail">We are sorry but the page your looking for was not found...</p>
	    <p class="redirect">Redirecting in <span id="countdown">10</span> seconds.</p>
      </div>
    </div>
  </div>
<!-- </body> -->
</html>
