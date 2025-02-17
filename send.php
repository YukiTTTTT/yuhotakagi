<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "petlianyukitakagi1121@gmail.com";
    $subject = "お問い合わせがありました";
    $message = "お名前: " . $_POST["name"] . "\n"
             . "お名前(カナ): " . $_POST["kana"] . "\n"
             . "メールアドレス: " . $_POST["email"] . "\n"
             . "お電話番号: " . $_POST["phone"] . "\n"
             . "お問い合わせ内容:\n" . $_POST["message"];
    $headers = "From: " . $_POST["email"];

    if (mail($to, $subject, $message, $headers)) {
        echo "お問い合わせが送信されました。ありがとうございます。";
    } else {
        echo "送信に失敗しました。もう一度お試しください。";
    }
}
?>
