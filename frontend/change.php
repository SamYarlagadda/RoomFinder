<?php
require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $connection = new AMQPStreamConnection('10.241.141.94', 5672, 'ssy22', 'ssy22', 'ssy22');
        $channel = $connection->channel();

        $channel->queue_declare('frontend_change', false, false, false, false);

        $username = $_POST["username"];
        $njit_id = $_POST["njit_id"];
        $old_password = $_POST["old_password"];
        $new_password = $_POST["new_password"];
        $confirm_password = $_POST["confirm_password"];

        if ($new_password != $confirm_password) {
            // Redirect to 'unsuccessful-change.php' in case of password mismatch
            header('Location: unsuccessful-change.php');
            exit();
        }

        $message_data = array(
            'username' => $username,
            'njit_id' => $njit_id,
            'old_password' => $old_password,
            'new_password' => $new_password,
        );

        $message_json = json_encode($message_data);
        $msg = new AMQPMessage($message_json);

        $channel->basic_publish($msg, '', 'frontend_change');
        $channel->queue_declare('login_response', false, false, false, false);

        $callback = function ($msg) {
          if ($msg->body == 'successful') {
              header('Location: home.php');
              exit();
          } else if ($msg->body == 'unsuccessful') {
              header('Location: unsuccessful-change.php');
              exit();
          }
        };

        $channel->basic_consume('change_response', '', false, true, false, false, $callback);

        while (count($channel->callbacks)) {
            $channel->wait(null, false, 5);
        }

        $channel->close();
        $connection->close();
    } catch (Exception $e) {
        error_log($e->getMessage());
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
        <form class="change-password-form" action="" method="post">
          <p class="text" style="font-weight:bold; font: size 70px;;"> NJIT Room Search Change Password Page</p>
          <input type="text" id="username" name="username" placeholder="Username" required/>
          <input type="text" id="njit_id" name="njit_id" placeholder="NJIT ID" required/>
          <input type="password" id="old_password" name="old_password" placeholder="Old Password" required/>
          <input type="password" id="new_password" name="new_password" placeholder="New Password" required/>
          <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm New Password" required/>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  </body>
</html>
