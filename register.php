<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
    <style>
        body{
            background-color: #1c1c1c;
            color: white;
        }
    </style>
</head>
<body>
    <?php 
        require "db.php";
        if(isset($_POST["user"])
            &&
            isset($_POST["j1"])
            &&
            isset($_POST["j2"])
            ){
                /*
                    TODO:
                    j1 = j2 check
                    szebb code
                    sikeres reg rendes check!!
                */
                $sql = "SELECT username FROM user WHERE username = ?";
                $stmt = mysqli_prepare($conn, $sql);
                $stmt->bind_param("s", $_POST["user"]);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                $result = $result->fetch_assoc();
        
                if(isset($result)){
                    echo("Van már ilyen felhasználó");
                }else{
                    $sql2 = 'INSERT INTO `user` ( `username`, `password_hash`) VALUES (?,?)';
                    $stmt = mysqli_prepare($conn, $sql2);
                    $hashed = password_hash($_POST['j1'], PASSWORD_DEFAULT);
                    $stmt->bind_param('ss', $_POST['user'],$hashed);
                    $stmt->execute();
                    echo("Sikeres regisztráció");
                }
            }
    ?>
    <form action="register.php" method="post">
        <input type="text" name="user">
        <input type="text" name="j1">
        <input type="text" name="j2">
        <button type="submit">Regisztráció</button>
    </form>
    
</body>
</html>