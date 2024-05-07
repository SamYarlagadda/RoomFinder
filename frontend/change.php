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
        $channel->queue_declare('frontend_change', false, false, false, false);

        $username = $_POST["username"];
        $njit_id = $_POST["njit_id"];
        $new_password = $_POST["new_password"];

        // Prepare the message
        $message_data = array(
            'username' => $username,
            'njit_id' => $njit_id,
            'new_password' => $new_password,
        );

        // Convert the message data to JSON
        $message_json = json_encode($message_data);

        // Create a new AMQP message
        $msg = new AMQPMessage($message_json);

        // Publish the message
        $channel->basic_publish($msg, '', 'frontend_change');

        // Declare the queue from which we're going to consume
        $channel->queue_declare('login_response', false, false, false, false);

        // Define a PHP Callback
        $callback = function ($msg) {
          if ($msg->body == 'successful') {
              header('Location: home.php');
              exit();
          } else if ($msg->body == 'unsuccessful') {
              header('Location: unsuccessful-change.php');
              exit();
          }
        };

        // Consume from the declared queue
        $channel->basic_consume('change_response', '', false, true, false, false, $callback);

        // Loop as long as the channel has callbacks
        while (count($channel->callbacks)) {
            $channel->wait(null, false, 5); // 5 seconds timeout
        }

        $channel->close();
        $connection->close();
    } catch (Exception $e) {
        // Log the error message if needed
        error_log($e->getMessage());

        // Redirect to 'unsuccessful.php' in case of an error
        header('Location: unsuccessful-change.php');
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
        <form class="change-password-form" action="" method="post">
          <p class="text" style="font-weight:bold; font: size 70px;;"> NJIT Room Search Change Password Page</p>
          <input type="text" id="username" name="username" placeholder="Username" required/>
          <input type="text" id="njit_id" name="njit_id" placeholder="NJIT ID" required/>
          <input type="password" id="new_password" name="new_password" placeholder="New Password" required/>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  </body>
</html>
