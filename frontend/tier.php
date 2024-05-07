<?php
$command = escapeshellcmd('python3 tier.py');
$output = shell_exec($command);
echo $output;
?>