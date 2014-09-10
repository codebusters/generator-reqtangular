<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

$data = file_get_contents("php://input");
$postData = json_decode($data, true);

if (isset($postData['name']) && isset($postData['email'])  && isset($postData['text'])) {

    //check if any of the inputs are empty
    if (empty($postData['name']) || empty($postData['email']) || empty($postData['text'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    $email = trim($postData['email']);

    $subject = "Web message subject";
    //email address settings
    $headers = "From: " .$email;
    $message = "Name: " . $postData['name'] . "\r\n\r\nMessage: " . stripslashes($postData['text']);
    $to = "<%=contact.email%>";

    if (isset($postData['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $postData['ref'];
    }

    mail($to, $subject, $message, $headers);
    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);


} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}

?>