import { Result } from "./model.js";

console.log("JS file is working now");

// Disabling resubmission request and Selecting element
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
// ========================================================

// Selecting element
var btnTop = document.querySelector("#btnUptoTop");
let cancelBtn = document.querySelector("#btnCancel");
let preloader = document.querySelector("#preloader");
let boxFile = document.querySelector("#boxFile");
let alertDiv = document.querySelector("#alertDiv");
let alertDiv2 = document.querySelector("#alertDiv2");
let formDiv = document.querySelector("#formDiv");
let resultDiv = document.querySelector("#resultDiv");
let resultTable = document.querySelector("#resultTable");
let errorDiv = document.querySelector("#errorDiv");
let errorTable = document.querySelector("#errorTable");
let btnReset = document.querySelector("#btnReset");
let btnUpload = document.querySelector("#btnUpload");
resultDiv.classList.add("d-none");
errorDiv.classList.add("d-none");

const alertBox_filetype = getAlertError(
  "This file type is not supported to manipulate!!!"
);
const alertBox_filename = getAlertError(
  "This file is not incoming settlement file!!!"
);
const alertBox_readerror = getAlertError("Error in file reading!!!");
const alertBox_readsuccess = getAlertSuccess(
  "Your file had been read successfully..."
);
const alertBox_checkValid = getAlertError(
  "Your file is not a valid file! It does not contain basic mandantory parts!!"
);
const alertBox_rowNotMatch = getAlertError(
  "Total number of detected row does not match with count mentioned in trailer!!!"
);
let foundInvalidRow = (num) =>
  getAlertWarning(
    num === 1 ? `${num} invalid row is found` : `${num} invalid rows are found`
  );
btnReset.addEventListener("click", () => {
  location = "fileUpload.php";
});

// ============================================================

