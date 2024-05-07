<?php
$command = escapeshellcmd('python3 kupf.py');
$output = shell_exec($command);
echo $output;
?>