<?php
$command = escapeshellcmd('python3 ctr.py');
$output = shell_exec($command);
echo $output;
?>