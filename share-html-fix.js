
// シェアボタンのHTMLを根本から修正するスクリプト
document.addEventListener('DOMContentLoaded', function() {
  // 楕円形メールボタンを修正する関数
  function fixOvalEmailButton() {
    // すべてのシェア領域を取得
    const shareContainers = document.querySelectorAll('.share-concert');
    
    shareContainers.forEach(function(container) {
      // 現在のHTMLを保持
      const originalHTML = container.innerHTML;
      
      // テキスト「シェア：」を抽出
      let shareText = 'シェア：';
      const textMatch = originalHTML.match(/<span[^>]*>(シェア：)<\/span>/);
      if (textMatch && textMatch[1]) {
        shareText = textMatch[1];
      }
      
      // 新しいHTMLを構築
      const newHTML = `
        <span style="margin-right:10px;">${shareText}</span>
        <div style="display:inline-flex; align-items:center; gap:10px;">
          <a href="#" class="share-button twitter" style="width:40px; height:40px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background-color:#50031a; overflow:hidden;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill:white;">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" class="share-button facebook" style="width:40px; height:40px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background-color:#50031a; overflow:hidden;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill:white;">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="#" class="share-button email" style="width:40px; height:40px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background-color:#50031a; overflow:hidden;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill:white;">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
            </svg>
          </a>
        </div>
      `;
      
      // HTMLを置き換え
      container.innerHTML = newHTML;
      
      // 既存のリンク先を保持
      const existingTwitter = originalHTML.match(/twitter[^"]*href="([^"]+)"/);
      const existingFacebook = originalHTML.match(/facebook[^"]*href="([^"]+)"/);
      const existingEmail = originalHTML.match(/email[^"]*href="([^"]+)"/);
      
      // 新しいリンク要素を取得
      const newTwitter = container.querySelector('.twitter');
      const newFacebook = container.querySelector('.facebook');
      const newEmail = container.querySelector('.email');
      
      // 既存のURLを新しい要素に適用
      if (existingTwitter && existingTwitter[1] && newTwitter) {
        newTwitter.href = existingTwitter[1];
      }
      
      if (existingFacebook && existingFacebook[1] && newFacebook) {
        newFacebook.href = existingFacebook[1];
      }
      
      if (existingEmail && existingEmail[1] && newEmail) {
        newEmail.href = existingEmail[1];
      }
    });
  }
  
  // ページ読み込み時に実行
  setTimeout(fixOvalEmailButton, 500);
  
  // モーダルが表示されたときに実行
  document.addEventListener('click', function(e) {
    if (e.target.closest('.concert-item')) {
      setTimeout(fixOvalEmailButton, 1000);
    }
  });
  
  // DOM変更を監視
  const observer = new MutationObserver(function(mutations) {
    let shouldFix = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        const addedNodes = Array.from(mutation.addedNodes);
        addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // 要素ノード
            if (node.classList && (
                node.classList.contains('modal') || 
                node.querySelector('.share-concert')
            )) {
              shouldFix = true;
            }
          }
        });
      }
    });
    
    if (shouldFix) {
      setTimeout(fixOvalEmailButton, 500);
    }
  });
  
  // body要素の変更を監視
  observer.observe(document.body, { childList: true, subtree: true });
});