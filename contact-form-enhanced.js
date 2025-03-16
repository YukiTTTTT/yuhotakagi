// お問い合わせフォームの強化
document.addEventListener('DOMContentLoaded', function() {
    // お問い合わせページのみで実行
    if (!document.getElementById('custom-contact-form')) return;
    
    // DOM要素の取得
    const formInputSection = document.getElementById('form-input-section');
    const formConfirmSection = document.getElementById('form-confirm-section');
    const formCompleteSection = document.getElementById('form-complete-section');
    const formLoading = document.getElementById('form-loading');
    
    const customForm = document.getElementById('custom-contact-form');
    
    const checkFormBtn = document.getElementById('check-form-btn');
    const backToInputBtn = document.getElementById('back-to-input-btn');
    const sendFormBtn = document.getElementById('send-form-btn');
    
    // フォームのフィールド
    const formFields = {
        name: document.getElementById('name'),
        nameKana: document.getElementById('name-kana'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        inquiryType: document.getElementById('inquiry-type'),
        message: document.getElementById('message'),
        privacyPolicy: document.getElementById('privacy-policy')
    };
    
    // エラーメッセージの表示エリア
    const errorMessages = {
        name: document.getElementById('name-error'),
        nameKana: document.getElementById('name-kana-error'),
        email: document.getElementById('email-error'),
        phone: document.getElementById('phone-error'),
        inquiryType: document.getElementById('inquiry-type-error'),
        message: document.getElementById('message-error'),
        privacyPolicy: document.getElementById('privacy-policy-error')
    };
    
    // セッションストレージから送信完了状態を確認（ページリロード対策）
    if (sessionStorage.getItem('formSubmitted') === 'true') {
        // 送信完了状態を表示
        formInputSection.classList.remove('active');
        formConfirmSection.classList.remove('active');
        formCompleteSection.classList.add('active');
        updateFormSteps(3); // ステップ3を選択
        // 状態をクリア（次回のために）
        sessionStorage.removeItem('formSubmitted');
    }
    
    // フィールドごとのバリデーションルール
    const validationRules = {
        name: {
            required: true,
            errorMsg: 'お名前を入力してください'
        },
        nameKana: {
            required: true,
            pattern: /^[\u30A0-\u30FF\u3000\s]*$/,
            errorMsg: 'お名前(カナ)をカタカナで入力してください'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMsg: '有効なメールアドレスを入力してください'
        },
        phone: {
            pattern: /^[0-9-+\s]*$/,
            errorMsg: '有効な電話番号を入力してください'
        },
        inquiryType: {
            required: true,
            errorMsg: 'お問い合わせ種別を選択してください'
        },
        message: {
            required: true,
            errorMsg: 'お問い合わせ内容を入力してください'
        },
        privacyPolicy: {
            required: true,
            errorMsg: 'プライバシーポリシーに同意してください'
        }
    };
    
    // フォームステップの管理関数を追加
    function updateFormSteps(step) {
        // すべてのステップリセット
        const steps = document.querySelectorAll('.step');
        steps.forEach(el => {
            el.classList.remove('active');
            el.classList.remove('completed');
        });
        
        // 現在のステップまでをアクティブに
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
    
    // 特定のフィールドのバリデーション
    function validateField(fieldName) {
        const field = formFields[fieldName];
        const errorElement = errorMessages[fieldName];
        const rules = validationRules[fieldName];
        
        let isValid = true;
        let errorMsg = '';
        
        // フィールドが存在するか確認
        if (!field || !errorElement || !rules) return true;
        
        // 必須チェック
        if (rules.required) {
            if (fieldName === 'privacyPolicy') {
                // チェックボックスの場合
                if (!field.checked) {
                    isValid = false;
                    errorMsg = rules.errorMsg;
                }
            } else {
                // 通常のフィールドの場合
                if (!field.value.trim()) {
                    isValid = false;
                    errorMsg = rules.errorMsg;
                }
            }
        }
        
        // パターンチェック
        if (isValid && rules.pattern && field.value.trim()) {
            if (!rules.pattern.test(field.value.trim())) {
                isValid = false;
                errorMsg = rules.errorMsg;
            }
        }
        
        // エラー表示の更新
        if (!isValid) {
            showError(field, errorElement, errorMsg);
        } else {
            hideError(field, errorElement);
        }
        
        return isValid;
    }
    
    // すべてのフィールドのバリデーション
    function validateForm() {
        let isValid = true;
        
        // エラーメッセージをリセット
        for (const fieldName in formFields) {
            hideError(formFields[fieldName], errorMessages[fieldName]);
        }
        
        // すべてのフィールドをバリデーション
        for (const fieldName in formFields) {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // エラーを表示
    function showError(field, errorElement, message) {
        if (!errorElement) return;
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // フィールドのスタイルを変更
        if (field !== formFields.privacyPolicy) {
            field.classList.add('error-field');
        } else {
            field.parentElement.classList.add('error-checkbox');
        }
        
        // アクセシビリティのため、エラーメッセージとフィールドを関連付け
        errorElement.id = errorElement.id || `error-${Math.random().toString(36).substr(2, 9)}`;
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorElement.id);
    }
    
    // エラーを非表示
    function hideError(field, errorElement) {
        if (!errorElement) return;
        
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        
        // フィールドのスタイルを元に戻す
        if (field !== formFields.privacyPolicy) {
            field.classList.remove('error-field');
        } else {
            field.parentElement.classList.remove('error-checkbox');
        }
        
        // アクセシビリティ属性をリセット
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
    }
    
    // 確認画面にデータを表示
    function showConfirmScreen() {
        // フォームの内容を確認画面にセット
        document.getElementById('confirm-name').textContent = formFields.name.value;
        document.getElementById('confirm-name-kana').textContent = formFields.nameKana.value;
        document.getElementById('confirm-email').textContent = formFields.email.value;
        document.getElementById('confirm-phone').textContent = formFields.phone.value || '未入力';
        
        const inquiryTypeSelect = formFields.inquiryType;
        const selectedOption = inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex];
        document.getElementById('confirm-inquiry-type').textContent = selectedOption ? selectedOption.textContent : '';
        
        document.getElementById('confirm-message').textContent = formFields.message.value;
        
        // セクションの切り替え
        formInputSection.classList.remove('active');
        formConfirmSection.classList.add('active');
        
        // ステップ表示を更新
        updateFormSteps(2);
        
        // スクロールをトップに戻す
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Google フォームにデータを送信
    function submitDirectToGoogleForm() {
        // ローディング表示
        formLoading.classList.add('active');
        
        try {
            // フォームデータを収集
            const formData = new FormData();
            
            // Google フォームのフィールド ID
            const GOOGLE_FORM_FIELD_IDS = {
                name: 'entry.2005620554',
                nameKana: 'entry.1116858980',
                email: 'entry.1045781291',
                phone: 'entry.1794284292',
                inquiryType: 'entry.839337160',
                message: 'entry.1802838368'
            };
            
            // Google フォームのURL
            const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScmVTZnb4pzlqhB-e39CWZkEeuBx1sj392AzGjkLQyXS3TuyA/formResponse';
            
            // 各フィールドを追加
            formData.append(GOOGLE_FORM_FIELD_IDS.name, formFields.name.value);
            formData.append(GOOGLE_FORM_FIELD_IDS.nameKana, formFields.nameKana.value);
            formData.append(GOOGLE_FORM_FIELD_IDS.email, formFields.email.value);
            formData.append(GOOGLE_FORM_FIELD_IDS.phone, formFields.phone.value || '');
            formData.append(GOOGLE_FORM_FIELD_IDS.inquiryType, formFields.inquiryType.value);
            formData.append(GOOGLE_FORM_FIELD_IDS.message, formFields.message.value);
            
            // fetchを使用してバックグラウンドでフォームを送信
            fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // CORSエラーを回避するために必要
            })
            .then(() => {
                // 送信成功時の処理
                formLoading.classList.remove('active');
                formConfirmSection.classList.remove('active');
                formCompleteSection.classList.add('active');
                
                // ステップ表示を更新
                updateFormSteps(3);
                
                // スクロールをトップに戻す
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // 送信完了フラグをセッションストレージに保存
                sessionStorage.setItem('formSubmitted', 'true');
            })
            .catch(error => {
                // エラー処理
                console.error('Form submission error:', error);
                formLoading.classList.remove('active');
                
                // エラーメッセージを表示
                showSubmissionError();
            });
            
        } catch (error) {
            console.error('Form processing error:', error);
            formLoading.classList.remove('active');
            
            // エラーメッセージを表示
            showSubmissionError();
        }
    }
    
    // 送信エラー時のメッセージ表示
    function showSubmissionError() {
        // エラーメッセージの要素を作成
        const errorDiv = document.createElement('div');
        errorDiv.className = 'submission-error';
        errorDiv.innerHTML = `
            <p><strong>送信中にエラーが発生しました。</strong></p>
            <p>お手数ですが、しばらく時間をおいて再度お試しいただくか、メールでのお問い合わせをご利用ください。</p>
            <button class="retry-button">再試行</button>
        `;
        
        // フォーム確認セクションにエラーメッセージを追加
        formConfirmSection.appendChild(errorDiv);
        
        // 再試行ボタンのクリックイベント
        const retryButton = errorDiv.querySelector('.retry-button');
        retryButton.addEventListener('click', function() {
            // エラーメッセージを削除
            errorDiv.remove();
            // フォーム送信を再試行
            submitDirectToGoogleForm();
        });
    }
    
    // リアルタイムバリデーションの設定
    for (const fieldName in formFields) {
        const field = formFields[fieldName];
        if (!field) continue;
        
        // 入力フィールドの変更イベント
        if (field === formFields.privacyPolicy) {
            // チェックボックスの場合は変更イベント
            field.addEventListener('change', function() {
                validateField(fieldName);
            });
        } else {
            // 通常のフィールドの場合は入力イベント
            field.addEventListener('input', function() {
                validateField(fieldName);
            });
            
            // フォーカスアウト時にもバリデーション
            field.addEventListener('blur', function() {
                validateField(fieldName);
            });
        }
    }
    
    // フォーカスフィードバックの強化
    for (const fieldName in formFields) {
        const field = formFields[fieldName];
        if (!field || field === formFields.privacyPolicy) continue;
        
        // フォーカス時のビジュアルフィードバック
        field.addEventListener('focus', function() {
            this.classList.add('field-focused');
        });
        
        // フォーカスアウト時のビジュアルフィードバック
        field.addEventListener('blur', function() {
            this.classList.remove('field-focused');
        });
    }
    
    // 「内容の確認」ボタンのクリックイベント
    checkFormBtn.addEventListener('click', function() {
        if (validateForm()) {
            showConfirmScreen();
        } else {
            // エラーがある場合、最初のエラーフィールドまでスクロール
            const firstErrorField = document.querySelector('.error-field, .error-checkbox');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // 「修正する」ボタンのクリックイベント
    backToInputBtn.addEventListener('click', function() {
        formConfirmSection.classList.remove('active');
        formInputSection.classList.add('active');
        
        // ステップ表示を更新
        updateFormSteps(1);
        
        // スクロールをトップに戻す
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 「送信する」ボタンのクリックイベント
    sendFormBtn.addEventListener('click', function() {
        // 送信ボタンの無効化（二重送信防止）
        this.disabled = true;
        this.textContent = '送信中...';
        
        // フォーム送信
        submitDirectToGoogleForm();
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
        // URLからパラメータを取得
        const urlParams = new URLSearchParams(window.location.search);
        const inquiryType = urlParams.get('type');
        
        // レッスン申し込みの場合、種別を自動選択
        if (inquiryType === 'lesson') {
            const selectElement = formFields.inquiryType;
            if (selectElement) {
                // 「レッスンについて」のオプションを選択
                for (let i = 0; i < selectElement.options.length; i++) {
                    if (selectElement.options[i].value === 'レッスンについて') {
                        selectElement.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    }
    
    // URLパラメータからのお問い合わせ種別設定を実行
    setInquiryTypeFromUrl();
});