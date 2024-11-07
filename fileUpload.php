<?php
require_once "header.php";

?>

<div id="preloader" class="preloader d-flex justify-content-center align-items-center d-none">
    <div>
        <h3>Loading....</h3>
        <div class="row">
            <div class="spinner-grow spinner-md text-primary mx-auto" style="width:3rem; height:3rem;" role="status">
            </div>
        </div>
    </div>
</div>
<div id="alertDiv2" class="px-3 pt-3"></div>
<main class="my-5" id="formDiv">
    <div class="container col-lg-6 col-md-10 col-12">
        <div class="card">
            <div class="card-header">
                Upload File
            </div>
            <div class="card-body">
                <div id="alertDiv"></div>
                <form method="post" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="boxFile" class="form-label">File</label>
                        <input type="file" name="boxFile" id="boxFile" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <input type="reset" id="btnCancel" value="Cancel"
                            class="btn btn-primary col-lg-2 col-md-3 col-12 d-block ms-auto d-none">
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
<button style="position: fixed; bottom:10px; right:20px; display:none; color:white; background-color:blue;"
    id="btnUptoTop">Up to Top</button>
<main class="" id="resultDiv">
    <div class="container-fluid col-12">
        <div class="card">
            <div class="card-header bg-dark d-flex justify-content-between">
                <button class="btn btn-secondary" id="btnReset">Reset</button>
                <p class="text-white">Detected Data! Check again and make sure before you upload to the database!</p>
                <button class="btn btn-primary" id="btnUpload">Upload</button>
            </div>
            <div class="card-body p-0 m-0">
                <div class="table-responsive">
                    <table class="table" id="resultTable">

                    </table>
                </div>
            </div>
        </div>
    </div>
</main>

<main class="mt-3" id="errorDiv">
    <div class="container-fluid col-12">
        <div class="card">
            <div class="card-header bg-secondary d-flex justify-content-between">
                <span></span>
                <p class="text-white">These rows are invalid!</p>
                <span></span>
            </div>
            <div class="card-body p-0 m-0">
                <div class="table-responsive">
                    <table class="table" id="errorTable">

                    </table>
                </div>
            </div>
        </div>
    </div>
</main>

<script src="js/fu.js" type="module"></script>


<?php
require_once "footer.php";
?>