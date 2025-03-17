// モーダルレイアウトの調整関数
window.fixModalLayout = function() {
  const modal = document.getElementById('concert-modal');
  if (!modal) return;
  
  const modalContent = modal.querySelector('.modal-content');
  const mapContainer = modal.querySelector('#modal-map-container');
  const mobileCloseBtn = modal.querySelector('.mobile-close-button');
  
  if (modalContent && mapContainer && mobileCloseBtn && window.innerWidth <= 768) {
    // モバイル表示時のみ適用
    modalContent.style.paddingBottom = '80px';
    mapContainer.style.marginBottom = '70px';
    
    // マップリンクの位置調整
    const mapLink = mapContainer.querySelector('a[href*="google.com/maps"]');
    if (mapLink) {
      mapLink.style.marginBottom = '70px';
      mapLink.style.display = 'inline-block';
      mapLink.style.width = '80%';
      mapLink.style.textAlign = 'center';
    }
  }
};

// コンサートモーダルの機能強化
document.addEventListener('DOMContentLoaded', function() {
  // コンサートページのみで実行
  if (!document.querySelector('.concert-item')) return;
  
  // モーダルが開かれた時の処理を拡張
  const originalOpenConcertModal = window.openConcertModal;
  if (typeof originalOpenConcertModal === 'function') {
    window.openConcertModal = function(concertItem) {
      // 元の関数を呼び出し
      originalOpenConcertModal(concertItem);
      
      // モーダルの調整を追加
      setTimeout(adjustModalLayout, 100);
    };
  }
  
  // モーダルレイアウトの調整
  function adjustModalLayout() {
    const modal = document.getElementById('concert-modal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    const mapContainer = document.getElementById('modal-map-container');
    const mobileCloseBtn = modal.querySelector('.mobile-close-button');
    
    // モバイル表示時の調整
    if (window.innerWidth <= 768) {
      // マップコンテナに余白を追加
      if (mapContainer) {
        mapContainer.style.marginBottom = '70px';
      }
      
      // Google マップリンクの表示を調整
      const mapLink = document.querySelector('#modal-map a[href*="google.com/maps"]');
      if (mapLink) {
        mapLink.style.display = 'inline-block';
        mapLink.style.marginBottom = '70px';
        mapLink.style.marginTop = '10px';
        mapLink.style.width = '80%';
        mapLink.style.padding = '10px 0';
        mapLink.style.textAlign = 'center';
      }
      
      // モバイル用閉じるボタンを強調
      if (mobileCloseBtn) {
        mobileCloseBtn.style.position = 'fixed';
        mobileCloseBtn.style.bottom = '20px';
        mobileCloseBtn.style.left = '50%';
        mobileCloseBtn.style.transform = 'translateX(-50%)';
        mobileCloseBtn.style.zIndex = '9999';
        mobileCloseBtn.style.display = 'block';
        mobileCloseBtn.style.width = 'auto';
        mobileCloseBtn.style.minWidth = '120px';
        mobileCloseBtn.style.opacity = '1';
      }
    }
  }
  
  // カレンダーに追加ボタンと共有ボタンのモバイルレイアウト調整
  function adjustButtonLayout() {
    const concertActionsContainers = document.querySelectorAll('.concert-actions-container');
    
    if (window.innerWidth <= 768) {
      concertActionsContainers.forEach(container => {
        // フレックス方向を縦に変更
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        
        // シェアボタン
        const shareSection = container.querySelector('.share-concert');
        if (shareSection) {
          shareSection.style.marginBottom = '15px';
          shareSection.style.width = '100%';
          shareSection.style.justifyContent = 'center';
        }
        
        // カレンダーボタン
        const calendarButton = container.querySelector('.calendar-button');
        if (calendarButton) {
          calendarButton.style.width = '100%';
          calendarButton.style.marginLeft = '0';
          calendarButton.style.textAlign = 'center';
          calendarButton.style.boxSizing = 'border-box';
        }
      });
    }
  }
  
  // レッスンとコンタクトページのメールを送るボタン調整
  function adjustMailButtons() {
    const emailButtons = document.querySelectorAll('.email-button, a[href^="mailto"]');
    
    if (window.innerWidth <= 768) {
      emailButtons.forEach(button => {
        button.style.width = '100%';
        button.style.boxSizing = 'border-box';
        button.style.textAlign = 'center';
      });
    }
  }
  
  // リサイズ時にも調整を適用
  window.addEventListener('resize', function() {
    adjustButtonLayout();
    adjustMailButtons();
    
    // モーダルが表示されている場合は調整
    const modal = document.getElementById('concert-modal');
    if (modal && modal.classList.contains('show')) {
      adjustModalLayout();
    }
  });
  
  // 初期表示時に調整を適用
  adjustButtonLayout();
  adjustMailButtons();
  
  // ページロード時とリサイズ時に実行
  document.addEventListener('DOMContentLoaded', window.fixModalLayout);
  window.addEventListener('resize', window.fixModalLayout);

  // モーダルが開かれる時にも実行
  document.addEventListener('click', function(e) {
    if (e.target.closest('.concert-item')) {
      // 少し遅延させて実行（モーダルが開かれた後）
      setTimeout(window.fixModalLayout, 300);
    }
  });
  
  // モーダル内の地図リンクを調整するための監視
  const modalObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // 新しい要素が追加された場合、地図リンクをチェック
        const mapLinks = document.querySelectorAll('#modal-map a[href*="google.com/maps"]');
        if (mapLinks.length > 0) {
          adjustModalLayout();
        }
      }
    });
  });
  
  // body要素の変更を監視
  modalObserver.observe(document.body, { childList: true, subtree: true });
});