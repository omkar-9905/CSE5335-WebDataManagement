<?php
// The message
echo "<h2>PHP is Fun!</h2>";
$message = "Line 1\r\nLine 2\r\nLine 3";
// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70, "\r\n");

// Send
mail('lobikac674@deitada.com', 'My Subject', $message);
?>
