/**
 * Googleフォーム連携用のスクリプト
 * Googleフォームの実際のフィールドIDを調査して設定するための補助関数
 */

/**
 * Googleフォームの実際のフィールドIDを取得する方法
 * 
 * 1. Googleフォームのページを開く
 * 2. ブラウザの開発者ツール（F12または右クリック→検証）を開く
 * 3. HTMLを調査して各入力フィールドの「name」属性を確認する
 *    例: <input type="text" name="entry.12345678">
 * 4. 「entry.数字」の部分がフィールドIDになる
 */

// 実際のGoogleフォームIDを設定
const GOOGLE_FORM_SETTINGS = {
  // Googleフォームの送信先URL
  // 「フォームの送信」→「送信」ボタンのある場所のURLまたはフォームのactionプロパティから取得
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScmVTZnb4pzlqhB-e39CWZkEeuBx1sj392AzGjkLQyXS3TuyA/formResponse',
  
  // 各フィールドのIDマッピング
  // 以下は仮のIDです。実際のフォームのIDに置き換えてください
  fields: {
    name: 'entry.2005620554',      // お名前フィールドのID
    nameKana: 'entry.1116858980',   // お名前(カナ)フィールドのID
    email: 'entry.1045781291',     // メールアドレスフィールドのID
    phone: 'entry.1794284292',     // 電話番号フィールドのID
    inquiryType: 'entry.1802838368', // お問い合わせ種別フィールドのID
    message: 'entry.839337160'    // お問い合わせ内容フィールドのID
  }
};

/**
 * Googleフォームに送信する関数
 * @param {Object} formData - フォームデータのオブジェクト
 * @return {Promise} 送信結果のPromise
 */
function sendToGoogleForm(formData) {
  return new Promise((resolve, reject) => {
    // Google FormsはCORSを許可していないため、iframeを使用した擬似的なフォーム送信を行います
    const form = document.getElementById('google-form');
    const iframe = document.getElementById('google-form-iframe');
    
    // フォームのURLを設定
    form.action = GOOGLE_FORM_SETTINGS.formUrl;
    form.method = 'POST';
    
    // 既存の入力フィールドをクリア
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
    
    // フォームデータをhidden inputとして追加
    Object.keys(formData).forEach(key => {
      if (GOOGLE_FORM_SETTINGS.fields[key]) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = GOOGLE_FORM_SETTINGS.fields[key];
        input.value = formData[key];
        form.appendChild(input);
      }
    });
    
    // iframeのload処理でフォーム送信完了を検知
    iframe.onload = function() {
      // 最初のロード時はスキップ（初期表示時にもonloadが発火するため）
      if (!iframe.firstLoad) {
        iframe.firstLoad = true;
        return;
      }
      
      // 送信完了
      resolve({
        success: true,
        message: 'フォームが正常に送信されました'
      });
    };
    
    // エラー処理
    iframe.onerror = function() {
      reject({
        success: false,
        message: 'フォームの送信に失敗しました'
      });
    };
    
    // フォームを送信
    form.submit();
  });
}

/**
 * フォームからデータを収集する関数
 * @return {Object} フォームデータのオブジェクト
 */
function collectFormData() {
  return {
    name: document.getElementById('name').value,
    nameKana: document.getElementById('name-kana').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value || '',
    inquiryType: document.getElementById('inquiry-type').value,
    message: document.getElementById('message').value
  };
}

/**
 * フォーム送信の実行関数
 * メイン処理から呼び出される
 */
async function executeFormSubmission() {
  // ローディング表示を開始
  document.getElementById('form-loading').classList.add('active');
  
  try {
    // フォームデータを収集
    const formData = collectFormData();
    
    // Googleフォームに送信
    await sendToGoogleForm(formData);
    
    // 送信完了画面へ切り替え
    document.getElementById('form-confirm-section').classList.remove('active');
    document.getElementById('form-complete-section').classList.add('active');
    
    // スクロールをトップに戻す
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    // エラー処理
    console.error('フォーム送信エラー:', error);
    alert('送信中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
  } finally {
    // ローディング表示を終了
    document.getElementById('form-loading').classList.remove('active');
  }
}

// フォームIDを取得するヘルパー関数（開発用）
function getGoogleFormIds() {
  console.log('Google Form IDs Helper:');
  console.log('-----------------------');
  console.log('このスクリプトは開発用です。実際のGoogleフォームのフィールドIDを取得する手順:');
  console.log('1. Googleフォームのページを開く');
  console.log('2. ブラウザの開発者ツール（F12）を開く');
  console.log('3. HTMLソースで各入力フィールドの「name」属性を探す（entry.数字の形式）');
  console.log('4. 見つけたIDをGOOGLE_FORM_SETTINGSのfieldsオブジェクトに設定する');
}

// 開発環境で使用する場合にコメントを外す
// getGoogleFormIds();