export class Result {
  constructor(headerCode,headerDate,rowType,pan,processingCode,amount,currencyCode,transactionDateTime,traceNumber,
    authorizationResponse,authorizationDate,referenceNumber,ain,fii,merchantType,terminalId,aic,anal,orTransactionInfo,
    messageReasonCode,itf,conditionCode,merchantCountryCode,sOrR,resultField,trailerNo,quantity,
    bankInfo,trailerTime,trailerDate) {

    this.headerCode = headerCode;
    this.headerDate = headerDate;
    this.rowType = rowType;
    this.pan = pan;
    this.processingCode = processingCode;
    this.amount = amount;
    this.currencyCode = currencyCode;
    this.transactionDateTime = transactionDateTime;
    this.traceNumber = traceNumber;
    this.authorizationResponse = authorizationResponse;
    this.authorizationDate = authorizationDate;
    this.referenceNumber = referenceNumber;
    this.ain = ain;
    this.fii = fii;
    this.merchantType = merchantType;
    this.terminalId = terminalId;
    this.aic = aic;
    this.anal = anal;
    this.orTransactionInfo = orTransactionInfo;
    this.messageReasonCode = messageReasonCode;
    this.itf = itf;
    this.conditionCode = conditionCode;
    this.merchantCountryCode = merchantCountryCode;
    this.sOrR= sOrR;
    this.resultField = resultField;
    this.trailerNo = trailerNo;
    this.quantity = quantity;
    this.bankInfo = bankInfo;
    this.trailerTime= trailerTime;
    this.trailerDate= trailerDate;
  }
}
