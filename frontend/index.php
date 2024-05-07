<?php
$output = shell_exec('python3 hello.py');
echo $output;
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="mystyle.css">
<script src="https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js"></script>
<script type="module">
  import.meta.env.VITE_SERVER_URL = 'http://localhost:7007'; // Specify the correct port
</script>
</head>
<body>
<div class="login-page">
  <div class="form">
    <form class="login-form">
      <p class="text" style="font-weight:bold; font: size 70px;;"> NJIT Room Search Landing Page</p>
      <a href="login.php" >Login</a>
      <a href="register.php">Register</a>
    </form>
  </div>
</div>
</body>
</html>
