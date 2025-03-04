<?php
// エラーレポート（開発時のみ有効、本番環境ではコメントアウト推奨）
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS設定 - 必要に応じて '*' を実際のドメインに変更
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// リクエストデータの取得
$formData = $_POST;

// デバッグ用（開発時のみ使用、本番環境では削除）
// file_put_contents('form_log.txt', print_r($formData, true), FILE_APPEND);

// Google フォームのURL - 必ず「formResponse」を含むURLを使用
$url = 'https://docs.google.com/forms/d/e/1FAIpQLScmVTZnb4pzlqhB-e39CWZkEeuBx1sj392AzGjkLQyXS3TuyA/formResponse';

// cURLを使用してGoogleフォームに送信
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // SSL証明書の検証をスキップ
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

// 送信実行
$response = curl_exec($ch);
$error = curl_error($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// レスポンス
header('Content-Type: application/json');
echo json_encode([
    'success' => ($status == 200 || $status == 302), // 302はリダイレクトコード
    'status' => $status,
    'error' => $error
]);