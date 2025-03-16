// コンサートページのモーダルウィンドウ表示機能
document.addEventListener('DOMContentLoaded', function() {
    // コンサートページのみで実行
    if (!document.querySelector('.concert-item')) return;
    
    // モーダルHTMLを追加
    const modalHTML = `
    <div id="concert-modal" class="modal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-body">
          <div class="modal-image-container">
            <img id="modal-image" src="" alt="コンサート画像">
          </div>
          <div class="modal-details">
            <h3 id="modal-title"></h3>
            <div class="modal-info">
              <div class="modal-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zM7 11h5v5H7z" fill="currentColor"/></svg>
                <p id="modal-date"></p>
              </div>
              <div class="modal-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" fill="currentColor"/><circle cx="12" cy="9" r="2.5" fill="currentColor"/></svg>
                <p id="modal-venue"></p>
              </div>
              <div class="modal-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/></svg>
                <p id="modal-time"></p>
              </div>
              <div class="modal-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/></svg>
                <p id="modal-price"></p>
              </div>
            </div>
            <div id="modal-description"></div>
            <div class="modal-actions">
              <div class="modal-calendar">
                <a id="modal-calendar-link" href="#" target="_blank" class="calendar-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM7 11h5v5H7z" fill="white"/>
                  </svg>
                  カレンダーに追加
                </a>
              </div>
              <div class="modal-share">
                <span>シェア：</span>
                <a id="modal-twitter" href="#" target="_blank" class="share-button twitter" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a id="modal-facebook" href="#" target="_blank" class="share-button facebook" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a id="modal-email" href="#" class="share-button email" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                </a>
              </div>
            </div>
            <div id="modal-link-container"></div>
          </div>
        </div>
        <div id="modal-map-container">
          <h4>会場案内</h4>
          <div id="modal-map" class="modal-map"></div>
        </div>
      </div>
    </div>`;
    
    // モーダルHTMLをbodyに追加
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // モーダル要素の取得
    const modal = document.getElementById('concert-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    // コンサートカードのクリックイベントを追加
    const concertItems = document.querySelectorAll('.concert-item');
    concertItems.forEach(item => {
        const clickableAreas = item.querySelectorAll('.concert-date, .concert-info, img');
        clickableAreas.forEach(area => {
            area.addEventListener('click', function(e) {
                // イベントがカレンダーボタンまたはシェアボタンからの場合は、モーダルを開かない
                if (e.target.closest('.calendar-button') || e.target.closest('.share-button') || 
                    e.target.closest('.ticket-link') || e.target.tagName === 'A') {
                    return;
                }
                
                e.preventDefault();
                openConcertModal(item);
            });
        });
    });
    
    // 閉じるボタンのクリックイベント
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // モーダル外クリックで閉じる
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // モーダルを開く関数
    function openConcertModal(concertItem) {
        // モーダルにデータを設定
        const title = concertItem.querySelector('h3').textContent;
        const image = concertItem.querySelector('img').src;
        const date = concertItem.querySelector('.concert-date').textContent;
        
        // 日時と会場の情報を取得
        const infoTexts = concertItem.querySelectorAll('.concert-info p');
        let dateTimeText = '';
        let venueText = '';
        let priceText = '';
        
        infoTexts.forEach(p => {
            const text = p.textContent;
            if (text.includes('日時')) {
                dateTimeText = text.replace('日時：', '');
            } else if (text.includes('会場')) {
                venueText = text.replace('会場：', '');
            } else if (text.includes('円') || text.includes('料金') || text.includes('：')) {
                priceText = text;
            }
        });
        
        // 時間と日付を分離
        let timeText = '';
        if (dateTimeText) {
            const match = dateTimeText.match(/(\d+:\d+)|(午前|午後|夜)/);
            if (match) {
                timeText = match[0] + '開演';
            }
        }
        
        // カレンダーリンクを取得
        const calendarLink = concertItem.querySelector('.calendar-button')?.href || '';
        
        // チケットリンクまたは詳細リンクを取得
        const ticketLink = concertItem.querySelector('.ticket-link') || concertItem.querySelector('a[href*="ticket"]');
        const detailLink = concertItem.querySelector('a[href*="www"]') || concertItem.querySelector('a[href*="http"]');
        
        // モーダルに情報をセット
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-image').src = image;
        document.getElementById('modal-date').textContent = date;
        document.getElementById('modal-venue').textContent = venueText;
        document.getElementById('modal-time').textContent = timeText || '詳細はお問い合わせください';
        document.getElementById('modal-price').textContent = priceText || '詳細はお問い合わせください';
        
        // カレンダーリンクをセット
        document.getElementById('modal-calendar-link').href = calendarLink;
        
        // シェアリンクを設定
        const shareTitle = encodeURIComponent(title);
        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(`${date} ${title} ${venueText}にて開催`);
        
        document.getElementById('modal-twitter').href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        document.getElementById('modal-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        document.getElementById('modal-email').href = `mailto:?subject=${shareTitle}&body=${shareText}%0A${shareUrl}`;
        
        // 詳細リンクまたはチケットリンクがあれば追加
        const linkContainer = document.getElementById('modal-link-container');
        linkContainer.innerHTML = '';
        
        if (ticketLink) {
            const a = document.createElement('a');
            a.href = ticketLink.href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = 'チケットを購入';
            linkContainer.appendChild(a);
        } else if (detailLink) {
            const a = document.createElement('a');
            a.href = detailLink.href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = '詳細を見る';
            linkContainer.appendChild(a);
        }

        // 簡易的な地図表示（Google Maps API連携はここでは省略）
        const mapContainer = document.getElementById('modal-map');
        mapContainer.innerHTML = `
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 5px;">
                <p>会場: ${venueText}</p>
                <a href="https://www.google.com/maps/search/${encodeURIComponent(venueText)}" 
                   target="_blank" rel="noopener noreferrer" 
                   style="display: inline-block; margin-top: 10px; padding: 8px 15px; background-color: #50031a; color: white; text-decoration: none; border-radius: 5px;">
                   Google マップで見る
                </a>
            </div>
        `;
        
        // モーダルを表示
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // スクロール無効化
    }
    
    // モーダルを閉じる関数
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // スクロール有効化
    }
});