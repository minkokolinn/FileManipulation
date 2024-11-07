<?php
use config\DBConfig;

require_once "config/DBConfig.php";

$json = file_get_contents('php://input');
$php_arr = json_decode($json, true);

$dbConfig = new DBConfig();
$conn = $dbConfig->getConnection();

$success = 0;
$fail = 0;
for ($i = 0; $i < sizeof($php_arr); $i++) {
    $insertStmt = $conn->prepare("
        CALL insertIsf(
            '" . $php_arr[$i]['headerCode'] . "',
            '" . $php_arr[$i]['headerDate'] . "',
            '" . $php_arr[$i]['rowType'] . "',
            '" . $php_arr[$i]['pan'] . "',
            '" . $php_arr[$i]['processingCode'] . "',
            '" . $php_arr[$i]['amount'] . "',
            '" . $php_arr[$i]['currencyCode'] . "',
            '" . $php_arr[$i]['transactionDateTime'] . "',
            '" . $php_arr[$i]['traceNumber'] . "',
            '" . $php_arr[$i]['authorizationResponse'] . "',
            '" . $php_arr[$i]['authorizationDate'] . "',
            '" . $php_arr[$i]['referenceNumber'] . "',
            '" . $php_arr[$i]['ain'] . "',
            '" . $php_arr[$i]['fii'] . "',
            '" . $php_arr[$i]['merchantType'] . "',
            '" . $php_arr[$i]['terminalId'] . "',
            '" . $php_arr[$i]['aic'] . "',
            '" . $php_arr[$i]['anal'] . "',
            '" . $php_arr[$i]['orTransactionInfo'] . "',
            '" . $php_arr[$i]['messageReasonCode'] . "',
            '" . $php_arr[$i]['itf'] . "',
            '" . $php_arr[$i]['conditionCode'] . "',
            '" . $php_arr[$i]['merchantCountryCode'] . "',
            '" . $php_arr[$i]['sOrR'] . "',
            '" . $php_arr[$i]['resultField'] . "',
            '" . $php_arr[$i]['trailerNo'] . "',
            '" . $php_arr[$i]['quantity'] . "',
            '" . $php_arr[$i]['bankInfo'] . "',
            '" . $php_arr[$i]['trailerTime'] . "',
            '" . $php_arr[$i]['trailerDate'] . "'
        );
    ");
    if ($insertStmt->execute()) {
        $success++;
    }else{
        $fail++;
    }
    
}
if ($success==sizeof($php_arr)) {
    echo "true";
}
if ($fail>0) {
    echo "false";
}
?>