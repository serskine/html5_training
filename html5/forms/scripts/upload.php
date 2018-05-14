<html>
    <body>
        Thank you <?php echo $_POST["name"];?><br>
        <br>
        Name: <?php echo $_POST["name"];?><br>
        Email: <?php echo $_POST["email"];?><br>
        Password: <?php echo $_POST["password"];?><br>
        Comments: <?php echo $_POST["comments"];?><br>

        <?php
            if (!empty($_POST["ints"][0])) echo $_POST["ints"][0]." ";
            if (!empty($_POST["ints"][1])) echo $_POST["ints"][1]." ";
            if (!empty($_POST["ints"][2])) echo $_POST["ints"][2]." ";
            if (!empty($_POST["ints"][3])) echo $_POST["ints"][3]." ";
        ?><br>
        Subscribe to newsletter? <?php echo $_POST["subscribe"];?><br>
        Best time to contact me: <?php echo $_POST["time"];?><br>
    </body>
</html>