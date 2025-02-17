<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $kana = $_POST["kana"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>確認画面</title>
</head>
<body>
    <h2>入力内容の確認</h2>
    <form action="send.php" method="POST">
        <p>お名前: <?php echo htmlspecialchars($name); ?></p>
        <p>お名前(カナ): <?php echo htmlspecialchars($kana); ?></p>
        <p>メールアドレス: <?php echo htmlspecialchars($email); ?></p>
        <p>お電話番号: <?php echo htmlspecialchars($phone); ?></p>
        <p>お問い合わせ内容: <?php echo nl2br(htmlspecialchars($message)); ?></p>
        
        <input type="hidden" name="name" value="<?php echo htmlspecialchars($name); ?>">
        <input type="hidden" name="kana" value="<?php echo htmlspecialchars($kana); ?>">
        <input type="hidden" name="email" value="<?php echo htmlspecialchars($email); ?>">
        <input type="hidden" name="phone" value="<?php echo htmlspecialchars($phone); ?>">
        <input type="hidden" name="message" value="<?php echo htmlspecialchars($message); ?>">
        
        <button type="button" onclick="history.back()">戻る</button>
        <button type="submit">送信</button>
    </form>
</body>
</html>
<?php
}
?>
