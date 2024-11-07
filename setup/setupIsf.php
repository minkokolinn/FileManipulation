<?php
use config\DBConfig;

require_once "config/autoload.php";

$dbcon = new DBConfig();

$conn = $dbcon->getConnection();

$createIsfStmt = $conn->prepare("
    CREATE table isf
    (
        rowId int not null auto_increment,
        headerCode varchar(3),
        headerDate varchar(6),
        rowType varchar(12),
        pan varchar(19),
        processingCode varchar(6),
        amount double,
        currencyCode varchar(5),
        transactionDateTime varchar(13),
        traceNumber varchar(6),
        authorizationResponse varchar(10),
        authorizationDate varchar(4),
        referenceNumber varchar(15),
        ain varchar(15),
        fii varchar(13),
        merchantType varchar(4),
        terminalId varchar(10),
        aic varchar(16),
        anal varchar(45),
        orTransactionInfo varchar(23),
        messageReasonCode varchar(4),
        itf varchar(1),
        conditionCode varchar(2),
        merchantCountryCode varchar(3),
        sOrR varchar(11),
        resultField varchar(5),
        trailerNo varchar(3),
        quantity int,
        bankInfo varchar(20),
        trailerTime varchar(6),
        trailerDate varchar(8),
        PRIMARY KEY(rowId)
    )
");
if ($createIsfStmt->execute()) {
    echo "success";
}else{
    echo "fail";
}

?>