
<?php
include_once "lib/class.phpmailer.php";
include_once "config.php";


function toJSON($error_exist, $error_no, $error_msg, $data) {
    $ret = array();
    $ret['status'] = $error_exist == 0 ? 1 : 0;
    $ret['error_exist'] = $error_exist;
    $ret['error_no'] = $error_no;
    $ret['error_msg'] = $error_msg;
    $ret['data'] = $data;
    return json_encode($ret);
}

class SubscribeEmailTemplate {
    public function render($data) {
        $body = "" .
            "<h3>We're Delighted to Welcome You To Blue Octopus Gallery</h3>" .
            "It's a pleasure to have you as our subscriber.<br/>" .
            "In addition to a host of fantastic developments,<br/>" .
            "you will be the first to know and take advantage of<br/>" .
            "new products, exciting offers, special events and much more.<br/>" .
            "<br/>".
            "Please add marketing@blueoctopus.com.my<br/>" . 
            "to your address book to ensure you will not miss any<br/>".
            "juicy details and important information from us.";
        return $body;
    }
}


$data = $templateData = $_POST;

$subscriber = array($data['email'],$data['email']);

$addresses = array(
    $subscriber,
    array('marketing@blueoctopus.com.my', 'Blue Octopus'),
    array('christina@infradesign.com.my', 'Christina')
);

$replyToAddress = array('marketing@blueoctopus.com.my', 'Blue Octopus');




$iserror = 0;



foreach($addresses as $k => $address) {
    $template = new SubscribeEmailTemplate();
    $body = $template->render($templateData);
    $name = "markerting@blueoctopus.com.my";
    $sender = "markerting@blueoctopus.com.my";
    $subject = "Thanks for your subscription";

    $mailer = new PHPMailer();
    $mailer->IsSMTP();
    $mailer->SMTPDebug = false;
    $mailer->SMTPAuth = true;
    $mailer->Host = $config['smtp']['host'];
    $mailer->Port = $config['smtp']['port'];
    $mailer->Username = $config['smtp']['user'];
    $mailer->Password = $config['smtp']['pass'];
    $mailer->CharSet = "UTF-8";
    $mailer->Subject = $subject;
    $mailer->MsgHTML($body);
    
    $mailer->SetFrom($sender, $name);
    $mailer->AddReplyTo($replyToAddress[0], $replyToAddress[1]);
    $mailer->AddAddress($address[0], $address[1]);
    if(!$mailer->send()) {
        $iserror = 1;
    }
}

if($iserror){
    echo toJSON(1, 0, 'Error sending email1', '');
}else{
    echo toJSON(0, 0, 'Success', '');
}
?>