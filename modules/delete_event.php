<?php
include 'dbconnect.php';

$id = $_GET['id'];

$sql_edit_event = "DELETE FROM `events` WHERE `id` = '$id'";

$count = $pdo->query($sql_edit_event);
if ($count==true) {
    header('Location: ../index.html?info=deleteSuccess');
}
else {
    header('Location: ../index.html?info=deleteWrong');
}