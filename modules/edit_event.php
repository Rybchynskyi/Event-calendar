<?php
include 'dbconnect.php';

$eventId = htmlspecialchars($_POST['eventId']);
$eventName = htmlspecialchars($_POST['eventName']);
$eventDescr = htmlspecialchars($_POST['eventDescr']);
$eventLocation = htmlspecialchars($_POST['eventLocation']);
$eventDateTime = htmlspecialchars($_POST['eventDateTime']);
$eventType = htmlspecialchars($_POST['eventType']);

$sql_edit_event = "UPDATE `events` SET
                      `name` = '$eventName',
                      `descr` = '$eventDescr',
                      `place` = '$eventLocation',
                      `date` = '$eventDateTime',
                      `category` = '$eventType'
                    WHERE `events`.`id` = '$eventId'";

$count = $pdo->query($sql_edit_event);
if ($count==true) {
    header('Location: ../index.html?info=editSuccess');
}
else {
    header('Location: ../index.html?info=editWrong');
}
