<?php
$command = escapeshellcmd('python3 culm.py');
$output = shell_exec($command);
echo $output;
?>