// Scroll to Top
window.addEventListener("scroll", function () {
  if (window.scrollY > 342) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

btnTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
// ================================================================

// Cancel button handling
cancelBtn.addEventListener("click", () => {
  cancelBtn.classList.add("d-none");
  alertDiv.innerHTML = "";
  alertDiv2.innerHTML = "";
});
window.addEventListener("load", () => {
  cancelBtn.click();
});
// =================================================================

boxFile.addEventListener("change", (e) => {
  fileUpload();
});

function fileUpload() {
  const [file] = boxFile.files; // accept file object with array destructor
  cancelBtn.classList.remove("d-none");

  alertDiv.innerHTML = "";
  alertDiv2.innerHTML = "";

  if (!errorCheck(file)) {
    const reader = new FileReader();

    if (file) {
      reader.readAsText(file);
    }

    reader.addEventListener("loadstart", () => {
      preloader.classList.remove("d-none");
    });

    reader.addEventListener("loadend", () => {
      preloader.classList.add("d-none");
    });

    reader.addEventListener("load", () => {
      fileManipulate(reader.result);
    });

    reader.addEventListener("error", () => {
      alertDiv2.appendChild(alertBox_readerror);
    });
  }
}

var manResultArr = [];
function fileManipulate(readString) {
  const resultArr = readString.split(/\r?\n/);

  const firstRow = resultArr[0];
  const trimmed = firstRow.replace(/\s/g, "");

  const newresultArr = resultArr.filter((n) => n); // after removing empty element

  // check for header standard
  if (
    firstRow.slice(0, 3) === "000" &&
    firstRow.length === 20 &&
    trimmed.substring("000".length).length === 6
  ) {
    // check for trailer standard
    let lastRow = newresultArr[newresultArr.length - 1];
    if (lastRow.length === 46) {
      // check for quantity match or not
      let mentionQty = lastRow.slice(3, 12).trim();
      if (mentionQty == newresultArr.length) {
        alertDiv2.appendChild(alertBox_readsuccess);

        //if quantiy does match
        let manErrorArr = [];
        let errorCount = 0;
        let handler = 0;

        const headerCode = newresultArr[0].slice(0, 3);
        const headerDate = newresultArr[0].slice(14, 20);
        const trailerNo = newresultArr[newresultArr.length - 1].slice(0, 3);
        const quantity = newresultArr[newresultArr.length - 1].slice(3, 12);
        const bankInfo = newresultArr[newresultArr.length - 1].slice(12, 32);
        const trailerTime = newresultArr[newresultArr.length - 1].slice(32, 38);
        const trailerDate = newresultArr[newresultArr.length - 1].slice(38, 46);

        newresultArr.forEach((row) => {
          if (handler >= 1 && handler <= newresultArr.length - 2) {
            if (row.length === 211) {
              manResultArr.push(
                new Result(
                  headerCode,
                  headerDate,
                  row.slice(0, 3)=="100"?"Settlement":"Refund",
                  row.slice(3, 22),
                  row.slice(22, 28),
                  row.slice(28, 40),
                  row.slice(40, 43),
                  row.slice(43, 53),
                  row.slice(53, 59),
                  row.slice(59, 65),
                  row.slice(65, 69),
                  row.slice(69, 81),
                  row.slice(81, 92),
                  row.slice(92, 103),
                  row.slice(103, 107),
                  row.slice(107, 115),
                  row.slice(115, 130),
                  row.slice(130, 170),
                  row.slice(170, 193),
                  row.slice(193, 197),
                  row.slice(197, 198),
                  row.slice(198, 200),
                  row.slice(200, 203),
                  row.slice(203, 206)=="100"?"Settlement":"Refund",
                  row.slice(206, 211),
                  trailerNo,
                  quantity,
                  bankInfo,
                  trailerTime,
                  trailerDate
                )
              );
            } else {
              errorCount++;
              manErrorArr.push(row);
            }
          }
          handler++;
        });

        // show if there's invalid row
        if (errorCount > 0) {
          alertDiv2.appendChild(foundInvalidRow(errorCount));
        }

        // show result in display with table
        formDiv.classList.add("d-none");
        resultDiv.classList.remove("d-none");
        displayResult(manResultArr, manErrorArr);
      } else {
        alertDiv2.appendChild(alertBox_rowNotMatch);
      }
    } else {
      alertDiv2.appendChild(alertBox_checkValid);
    }
  } else {
    alertDiv2.appendChild(alertBox_checkValid);
  }
}

btnUpload.addEventListener("click", () => {
  if (manResultArr.length > 0) {
    var manResultJson = JSON.stringify(manResultArr);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4 && xhr.status==200){
        if (xhr.responseText=="true") {
          alert("Sucessfully uploaded to server...");
          location='fileUpload.php';
        }else{
          alert("failed to upload...");
          location='fileUpload.php';
        }
      }
    };

    xhr.open("POST","jsonHandler.php",true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(manResultJson);

  } else {
    alert("Invalid Action! There's nothing to upload!");
  }
});

function displayResult(manResultArr, manErrorArr) {
  // For header of the table
  let thead = document.createElement("thead");
  thead.classList.add("table-dark");
  thead.classList.add("text-center");

  let tr = document.createElement("tr");
  let noth = document.createElement("th");
  noth.innerHTML = `<h6>No</h6>`;
  tr.appendChild(noth);
  for (var key in manResultArr[0]) {
    // generate all possible table column from one object
    let th = document.createElement("th");
    th.innerHTML = `<h6>${key.toUpperCase()}</h6>`;
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  resultTable.appendChild(thead);

  // For body of the table
  let tbody = document.createElement("tbody");
  var no = 0;
  manResultArr.forEach((obj) => {
    no++;
    let tr1 = document.createElement("tr");
    let notd1 = document.createElement("td");
    notd1.style.border = "1px solid grey";
    notd1.textContent = `${no}`;
    tr1.appendChild(notd1);
    for (var key in obj) {
      let td1 = document.createElement("td");
      td1.style.border = "1px solid grey";
      td1.innerHTML = `<pre>${obj[key]}</pre>`;
      tr1.appendChild(td1);
    }
    tbody.appendChild(tr1);
  });
  resultTable.appendChild(tbody);

  // For error table
  if (manErrorArr.length > 0) {
    errorDiv.classList.remove("d-none");
  }
  let theadErr = document.createElement("thead");
  theadErr.classList.add("bg-secondary", "text-white");
  theadErr.classList.add("text-center");
  theadErr.innerHTML = "<tr><th><h6>No</h6></th><th><h6>Data</h6></th></tr>";
  errorTable.appendChild(theadErr);

  let tbodyErr = document.createElement("tbody");
  var noErr = 0;
  manErrorArr.forEach((data) => {
    noErr++;
    let trErr = document.createElement("tr");
    trErr.innerHTML = `<td>${noErr}</td><td><pre>${data}</pre></td>`;
    tbodyErr.appendChild(trErr);
  });
  errorTable.appendChild(tbodyErr);
}

function errorCheck(file) {
  var error = false;
  // check for file type
  if (file.type !== "") {
    alertDiv.appendChild(alertBox_filetype);
    error = true;
  }

  // check for settlement file or not
  let filename = file.name;
  if (filename.toLowerCase().search("onc") == -1) {
    alertDiv.appendChild(alertBox_filename);
    error = true;
  }
  return error;
}

function getAlertError(text) {
  let myAlert = document.createElement("div");
  myAlert.classList.add("alert", "text-white", "bg-danger");
  let textNode = document.createTextNode(text);
  myAlert.appendChild(textNode);
  return myAlert;
}

function getAlertSuccess(text) {
  let myAlert = document.createElement("div");
  myAlert.classList.add("alert", "text-white", "bg-success");
  let textNode = document.createTextNode(text);
  myAlert.appendChild(textNode);
  return myAlert;
}

function getAlertWarning(text) {
  let myAlert = document.createElement("div");
  myAlert.classList.add("alert", "text-white", "bg-secondary");
  let textNode = document.createTextNode(text);
  myAlert.appendChild(textNode);
  return myAlert;
}
