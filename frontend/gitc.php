<?php
$command = escapeshellcmd('python3 gitc.py');
$output = shell_exec($command);
echo $output;
?>