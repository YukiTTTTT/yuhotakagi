// シェアボタンの表示を修正するシンプルなスクリプト
document.addEventListener('DOMContentLoaded', function() {
    // シェアボタンを修正する関数
    function fixShareButtons() {
      // すべてのシェアコンテナを取得
      const shareContainers = document.querySelectorAll('.share-concert');
      
      shareContainers.forEach(container => {
        // PCとモバイルの判定
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // モバイル表示時
          // シェアボタンを取得
          const buttons = container.querySelectorAll('a.twitter, a.facebook, a.email');
          
          // 楕円のメールボタンを修正
          const emailButton = container.querySelector('a.email');
          if (emailButton) {
            // 楕円ボタンの修正
            emailButton.style.cssText = 'width: 40px !important; height: 40px !important; border-radius: 50% !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; background-color: #50031a !important; overflow: hidden !important; margin: 0 5px !important; padding: 0 !important;';
            
            // SVGアイコンの修正
            const svg = emailButton.querySelector('svg');
            if (svg) {
              svg.style.cssText = 'width: 24px !important; height: 24px !important; margin: 0 !important;';
            }
          }
          
          // Twitterボタンとfacebookボタンのスタイル修正
          const twitterButton = container.querySelector('a.twitter');
          const facebookButton = container.querySelector('a.facebook');
          
          if (twitterButton) {
            twitterButton.style.cssText = 'width: 40px !important; height: 40px !important; border-radius: 50% !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; background-color: #50031a !important; overflow: hidden !important; margin: 0 5px !important; padding: 0 !important;';
          }
          
          if (facebookButton) {
            facebookButton.style.cssText = 'width: 40px !important; height: 40px !important; border-radius: 50% !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; background-color: #50031a !important; overflow: hidden !important; margin: 0 5px !important; padding: 0 !important;';
          }
        }
      });
    }
    
    // ページ読み込み時に実行
    setTimeout(fixShareButtons, 100);
    
    // クリックイベントでも実行
    document.addEventListener('click', function(e) {
      if (e.target.closest('.concert-item') || 
          e.target.closest('#concert-modal')) {
        setTimeout(fixShareButtons, 300);
      }
    });
    
    // DOMの変更を監視
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setTimeout(fixShareButtons, 200);
        }
      });
    });
    
    // body要素の変更を監視
    observer.observe(document.body, { childList: true, subtree: true });
  });