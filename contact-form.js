// お問い合わせフォームの JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const formInputSection = document.getElementById('form-input-section');
    const formConfirmSection = document.getElementById('form-confirm-section');
    const formCompleteSection = document.getElementById('form-complete-section');
    const formLoading = document.getElementById('form-loading');
    
    const customForm = document.getElementById('custom-contact-form');
    const googleForm = document.getElementById('google-form');
    
    const checkFormBtn = document.getElementById('check-form-btn');
    const backToInputBtn = document.getElementById('back-to-input-btn');
    const sendFormBtn = document.getElementById('send-form-btn');
    
    // Google フォームのフィールド ID
    const GOOGLE_FORM_FIELD_IDS = {
      name: 'entry.2005620554',
      nameKana: 'entry.1116858980',
      email: 'entry.1045781291',
      phone: 'entry.1794284292',
      inquiryType: 'entry.1802838368',
      message: 'entry.839337160'
    };
    
    // Google フォームの URL
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScmVTZnb4pzlqhB-e39CWZkEeuBx1sj392AzGjkLQyXS3TuyA/formResponse';
    
    // フォームの検証関数
    function validateForm() {
      let isValid = true;
      
      // エラーメッセージをリセット
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(error => {
        error.style.display = 'none';
        error.parentElement.classList.remove('has-error');
      });
      
      // お名前の検証
      const nameInput = document.getElementById('name');
      if (!nameInput.value.trim()) {
        showError(nameInput, 'name-error', 'お名前を入力してください');
        isValid = false;
      }

      // お名前(カナ)の検証
      const nameKanaInput = document.getElementById('name-kana');
      if (!nameKanaInput.value.trim()) {
        showError(nameKanaInput, 'name-kana-error', 'お名前(カナ)を入力してください');
        isValid = false;
      } else {
        // カタカナのみの入力チェック（オプション）
        const kanaPattern = /^[\u30A0-\u30FF\u3000\s]+$/;
        if (!kanaPattern.test(nameKanaInput.value)) {
          showError(nameKanaInput, 'name-kana-error', 'カタカナで入力してください');
          isValid = false;
        }
      }
      
      // メールアドレスの検証
      const emailInput = document.getElementById('email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError(emailInput, 'email-error', 'メールアドレスを入力してください');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, 'email-error', '有効なメールアドレスを入力してください');
        isValid = false;
      }
      
      // 電話番号の検証（入力された場合のみ）
      const phoneInput = document.getElementById('phone');
      if (phoneInput.value.trim()) {
        const phonePattern = /^[0-9-+\s]+$/;
        if (!phonePattern.test(phoneInput.value)) {
          showError(phoneInput, 'phone-error', '有効な電話番号を入力してください');
          isValid = false;
        }
      }
      
      // お問い合わせ種別の検証
      const inquiryTypeInput = document.getElementById('inquiry-type');
      if (!inquiryTypeInput.value) {
        showError(inquiryTypeInput, 'inquiry-type-error', 'お問い合わせ種別を選択してください');
        isValid = false;
      }
      
      // お問い合わせ内容の検証
      const messageInput = document.getElementById('message');
      if (!messageInput.value.trim()) {
        showError(messageInput, 'message-error', 'お問い合わせ内容を入力してください');
        isValid = false;
      }
      
      // プライバシーポリシー同意の検証
      const privacyPolicyInput = document.getElementById('privacy-policy');
      if (!privacyPolicyInput.checked) {
        showError(privacyPolicyInput, 'privacy-policy-error', 'プライバシーポリシーに同意してください');
        isValid = false;
      }
      
      return isValid;
    }
    
    // エラーの表示
    function showError(input, errorId, message) {
      const errorElement = document.getElementById(errorId);
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      input.parentElement.classList.add('has-error');
      
      // エラー要素へスクロール（最初のエラーのみ）
      if (!document.querySelector('.has-error')) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // 確認画面にデータを表示
    function showConfirmScreen() {
      // フォームの内容を確認画面にセット
      document.getElementById('confirm-name').textContent = document.getElementById('name').value;
      document.getElementById('confirm-name-kana').textContent = document.getElementById('name-kana').value;
      document.getElementById('confirm-email').textContent = document.getElementById('email').value;
      document.getElementById('confirm-phone').textContent = document.getElementById('phone').value || '未入力';
      document.getElementById('confirm-inquiry-type').textContent = document.getElementById('inquiry-type').options[document.getElementById('inquiry-type').selectedIndex].text;
      document.getElementById('confirm-message').textContent = document.getElementById('message').value;
      
      // セクションの切り替え
      formInputSection.classList.remove('active');
      formConfirmSection.classList.add('active');
      
      // スクロールをトップに戻す
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Google フォームにデータを送信
    function submitToGoogleForm() {
      // フォームアクションを設定
      googleForm.action = GOOGLE_FORM_URL;
      
      // Google フォームのフィールドにデータをセット - 直接値をセットする方法に変更
      document.getElementById('g-name').value = document.getElementById('name').value;
      document.getElementById('g-name-kana').value = document.getElementById('name-kana').value;
      document.getElementById('g-email').value = document.getElementById('email').value;
      document.getElementById('g-phone').value = document.getElementById('phone').value;
      document.getElementById('g-inquiry-type').value = document.getElementById('inquiry-type').value;
      document.getElementById('g-message').value = document.getElementById('message').value;
      
      // ローディング表示を開始
      formLoading.classList.add('active');
      
      // デバッグ情報を出力
      debugFormSubmission();
      
      // フォームを送信
      try {
        // 実際のフォーム送信を実行
        googleForm.submit();
        
        // iframe のロードイベントを待たずに一定時間後に完了画面を表示
        setTimeout(function() {
          formConfirmSection.classList.remove('active');
          formCompleteSection.classList.add('active');
          formLoading.classList.remove('active');
          
          // スクロールをトップに戻す
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2500); // 時間を延長
      } catch (error) {
        console.error('Form submission error:', error);
        alert('送信中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
        formLoading.classList.remove('active');
      }
    }
    
    // デバッグ用の処理を追加
    function debugFormSubmission() {
      console.log('送信されるデータ:');
      console.log('名前:', document.getElementById('name').value);
      console.log('名前(カナ):', document.getElementById('name-kana').value);
      console.log('メール:', document.getElementById('email').value);
      console.log('電話:', document.getElementById('phone').value);
      console.log('種別:', document.getElementById('inquiry-type').value);
      console.log('内容:', document.getElementById('message').value);
      
      console.log('Google フォーム設定:');
      console.log('URL:', GOOGLE_FORM_URL);
      console.log('フォーム要素:', googleForm);
      console.log('アクション:', googleForm.action);
    }
    
    // イベントリスナーの設定
    
    // 「内容の確認」ボタンのクリックイベント
    checkFormBtn.addEventListener('click', function() {
      if (validateForm()) {
        showConfirmScreen();
      }
    });
    
    // 「修正する」ボタンのクリックイベント
    backToInputBtn.addEventListener('click', function() {
      formConfirmSection.classList.remove('active');
      formInputSection.classList.add('active');
      
      // スクロールをトップに戻す
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 「送信する」ボタンのクリックイベント
    sendFormBtn.addEventListener('click', function() {
      // 直接submitToGoogleFormを呼び出し
      submitToGoogleForm();
    });
    
    // フォーム入力時のリアルタイムバリデーション
    const formInputs = customForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        // エラー表示をリセット
        if (input.id === 'privacy-policy') {
          const errorElement = document.getElementById('privacy-policy-error');
          errorElement.style.display = 'none';
          input.parentElement.parentElement.classList.remove('has-error');
        } else {
          const errorElement = document.getElementById(`${input.id}-error`);
          errorElement.style.display = 'none';
          input.parentElement.classList.remove('has-error');
        }
      });
    });
    
    // エンターキーでのフォーム送信を防止
    customForm.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    });
    
    // Google フォームの iframe ロードイベント
    document.getElementById('google-form-iframe').addEventListener('load', function() {
      console.log('Google form iframe loaded');
      
      // 最初のロード時はスキップ
      if (!this.initialLoad) {
        this.initialLoad = true;
        return;
      }
      
      // 2回目以降のロードはフォーム送信完了と見なす
      console.log('Form submission completed');
      
      // 送信完了画面への切り替え
      formConfirmSection.classList.remove('active');
      formCompleteSection.classList.add('active');
      formLoading.classList.remove('active');
      
      // スクロールをトップに戻す
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });