// コンサートモーダルの機能強化
document.addEventListener('DOMContentLoaded', function() {
    // コンサートページのみで実行
    if (!document.querySelector('.concert-item')) return;
    
    // PC表示かモバイル表示かを判定
    const isMobile = window.innerWidth <= 768;
    
    // PCでは閉じるボタンを非表示に
    if (!isMobile) {
      const mobileCloseButtons = document.querySelectorAll('.mobile-close-button');
      mobileCloseButtons.forEach(btn => {
        btn.style.display = 'none';
      });
    }
    
    // SNSシェアボタンのレイアウト修正
    function fixShareButtonLayout() {
      const shareContainers = document.querySelectorAll('.share-concert');
      
      if (isMobile) {
        // モバイル表示時のSNSシェアボタン修正
        shareContainers.forEach(container => {
          // レイアウト修正
          container.style.display = 'flex';
          container.style.justifyContent = 'center';
          container.style.width = '100%';
          container.style.margin = '15px 0';
          container.style.flexWrap = 'wrap';
          
          // 「シェア：」テキストとボタンの間隔を調整
          const shareText = container.querySelector('span');
          if (shareText) {
            shareText.style.marginRight = '10px';
          }
          
          // シェアボタン自体の調整
          const shareButtons = container.querySelectorAll('.share-button');
          shareButtons.forEach(button => {
            button.style.width = '40px';
            button.style.height = '40px';
            button.style.margin = '0 5px';
            button.style.display = 'inline-flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
          });
        });
      }
    }
    
    // モーダルレイアウトの調整
    function adjustModalLayout() {
      const modal = document.getElementById('concert-modal');
      if (!modal) return;
      
      const modalContent = modal.querySelector('.modal-content');
      const mapContainer = document.getElementById('modal-map-container');
      const mobileCloseBtn = modal.querySelector('.mobile-close-button');
      
      // PCでは閉じるボタンを非表示
      if (!isMobile) {
        if (mobileCloseBtn) {
          mobileCloseBtn.style.display = 'none';
        }
      } else {
        // モバイル表示時の調整
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
      
      if (isMobile) {
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
      
      if (isMobile) {
        emailButtons.forEach(button => {
          button.style.width = '100%';
          button.style.boxSizing = 'border-box';
          button.style.textAlign = 'center';
        });
      }
    }
    
    // モーダルが開かれた時の処理を拡張
    const originalOpenConcertModal = window.openConcertModal;
    if (typeof originalOpenConcertModal === 'function') {
      window.openConcertModal = function(concertItem) {
        // 元の関数を呼び出し
        originalOpenConcertModal(concertItem);
        
        // モーダルの調整を追加
        setTimeout(function() {
          adjustModalLayout();
          fixShareButtonLayout();
        }, 100);
      };
    }
    
    // リサイズ時にも調整を適用
    window.addEventListener('resize', function() {
      // モバイル判定を更新
      const newIsMobile = window.innerWidth <= 768;
      
      // 表示モードが変わった場合
      if (isMobile !== newIsMobile) {
        isMobile = newIsMobile;
        
        // 閉じるボタンの表示/非表示を切り替え
        const mobileCloseButtons = document.querySelectorAll('.mobile-close-button');
        mobileCloseButtons.forEach(btn => {
          btn.style.display = isMobile ? 'block' : 'none';
        });
      }
      
      adjustButtonLayout();
      adjustMailButtons();
      fixShareButtonLayout();
      
      // モーダルが表示されている場合は調整
      const modal = document.getElementById('concert-modal');
      if (modal && modal.classList.contains('show')) {
        adjustModalLayout();
      }
    });
    
    // 初期表示時に調整を適用
    adjustButtonLayout();
    adjustMailButtons();
    fixShareButtonLayout();
    
    // コンサートモーダルの状態変更を監視するMutationObserver
    const modalObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // クラスの変更を監視
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const modal = mutation.target;
          // モーダルが表示された場合
          if (modal.classList.contains('show')) {
            // モバイルかPCかによって閉じるボタンの表示/非表示を切り替え
            const mobileCloseBtn = modal.querySelector('.mobile-close-button');
            if (mobileCloseBtn) {
              mobileCloseBtn.style.display = isMobile ? 'block' : 'none';
            }
            
            // マップボタンと閉じるボタンの位置調整
            adjustModalLayout();
            // シェアボタンレイアウト修正
            fixShareButtonLayout();
          }
        }
      });
    });
    
    // コンサートモーダルが存在すれば監視開始
    const concertModal = document.getElementById('concert-modal');
    if (concertModal) {
      modalObserver.observe(concertModal, { attributes: true });
    }
    
    // コンサートアイテムのクリックイベントでモーダル調整
    document.querySelectorAll('.concert-item').forEach(item => {
      item.addEventListener('click', function(e) {
        // 少し遅延させて実行（モーダルが開かれた後）
        setTimeout(function() {
          adjustModalLayout();
          fixShareButtonLayout();
        }, 300);
      });
    });
  });