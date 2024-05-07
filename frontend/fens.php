<?php
$command = escapeshellcmd('python3 fens.py');
$output = shell_exec($command);
echo $output;
?>