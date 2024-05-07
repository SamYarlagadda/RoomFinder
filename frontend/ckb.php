<?php
$command = escapeshellcmd('python3 ckb.py');
$output = shell_exec($command);
echo $output;
?>