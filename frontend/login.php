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
            use PhpAmqpLib\Message\AMQPMessage;

            $connection = new AMQPStreamConnection('10.241.141.94', '5672', 'ssy22', 'ssy22', 'ssy22');
            $channel = $connection->channel();
            $channel->queue_declare('login_request', false, false, false, false);
            $callback_queue = uniqid('login_response');
            $channel->queue_declare($callback_queue, false, false, false, false);
            

            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
              $username = $_POST['username'];
              $id = $_POST['njit_id'];
              $password = md5($password);

              $data = [
                  'username' => $username,
                  'password' => $password,
                  'njit_id' => $id
              ];

              $msg = new AMQPMessage(json_encode($data), ['reply_to' => $callback_queue]);


              $channel->basic_publish($msg, '', 'login_request');



            $channel->close();
            $connection->close();
            ?>
            
    <div class="page-container">
      <div class="form">
        <form class="login-form" action="/login" method="post">
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
