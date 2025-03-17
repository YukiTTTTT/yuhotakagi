// シェアボタンの表示を修正するスクリプト（改善版）
document.addEventListener('DOMContentLoaded', function() {
    // メールボタンの形状を修正する関数
    function fixEmailButtonShape() {
      // PCとモバイルの判定
      const isMobile = window.innerWidth <= 768;
      const buttonSize = isMobile ? '40px' : '32px';
      const iconSize = isMobile ? '24px' : '20px';
      
      // すべてのメールシェアボタンを取得
      const emailButtons = document.querySelectorAll('.share-button.email');
      
      emailButtons.forEach(button => {
        // ボタンの形状を円形に修正
        button.style.width = buttonSize;
        button.style.height = buttonSize;
        button.style.maxWidth = buttonSize;
        button.style.maxHeight = buttonSize;
        button.style.minWidth = buttonSize;
        button.style.minHeight = buttonSize;
        button.style.aspectRatio = '1 / 1';
        button.style.borderRadius = '50%';
        button.style.padding = '0';
        button.style.overflow = 'hidden';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.backgroundColor = '#50031a';
        button.style.flexShrink = '0';
        button.style.margin = '0 5px';
        
        // SVGアイコンがある場合は中央揃え
        const svg = button.querySelector('svg');
        if (svg) {
          svg.style.width = iconSize;
          svg.style.height = iconSize;
          svg.style.maxWidth = iconSize;
          svg.style.maxHeight = iconSize;
          svg.style.margin = '0';
        }
      });
      
      // シェアコンテナの配置調整
      const shareContainers = document.querySelectorAll('.share-concert');
      shareContainers.forEach(container => {
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.flexWrap = 'nowrap';
        container.style.gap = '10px';
        
        // すべてのシェアボタンを調整
        const twitterButtons = container.querySelectorAll('.share-button.twitter');
        const facebookButtons = container.querySelectorAll('.share-button.facebook');
        const allButtons = [...twitterButtons, ...facebookButtons];
        
        allButtons.forEach(button => {
          button.style.width = buttonSize;
          button.style.height = buttonSize;
          button.style.margin = '0 5px';
          button.style.borderRadius = '50%';
          button.style.display = 'flex';
          button.style.alignItems = 'center';
          button.style.justifyContent = 'center';
          button.style.flexShrink = '0';
          
          // SVGアイコンのサイズ調整
          const svg = button.querySelector('svg');
          if (svg) {
            svg.style.width = iconSize;
            svg.style.height = iconSize;
          }
        });
      });
    }
    
    // ページ読み込み時に実行
    fixEmailButtonShape();
    
    // リサイズ時にも実行
    window.addEventListener('resize', function() {
      fixEmailButtonShape();
    });
    
    // DOMの変更を監視して動的に追加されたボタンも修正
    const observer = new MutationObserver(function(mutations) {
      let shouldFix = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldFix = true;
        } else if (mutation.type === 'attributes' && 
                  (mutation.target.classList.contains('modal') || 
                   mutation.target.classList.contains('show'))) {
          shouldFix = true;
        }
      });
      
      if (shouldFix) {
        // 少し遅延させて実行（追加された要素が完全に描画された後）
        setTimeout(fixEmailButtonShape, 200);
      }
    });
    
    // body要素の変更を監視（属性変更も含める）
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    
    // モーダルのクリックイベントでも実行
    document.addEventListener('click', function(e) {
      if (e.target.closest('.concert-item') || e.target.closest('#concert-modal')) {
        // 少し遅延させて実行
        setTimeout(fixEmailButtonShape, 300);
      }
    });
  });