// 最終修正版お問い合わせフォームの JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Contact form script loaded');
  
  // お問い合わせページのみで実行
  if (!document.getElementById('custom-contact-form')) {
      console.log('Contact form not found');
      return;
  }
  
  // 重複実行防止フラグ
  if (window.contactFormInitialized) {
      console.log('Contact form already initialized');
      return;
  }
  window.contactFormInitialized = true;
  
  // DOM要素の取得
  const formInputSection = document.getElementById('form-input-section');
  const formConfirmSection = document.getElementById('form-confirm-section');
  const formCompleteSection = document.getElementById('form-complete-section');
  const formLoading = document.getElementById('form-loading');
  
  const customForm = document.getElementById('custom-contact-form');
  
  const checkFormBtn = document.getElementById('check-form-btn');
  const backToInputBtn = document.getElementById('back-to-input-btn');
  const sendFormBtn = document.getElementById('send-form-btn');
  
  // 必要な要素が存在するかチェック
  if (!formInputSection || !formConfirmSection || !formCompleteSection || !customForm) {
      console.error('Required form elements not found');
      return;
  }
  
  // 送信中フラグ（重複送信防止）
  let isSubmitting = false;
  
  // Google フォームの設定
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScmVTZnb4pzlqhB-e39CWZkEeuBx1sj392AzGjkLQyXS3TuyA/formResponse';
  
  // Google フォームのフィールド ID
  const GOOGLE_FORM_FIELD_IDS = {
      name: 'entry.2005620554',
      nameKana: 'entry.1116858980',
      email: 'entry.1045781291',
      phone: 'entry.1794284292',
      inquiryType: 'entry.839337160',
      message: 'entry.1802838368'
  };
  
  // セッションストレージから送信完了状態を確認
  if (sessionStorage.getItem('formSubmitted') === 'true') {
      formInputSection.classList.remove('active');
      formConfirmSection.classList.remove('active');
      formCompleteSection.classList.add('active');
      updateFormSteps(3);
      sessionStorage.removeItem('formSubmitted');
  }
  
  // フォームステップの管理関数
  function updateFormSteps(step) {
      const steps = document.querySelectorAll('.step');
      steps.forEach(el => {
          el.classList.remove('active');
          el.classList.remove('completed');
      });
      
      for (let i = 0; i < steps.length; i++) {
          const currentStep = steps[i];
          const stepNumber = parseInt(currentStep.getAttribute('data-step'));
          
          if (stepNumber < step) {
              currentStep.classList.add('completed');
          } else if (stepNumber === step) {
              currentStep.classList.add('active');
          }
      }
  }
  
  // フォームの検証関数
  function validateForm() {
      let isValid = true;
      console.log('Validating form...');
      
      // エラーメッセージをリセット
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(error => {
          error.style.display = 'none';
          if (error.parentElement) {
              error.parentElement.classList.remove('has-error');
          }
      });
      
      // 各フィールドの検証
      const validations = [
          {
              id: 'name',
              errorId: 'name-error',
              message: 'お名前を入力してください',
              validate: (value) => value.trim() !== ''
          },
          {
              id: 'name-kana',
              errorId: 'name-kana-error',
              message: 'お名前(カナ)をカタカナで入力してください',
              validate: (value) => {
                  if (!value.trim()) return false;
                  const kanaPattern = /^[\u30A0-\u30FF\u3000\s]+$/;
                  return kanaPattern.test(value);
              }
          },
          {
              id: 'email',
              errorId: 'email-error',
              message: '有効なメールアドレスを入力してください',
              validate: (value) => {
                  if (!value.trim()) return false;
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return emailPattern.test(value);
              }
          },
          {
              id: 'phone',
              errorId: 'phone-error',
              message: '有効な電話番号を入力してください',
              validate: (value) => {
                  // 電話番号は任意なので、空の場合はOK
                  if (!value.trim()) return true;
                  const phonePattern = /^[0-9-+\s()]+$/;
                  return phonePattern.test(value);
              }
          },
          {
              id: 'inquiry-type',
              errorId: 'inquiry-type-error',
              message: 'お問い合わせ種別を選択してください',
              validate: (value) => value !== '' && value !== null
          },
          {
              id: 'message',
              errorId: 'message-error',
              message: 'お問い合わせ内容を入力してください',
              validate: (value) => value.trim() !== ''
          }
      ];
      
      validations.forEach(validation => {
          const input = document.getElementById(validation.id);
          if (input && !validation.validate(input.value)) {
              showError(input, validation.errorId, validation.message);
              isValid = false;
          }
      });
      
      // プライバシーポリシー同意の検証
      const privacyPolicyInput = document.getElementById('privacy-policy');
      if (privacyPolicyInput && !privacyPolicyInput.checked) {
          showError(privacyPolicyInput, 'privacy-policy-error', 'プライバシーポリシーに同意してください');
          isValid = false;
      }
      
      console.log('Form validation result:', isValid);
      return isValid;
  }
  
  // エラーの表示
  function showError(input, errorId, message) {
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
          errorElement.textContent = message;
          errorElement.style.display = 'block';
      }
      
      if (input.parentElement) {
          input.parentElement.classList.add('has-error');
      }
      
      // 最初のエラーにスクロール
      setTimeout(() => {
          const firstError = document.querySelector('.has-error input, .has-error select, .has-error textarea');
          if (firstError) {
              firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      }, 100);
  }
  
  // 確認画面にデータを表示
  function showConfirmScreen() {
      console.log('Showing confirm screen...');
      
      // フォームの内容を確認画面にセット
      const confirmElements = {
          'confirm-name': document.getElementById('name').value,
          'confirm-name-kana': document.getElementById('name-kana').value,
          'confirm-email': document.getElementById('email').value,
          'confirm-phone': document.getElementById('phone').value.trim() || '未入力',
          'confirm-inquiry-type': document.getElementById('inquiry-type').options[document.getElementById('inquiry-type').selectedIndex].text,
          'confirm-message': document.getElementById('message').value
      };
      
      Object.keys(confirmElements).forEach(id => {
          const element = document.getElementById(id);
          if (element) {
              element.textContent = confirmElements[id];
          }
      });
      
      // セクションの切り替え
      formInputSection.classList.remove('active');
      formConfirmSection.classList.add('active');
      
      updateFormSteps(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Google フォームにデータを送信
  function submitDirectToGoogleForm() {
      // 重複送信防止
      if (isSubmitting) {
          console.log('Form is already being submitted');
          return;
      }
      
      isSubmitting = true;
      console.log('Submitting form to Google...');
      
      // ローディング表示
      if (formLoading) {
          formLoading.classList.add('active');
      }
      
      // 送信ボタンを無効化
      if (sendFormBtn) {
          sendFormBtn.disabled = true;
          sendFormBtn.textContent = '送信中...';
      }
      
      try {
          // フォームデータを収集
          const formData = new FormData();
          
          // 電話番号の処理を改善（空の場合は空文字を送信）
          const phoneValue = document.getElementById('phone').value.trim();
          formData.append(GOOGLE_FORM_FIELD_IDS.phone, phoneValue); // 空文字でもOK
          
          // 各フィールドを追加
          formData.append(GOOGLE_FORM_FIELD_IDS.name, document.getElementById('name').value.trim());
          formData.append(GOOGLE_FORM_FIELD_IDS.nameKana, document.getElementById('name-kana').value.trim());
          formData.append(GOOGLE_FORM_FIELD_IDS.email, document.getElementById('email').value.trim());
          formData.append(GOOGLE_FORM_FIELD_IDS.phone, phoneValue); // 空文字でもOK
          formData.append(GOOGLE_FORM_FIELD_IDS.inquiryType, document.getElementById('inquiry-type').value);
          formData.append(GOOGLE_FORM_FIELD_IDS.message, document.getElementById('message').value.trim());
          
          console.log('Form data prepared:', {
              name: document.getElementById('name').value.trim(),
              nameKana: document.getElementById('name-kana').value.trim(),
              email: document.getElementById('email').value.trim(),
              phone: phoneValue,
              inquiryType: document.getElementById('inquiry-type').value,
              message: document.getElementById('message').value.trim()
          });
          
          // fetchを使用してフォームを送信（タイムアウト設定追加）
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒でタイムアウト
          
          fetch(GOOGLE_FORM_URL, {
              method: 'POST',
              body: formData,
              mode: 'no-cors',
              signal: controller.signal
          })
          .then(() => {
              clearTimeout(timeoutId);
              console.log('Form submitted successfully');
              
              // 送信成功時の処理
              if (formLoading) {
                  formLoading.classList.remove('active');
              }
              formConfirmSection.classList.remove('active');
              formCompleteSection.classList.add('active');
              
              updateFormSteps(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              
              // 送信完了フラグをセッションストレージに保存
              sessionStorage.setItem('formSubmitted', 'true');
              
              // 送信フラグをリセット
              isSubmitting = false;
          })
          .catch(error => {
              clearTimeout(timeoutId);
              console.error('Form submission error:', error);
              
              if (formLoading) {
                  formLoading.classList.remove('active');
              }
              
              // 送信ボタンを元に戻す
              if (sendFormBtn) {
                  sendFormBtn.disabled = false;
                  sendFormBtn.textContent = '送信する';
              }
              
              // 送信フラグをリセット
              isSubmitting = false;
              
              if (error.name === 'AbortError') {
                  alert('送信がタイムアウトしました。しばらく時間をおいて再度お試しください。');
              } else {
                  alert('送信中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
              }
          });
          
      } catch (error) {
          console.error('Form processing error:', error);
          
          if (formLoading) {
              formLoading.classList.remove('active');
          }
          
          // 送信ボタンを元に戻す
          if (sendFormBtn) {
              sendFormBtn.disabled = false;
              sendFormBtn.textContent = '送信する';
          }
          
          // 送信フラグをリセット
          isSubmitting = false;
          
          alert('フォーム処理中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
      }
  }
  
  // イベントリスナーの設定（重複防止）
  
  // 「内容の確認」ボタンのクリックイベント
  if (checkFormBtn) {
      // 既存のイベントリスナーを削除
      checkFormBtn.replaceWith(checkFormBtn.cloneNode(true));
      const newCheckFormBtn = document.getElementById('check-form-btn');
      
      newCheckFormBtn.addEventListener('click', function() {
          console.log('Check form button clicked');
          if (validateForm()) {
              showConfirmScreen();
          }
      });
  }
  
  // 「修正する」ボタンのクリックイベント
  if (backToInputBtn) {
      backToInputBtn.replaceWith(backToInputBtn.cloneNode(true));
      const newBackToInputBtn = document.getElementById('back-to-input-btn');
      
      newBackToInputBtn.addEventListener('click', function() {
          console.log('Back to input button clicked');
          formConfirmSection.classList.remove('active');
          formInputSection.classList.add('active');
          updateFormSteps(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
  
  // 「送信する」ボタンのクリックイベント
  if (sendFormBtn) {
      sendFormBtn.replaceWith(sendFormBtn.cloneNode(true));
      const newSendFormBtn = document.getElementById('send-form-btn');
      
      newSendFormBtn.addEventListener('click', function() {
          console.log('Send form button clicked');
          submitDirectToGoogleForm();
      });
  }
  
  // フォーム入力時のリアルタイムバリデーション
  const formInputs = customForm.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
      input.addEventListener('input', function() {
          // エラー表示をリセット
          const errorId = input.id === 'privacy-policy' ? 'privacy-policy-error' : `${input.id}-error`;
          const errorElement = document.getElementById(errorId);
          if (errorElement) {
              errorElement.style.display = 'none';
          }
          if (input.parentElement) {
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
  
  // URLパラメータからお問い合わせ種別を自動選択
  function setInquiryTypeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const inquiryType = urlParams.get('type');
      
      if (inquiryType === 'lesson') {
          const selectElement = document.getElementById('inquiry-type');
          if (selectElement) {
              for (let i = 0; i < selectElement.options.length; i++) {
                  if (selectElement.options[i].value === 'レッスンについて') {
                      selectElement.selectedIndex = i;
                      break;
                  }
              }
          }
      }
  }
  
  // お問い合わせ種別の自動選択を実行
  setInquiryTypeFromUrl();
  
  console.log('Contact form script initialization completed');
});