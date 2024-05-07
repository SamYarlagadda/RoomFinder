<?php
require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Replace 'localhost' with your RabbitMQ server IP, and 5672 with your port if it's not the default one
        $connection = new AMQPStreamConnection('10.241.141.94', 5672, 'ssy22', 'ssy22', 'ssy22');
        $channel = $connection->channel();

        // Declare a queue for us to send to
        $channel->queue_declare('frontend_register', false, false, false, false);

        $first_name = $_POST["first_name"];
        $last_name = $_POST["last_name"];
        $username = $_POST["username"];
        $password = $_POST["password"];
        $njit_id = $_POST["njit_id"];
        $email = $_POST["email_address"];
        $dob = $_POST["date_of_birth"];
        $phone_number = $_POST["phone_number"];

        // Prepare the message
        $message_data = array(
            'first_name' => $first_name,
            'last_name' => $last_name,
            'username' => $username,
            'password' => $password,
            'njit_id' => $njit_id,
            'email_address' => $email,
            'date_of_birth' => $dob,
            'phone_number' => $phone_number,
        );

        // Convert the message data to JSON
        $message_json = json_encode($message_data);

        // Create a new AMQP message
        $msg = new AMQPMessage($message_json);

        // Publish the message
        $channel->basic_publish($msg, '', 'frontend_register');

        // Declare the queue from which we're going to consume
        $channel->queue_declare('register_response', false, false, false, false);

        // Define a PHP Callback
        $callback = function ($msg) {
          if ($msg->body == 'successful') {
              header('Location: successful-register.php');
              exit();
          } else if ($msg->body == 'unsuccessful') {
              header('Location: unsuccessful-register.php');
              exit();
          }
        };

        // Consume from the declared queue
        $channel->basic_consume('register_response', '', false, true, false, false, $callback);

        // Loop as long as the channel has callbacks
        while (count($channel->callbacks)) {
            $channel->wait(null, false, 5); // 5 seconds timeout
        }

        $channel->close();
        $connection->close();
    } catch (Exception $e) {
        // Log the error message if needed
        error_log($e->getMessage());

        // Redirect to 'unsuccessful-register.php' in case of an error
        header('Location: unsuccessful-register.php');
        exit();
    }
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
        <!-- Set the action attribute to the PHP script that will handle the form submission -->
        <form class="login-form" action ="" method="post">
          <p class="text" style="font-weight:bold; font: size 70px;;"> NJIT Room Search Registration Page</p>
          <input type="text" id="first_name" name="first_name" placeholder="Student Name" required/>
          <input type="text" id="last_name" name="last_name" placeholder="Student Last Name" required/>
          <input type="text" id="username" name="username" placeholder="Username" required/>
          <input type="password" id="password" name="password" placeholder="Password" required/>
          <input type="id" id="njit_id" name="njit_id" placeholder="NJIT ID" required/>
          <input type="text" id="email" name