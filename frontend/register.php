<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="mystyle.css">
</head>
<body>
<?php
        require_once __DIR__ . '/vendor/autoload.php';
        use PhpAmqpLib\Connection\AMQPStreamConnection;
        use PhpAmqpLib\Message\AMQPMessage;?>
<div class="page-container">
    <div class="form">
      <form action="/register" method="post" class="login-form">
        <p class="text" style="font-weight:bold; font: size 70px;;"> NJIT Room Search Registration Page</p>
        <input type="text" id="first_name" name="first_name" placeholder="Student Name" required/>
        <input type="text" id="last_name" name="last_name" placeholder="Student Last Name" required/>
        <input type="text" id="username" name="username" placeholder="Username" required/>
        <input type="password" id="password" name="password" placeholder="Password" required/>
        <input type="id" id="njit_id" name="njit_id" placeholder="NJIT ID" required/>
        <input type="text" id="email_address" name="email_address" placeholder="Email address" required/>
        <input type="date" id="date_of_birth" name="date_of_birth" placeholder="Date of Birth" required/>
        <input type="number" id="phone_number" name="phone_number" placeholder="Phone Number" required/>
        <button>Create</button>
        <p class="message">Already registered? <a href="index.html">Sign In</a></p>
      </form>      
    </div>
  </div>
</body>
</html>