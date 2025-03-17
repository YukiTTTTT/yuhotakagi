// シェアボタンの表示を修正するスクリプト
document.addEventListener('DOMContentLoaded', function() {
  // メールボタンの形状を修正する関数
  function fixEmailButtonShape() {
    // すべてのメールシェアボタンを取得
    const emailButtons = document.querySelectorAll('.share-button.email');
    
    emailButtons.forEach(button => {
      // ボタンの形状を円形に修正
      button.style.width = '40px';
      button.style.height = '40px';
      button.style.borderRadius = '50%';
      button.style.padding = '0';
      button.style.overflow = 'hidden';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      button.style.backgroundColor = '#50031a';
      
      // SVGアイコンがある場合は中央揃え
      const svg = button.querySelector('svg');
      if (svg) {
        svg.style.width = '24px';
        svg.style.height = '24px';
        svg.style.margin = '0 auto';
      }
    });
    
    // シェアコンテナの配置調整
    const shareContainers = document.querySelectorAll('.share-concert');
    shareContainers.forEach(container => {
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.style.flexWrap = 'wrap';
      
      // すべてのシェアボタンを取得して調整
      const shareButtons = container.querySelectorAll('.share-button');
      shareButtons.forEach(button => {
        button.style.width = '40px';
        button.style.height = '40px';
        button.style.margin = '0 5px';
        button.style.borderRadius = '50%';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
      });
    });
  }
  
  // ページ読み込み時に実行
  fixEmailButtonShape();
  
  // DOMの変更を監視して動的に追加されたボタンも修正
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // 少し遅延させて実行（追加された要素が完全に描画された後）
        setTimeout(fixEmailButtonShape, 200);
      }
    });
  });
  
  // body要素の変更を監視
  observer.observe(document.body, { childList: true, subtree: true });
  
  // モーダルのクリックイベントでも実行
  document.addEventListener('click', function(e) {
    if (e.target.closest('.concert-item') || e.target.closest('#concert-modal')) {
      // 少し遅延させて実行
      setTimeout(fixEmailButtonShape, 300);
    }
  });
});