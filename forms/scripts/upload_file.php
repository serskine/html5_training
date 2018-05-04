<?php
    $ok = move_uploaded_file($_FILES['file']['tmp_name'], './uploads/' . $_FILES['file']['name']);
    // This message is passed to the browser
    echo $_FILES['file']['name']; echo $ok ? " uploaded successfully!" : " upload failed!";
?>