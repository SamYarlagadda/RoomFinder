<?php
require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace 'localhost' with your RabbitMQ server IP, and 5672 with your port if it's not the default one
    $connection = new AMQPStreamConnection('10.241.141.94', 5672, 'ssy22', 'ssy22', 'ssy22');
    $channel = $connection->channel();

    // Declare a queue for us to send to
    $channel->queue_declare('frontend_login', false, false, false, false);

    $username = $_POST["username"];
    $njit_id = $_POST["njit_id"];
    $password = $_POST["password"];

    // Prepare the message
    $message_data = array(
        'username' => $username,
        'njit_id' => $njit_id,
        'password' => $password,
    );

    // Convert the message data to JSON
    $message_json = json_encode($message_data);

    // Create a new AMQP message
    $msg = new AMQPMessage($message_json);

    // Publish the message
    $channel->basic_publish($msg, '', 'frontend_login');

    $channel->close();
    $connection->close();
}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="mystyle.css">
  </head>
  <body>    
    <div class="page-container">
      <div class="form">
        <form class="login-form" action="" method="post">
          <p class="text" style="font-weight:bold; font: size 70px;;"> NJIT Room Search Login Page</p>
          <input type="text" id="username" name="username" placeholder="Username" required/>
          <input type="njit_id" id="njit_id" name="njit_id" placeholder="NJIT ID" required/>
          <input type="password" id="password" name="password" placeholder="Password" required/>
          <button type="submit">Login</button>
          <p class="message">Not registered? <a href="register.php">Create an account</a></p>
        </form>
      </div>
    </div>
  </body>
</html>
