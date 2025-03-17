// シェアボタンの表示を修正するスクリプト
document.addEventListener('DOMContentLoaded', function() {
    // メールボタンを修正する関数
    function fixShareButtons() {
      // シェア関連の要素を取得
      const shareContainers = document.querySelectorAll('.share-concert');
      const emailButtons = document.querySelectorAll('a.email, .share-button.email');
      const twitterButtons = document.querySelectorAll('a.twitter, .share-button.twitter');
      const facebookButtons = document.querySelectorAll('a.facebook, .share-button.facebook');
      
      // シェアコンテナの調整
      shareContainers.forEach(container => {
        // 既存のスタイルを削除してクリーンな状態にする
        container.removeAttribute('style');
        
        // 新しいスタイルを適用
        container.style.cssText = 
          'display: flex !important;' +
          'flex-direction: row !important;' + 
          'align-items: center !important;' +
          'justify-content: center !important;' +
          'flex-wrap: nowrap !important;' +
          'width: 100% !important;' + 
          'margin: 15px auto !important;' +
          'gap: 10px !important;';
          
        // コンテナ内の要素を再配置
        const span = container.querySelector('span');
        if (span) {
          span.style.marginRight = '5px';
        }
        
        // すべてのボタンを取得
        const buttons = container.querySelectorAll('a.share-button, a.twitter, a.facebook, a.email');
        
        // ボタンを一旦配列に入れて削除
        const buttonsArray = Array.from(buttons);
        buttonsArray.forEach(button => button.remove());
        
        // シェアのテキスト要素も一旦削除
        if (span) span.remove();
        
        // 順番に要素を追加し直す
        if (span) container.appendChild(span);
        
        // ボタンを追加し直す
        buttonsArray.forEach(button => {
          container.appendChild(button);
        });
      });
      
      // ボタンスタイルの共通設定
      const commonButtonStyle = 
        'display: inline-flex !important;' +
        'align-items: center !important;' + 
        'justify-content: center !important;' +
        'width: 40px !important;' +
        'min-width: 40px !important;' +
        'max-width: 40px !important;' +
        'height: 40px !important;' +
        'min-height: 40px !important;' +
        'max-height: 40px !important;' +
        'border-radius: 50% !important;' +
        'padding: 0 !important;' +
        'margin: 0 5px !important;' +
        'overflow: hidden !important;' +
        'flex: 0 0 40px !important;' +
        'background-color: #50031a !important;';
      
      // PCとモバイルでサイズを変更
      const isMobile = window.innerWidth <= 768;
      const buttonSize = isMobile ? '40px' : '32px';
      const iconSize = isMobile ? '24px' : '18px';
      
      // メールボタンの修正
      emailButtons.forEach(button => {
        // 既存のスタイルを削除
        button.removeAttribute('style');
        
        // 新しいスタイルを適用
        button.style.cssText = commonButtonStyle;
        button.style.width = buttonSize;
        button.style.height = buttonSize;
        button.style.minWidth = buttonSize;
        button.style.minHeight = buttonSize;
        button.style.maxWidth = buttonSize;
        button.style.maxHeight = buttonSize;
        button.style.flex = `0 0 ${buttonSize}`;
        
        // SVGのサイズ調整
        const svg = button.querySelector('svg');
        if (svg) {
          svg.style.width = iconSize;
          svg.style.height = iconSize;
          svg.style.maxWidth = iconSize;
          svg.style.maxHeight = iconSize;
          svg.style.margin = '0';
          svg.style.position = 'absolute';
          svg.style.top = '50%';
          svg.style.left = '50%';
          svg.style.transform = 'translate(-50%, -50%)';
        }
      });
      
      // TwitterとFacebookボタンの修正
      const otherButtons = [...twitterButtons, ...facebookButtons];
      otherButtons.forEach(button => {
        button.style.cssText = commonButtonStyle;
        button.style.width = buttonSize;
        button.style.height = buttonSize;
        button.style.minWidth = buttonSize;
        button.style.minHeight = buttonSize;
        button.style.maxWidth = buttonSize;
        button.style.maxHeight = buttonSize;
        button.style.flex = `0 0 ${buttonSize}`;
        
        const svg = button.querySelector('svg');
        if (svg) {
          svg.style.width = iconSize;
          svg.style.height = iconSize;
        }
      });
    }
    
    // ページ読み込み時に実行
    fixShareButtons();
    
    // ウィンドウのリサイズ時にも実行
    window.addEventListener('resize', fixShareButtons);
    
    // モーダルの表示時にも実行
    const observeModalChanges = function() {
      const modal = document.getElementById('concert-modal');
      if (!modal) return;
      
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'class' && modal.classList.contains('show')) {
            // モーダルが表示されたときにシェアボタンを修正
            setTimeout(fixShareButtons, 100);
          }
        });
      });
      
      observer.observe(modal, { attributes: true });
    };
    
    // モーダルの監視開始
    observeModalChanges();
    
    // DOM変更を監視
    const bodyObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // 新しい要素が追加されたら修正関数を実行
          setTimeout(fixShareButtons, 200);
        }
      });
    });
    
    // Body全体の変更を監視
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    
    // クリックイベントでも実行（モーダル表示時など）
    document.addEventListener('click', function(e) {
      if (e.target.closest('.concert-item') || 
          e.target.closest('#concert-modal') ||
          e.target.closest('.share-concert')) {
        setTimeout(fixShareButtons, 300);
      }
    });
  });