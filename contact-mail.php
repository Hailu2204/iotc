<?php 
if(isset($_POST['submit'])){
   $email_to = "vinod.techie1989@gmail.com"; 
   $from = $_POST['email'];
   $emailList="vinod.be2011@gmail.com";
   $name = $_POST['name'];
   $phone=$_POST['phone'];
   $email = $_POST['email'];
   $subject = 'Brochure Download Request from IOTC Website';
  

$message = "Contact details

Name: $name

Email:  $email

Phone:  $phone

";
	

   $headers = "From:" . $from;
   $headers .= 'From: ' . $from . "\r\n" . "X-Mailer: php\r\n";
   $headers .= "Bcc: $emailList\r\n";
   $headers2 = "From:" . $email_to;
   mail($email_to,$subject,$message,$headers);
   echo '<script type="text/javascript">alert("Thank You For Downloading");window.location=\'iotc-group-company-profile-general.pdf\';</script>';
	   
}
?>