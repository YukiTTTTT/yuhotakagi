// コンサートページのモーダルウィンドウ機能の修正版
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
          <img id="modal-image" src="" alt="コンサート画像" class="zoomable-image">
        </div>
        <div class="modal-details">
          <h3 id="modal-title"></h3>
          <div class="modal-info">
            <div class="modal-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zM7 11h5v5H7z" fill="currentColor"/></svg>
              <p id="modal-date"></p>
            </div>
            <div class="modal-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/></svg>
              <p id="modal-time"></p>
            </div>
            <div class="modal-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" fill="currentColor"/><circle cx="12" cy="9" r="2.5" fill="currentColor"/></svg>
              <p id="modal-venue"></p>
            </div>
            <div class="modal-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/></svg>
              <p id="modal-price"></p>
            </div>
            <div class="modal-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/></svg>
              <div id="modal-program" class="program-list">
                <!-- プログラム情報はここに直接記述 -->
              </div>
            </div>
            <div class="modal-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
              <p id="modal-contact"></p>
            </div>
          </div>
          <div class="modal-actions">
            <div class="modal-actions-group">
              <button id="modal-calendar-link" class="calendar-button modal-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM7 11h5v5H7z" fill="white"/>
                </svg>
                カレンダーに追加
              </button>
              
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
            <div id="modal-ticket-container"></div>
          </div>
        </div>
      </div>
      <div id="modal-map-container">
        <h4>会場案内</h4>
        <div id="modal-map" class="modal-map"></div>
      </div>
      <!-- モバイル用クローズボタン（下部固定） -->
      <div class="mobile-close-button">閉じる</div>
    </div>
  </div>
  <!-- カレンダーオプションメニュー -->
  <div id="calendar-options-menu" class="calendar-options-menu">
    <div class="calendar-options-header">
      <h4>カレンダーを選択</h4>
      <span id="close-calendar-options" class="close-options">&times;</span>
    </div>
    <div class="calendar-options-body">
      <a id="google-calendar-link" href="#" target="_blank" rel="noopener noreferrer" class="calendar-option">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path fill="#4285F4" d="M12.72 13.15v-3.5c0-.13-.1-.23-.23-.23h-1.04c-.13 0-.23.1-.23.23v4.11c0 .13.1.23.23.23h3.49c.13 0 .23-.1.23-.23v-1.04c0-.13-.1-.23-.23-.23h-2.22z"></path>
          <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11.5c0 .83-.67 1.5-1.5 1.5h-7c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5v7z"></path>
        </svg>
        Google カレンダー
      </a>
      <a id="ical-link" href="#" download="concert.ics" class="calendar-option">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path fill="#157EFB" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"></path>
        </svg>
        iCalendar (.ics)
      </a>
      <a id="outlook-link" href="#" target="_blank" rel="noopener noreferrer" class="calendar-option">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path fill="#0078D4" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"></path>
        </svg>
        Outlook
      </a>
      <a id="yahoo-link" href="#" target="_blank" rel="noopener noreferrer" class="calendar-option">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
          <path fill="#5F01D1" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"></path>
        </svg>
        Yahoo!カレンダー
      </a>
    </div>
  </div>
  `;
  
  // モーダルHTMLをbodyに追加
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // モーダル要素の取得
  const modal = document.getElementById('concert-modal');
  const closeBtn = document.querySelector('.close-modal');
  const mobileCloseBtn = document.querySelector('.mobile-close-button');
  const calendarOptionsMenu = document.getElementById('calendar-options-menu');
  const closeCalendarOptionsBtn = document.getElementById('close-calendar-options');
  
  // コンサートカードのクリックイベントを調整
  const concertItems = document.querySelectorAll('.concert-item');
  concertItems.forEach(item => {
    // リンク以外の領域でのクリックのみモーダルを開く
    item.addEventListener('click', function(e) {
      // カレンダーボタン、シェアボタン、チケットリンク、または一般的なリンクであれば処理しない
      if (e.target.closest('.calendar-button') || 
          e.target.closest('.share-button') || 
          e.target.closest('.ticket-link') || 
          e.target.tagName === 'A' ||
          e.target.closest('a')) {
        return;
      }
      
      openConcertModal(this);
    });
  });
  
  // カレンダーボタンイベントの設定（コンサート情報ページ）
  document.querySelectorAll('.concert-item .calendar-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 親要素のコンサート情報を取得
      const concertItem = this.closest('.concert-item');
      
      if (concertItem) {
        const title = concertItem.querySelector('h3').textContent;
        const date = concertItem.querySelector('.concert-date').textContent;
        const venueEl = concertItem.querySelector('.concert-info p:nth-child(2)');
        const venue = venueEl ? venueEl.textContent.replace('会場：', '').trim() : '';
        const timeEl = concertItem.querySelector('.concert-info p:nth-child(1)');
        const timeText = timeEl ? timeEl.textContent.replace('日時：', '').trim() : '';
        
        // カレンダーメニューを設定して表示
        setupCalendarMenu(title, date, venue, timeText, this);
      }
    });
  });
  
  // モーダル内のカレンダーボタンクリック時の処理
  document.getElementById('modal-calendar-link').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // モーダル内の情報を取得
    const title = document.getElementById('modal-title').textContent;
    const date = document.getElementById('modal-date').textContent;
    const venue = document.getElementById('modal-venue').textContent;
    const time = document.getElementById('modal-time').textContent;
    
    // カレンダーメニューを設定して表示
    setupCalendarMenu(title, date, venue, time, this);
  });
  
  // 画像のクリックのみを拡大表示に使用
  modal.addEventListener('click', function(e) {
    if (e.target.id === 'modal-image') {
      window.open(e.target.src, '_blank');
    }
  });
  
  // 閉じるボタンのクリックイベント
  closeBtn.addEventListener('click', function() {
    closeModal();
  });
  
  // モバイル用閉じるボタンのクリックイベント
  mobileCloseBtn.addEventListener('click', function() {
    closeModal();
  });
  
  // モーダル外クリックで閉じる
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
    
    // カレンダーメニュー外をクリックしたら閉じる
    if (calendarOptionsMenu.style.display === 'block' && 
        !calendarOptionsMenu.contains(e.target) && 
        !e.target.closest('#modal-calendar-link') && 
        !e.target.closest('.calendar-button')) {
      calendarOptionsMenu.style.display = 'none';
    }
  });
  
  // ESCキーでモーダルを閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      if (calendarOptionsMenu.style.display === 'block') {
        calendarOptionsMenu.style.display = 'none';
      }
    }
  });
  // スワイプでモーダルを閉じる（モバイル用）
  let touchStartY = 0;
  let touchEndY = 0;
  
  modal.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  modal.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    // 下方向へのスワイプを検出
    if (touchEndY - touchStartY > 100) {
      closeModal();
    }
  }, { passive: true });
  
  // カレンダーオプションを閉じるボタン
  closeCalendarOptionsBtn.addEventListener('click', function() {
    calendarOptionsMenu.style.display = 'none';
  });
  
  // カレンダーメニューを設定して表示する関数
  function setupCalendarMenu(title, date, venue, time, buttonElement) {
    // カレンダーリンクを生成
    const googleCalLink = generateGoogleCalendarLink(title, date, venue, time);
    document.getElementById('google-calendar-link').href = googleCalLink;
    
    // iCalendar (.ics) データの生成
    const icalData = generateICalData(title, date, venue, time);
    const icalBlob = new Blob([icalData], {type: 'text/calendar;charset=utf-8'});
    const icalUrl = URL.createObjectURL(icalBlob);
    document.getElementById('ical-link').href = icalUrl;
    document.getElementById('ical-link').download = `${title.slice(0, 20)}.ics`;
    
    // Outlook用のリンクを生成
    document.getElementById('outlook-link').href = generateOutlookLink(title, date, venue, time);
    
    // Yahoo!カレンダー用のリンクを生成
    document.getElementById('yahoo-link').href = generateYahooLink(title, date, venue, time);
    
    // まず既存のメニューを非表示に
    calendarOptionsMenu.style.display = 'none';
    
    // ボタンの位置を取得
    const buttonRect = buttonElement.getBoundingClientRect();
    
    // カレンダーメニューの位置設定（ボタンのすぐ下に表示）
    calendarOptionsMenu.style.position = 'absolute';
    calendarOptionsMenu.style.zIndex = '9999'; // z-indexを高く設定
    
    // まずボタンの表示を確認して位置を設定
    setTimeout(() => {
      const menuWidth = Math.min(280, window.innerWidth * 0.8);
      
      if (window.innerWidth <= 768) {
        // モバイル表示 - 画面中央に表示
        calendarOptionsMenu.style.width = menuWidth + 'px';
        calendarOptionsMenu.style.position = 'fixed';
        calendarOptionsMenu.style.top = '50%';
        calendarOptionsMenu.style.left = '50%';
        calendarOptionsMenu.style.transform = 'translate(-50%, -50%)';
      } else {
        // デスクトップ表示 - ボタンの真下に表示
        const left = Math.max(10, Math.min(buttonRect.left, window.innerWidth - menuWidth - 10));
        calendarOptionsMenu.style.width = menuWidth + 'px';
        calendarOptionsMenu.style.top = (buttonRect.bottom + window.scrollY + 5) + 'px';
        calendarOptionsMenu.style.left = left + 'px';
        calendarOptionsMenu.style.transform = 'none';
      }
      
      // カレンダーメニューを表示
      calendarOptionsMenu.style.display = 'block';
    }, 50);
  }
  
  // モーダルを開く関数
  function openConcertModal(concertItem) {
    // モーダルにデータを設定
    const title = concertItem.querySelector('h3').innerHTML; // HTMLとして取得
    const image = concertItem.querySelector('img').src;
    const date = concertItem.querySelector('.concert-date').textContent;
    
    // 日時と会場の情報を取得
    const infoTexts = concertItem.querySelectorAll('.concert-info p');
    let dateTimeText = '';
    let venueText = '';
    let priceText = '';
    let contactText = '';
    let exactTimeText = '';
    
    infoTexts.forEach((p, index) => {
      const text = p.textContent;
      if (index === 0 && text.includes('日時')) {
        dateTimeText = text.replace('日時：', '');
        
        // 開演時間を抽出
        const timeMatch = dateTimeText.match(/(\d+:\d+)|(午前|午後|夜)/);
        if (timeMatch) {
          exactTimeText = timeMatch[0];
        }
      } else if (index === 1 && text.includes('会場')) {
        venueText = text.replace('会場：', '');
      } else if (index === 2 && (text.includes('円') || text.includes('料金') || text.includes('：'))) {
        priceText = text; // 料金情報（3行目）
      } else if (index === 3 && (text.includes('問い合わせ') || text.includes('申込') || text.includes('@') || text.includes('詳細'))) {
        contactText = p.innerHTML; // 連絡先情報（4行目）をHTMLとして取得
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
    
    // チケットリンクまたは詳細リンクを取得
    const ticketLink = concertItem.querySelector('.ticket-link') || concertItem.querySelector('a[href*="ticket"]');
    
    // プログラム情報（コンサートタイトルに基づいて設定）
    const programHTML = getDefaultProgram(title);
    
    // モーダルに情報をセット
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = title; // HTMLとして設定して改行を保持
    
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-date').textContent = date;
    document.getElementById('modal-venue').textContent = venueText || '詳細はお問い合わせください';
    document.getElementById('modal-time').textContent = timeText || '詳細はお問い合わせください';
    document.getElementById('modal-price').textContent = priceText || '詳細はお問い合わせください';
    document.getElementById('modal-program').innerHTML = programHTML;
    
    // 連絡先情報の設定（HTMLコンテンツを直接利用）
    const contactElement = document.getElementById('modal-contact');
    if (contactText) {
      // HTMLとして保存されているテキストを設定
      contactElement.innerHTML = contactText;
    } else {
      contactElement.textContent = 'お問い合わせはこちらのWebサイトで承っております';
    }
    
    // シェアリンクを設定
    const shareTitle = encodeURIComponent(title.replace(/<br\s*\/?>/gi, ' '));
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`${date} ${title.replace(/<br\s*\/?>/gi, ' ')} ${venueText}にて開催`);
    
    document.getElementById('modal-twitter').href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    document.getElementById('modal-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    document.getElementById('modal-email').href = `mailto:?subject=${shareTitle}&body=${shareText}%0A${shareUrl}`;
    
    // チケットリンクの設定
    const ticketContainer = document.getElementById('modal-ticket-container');
    ticketContainer.innerHTML = '';
    
    if (ticketLink) {
      const a = document.createElement('a');
      a.href = ticketLink.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'modal-button ticket-button';
      a.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
          <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-2-5h.5c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5H18V7zm-2 0h.5c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5H16V7zm-2 0h.5c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5H14V7zm-1 5c0 .83-.67 1.5-1.5 1.5S10 12.83 10 12s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" fill="white"/>
        </svg>
        チケットを購入
      `;
      ticketContainer.appendChild(a);
    }
    
    // 簡易的な地図表示
    const mapContainer = document.getElementById('modal-map');
    mapContainer.innerHTML = `
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 5px;">
        <p>会場: ${venueText || '詳細はお問い合わせください'}</p>
        <a href="https://www.google.com/maps/search/${encodeURIComponent(venueText || title)}" 
           target="_blank" rel="noopener noreferrer" 
           style="display: inline-block; margin-top: 10px; padding: 8px 15px; background-color: #50031a; color: white; text-decoration: none; border-radius: 5px;">
           Google マップで見る
        </a>
      </div>
    `;
    
    // モーダルを表示
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // スクロール無効化
    
    // モバイルデバイスの場合、スワイプヒントを表示
    if (window.innerWidth <= 768) {
      const swipeHint = document.createElement('div');
      swipeHint.className = 'swipe-hint';
      swipeHint.innerHTML = `
        <div class="swipe-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M8 5.83l2.59 2.59L12 7l-4-4-4 4 1.41 1.41L8 5.83zm0 12.34l-2.59-2.59L4 17l4 4 4-4-1.41-1.41L8 18.17z" fill="currentColor"/>
          </svg>
        </div>
        <span>下にスワイプで閉じる</span>
      `;
      modal.querySelector('.modal-content').appendChild(swipeHint);
      
      // 数秒後に消える
      setTimeout(() => {
        if (swipeHint.parentNode) {
          swipeHint.style.opacity = '0';
          setTimeout(() => {
            if (swipeHint.parentNode) {
              swipeHint.parentNode.removeChild(swipeHint);
            }
          }, 500);
        }
      }, 3000);
    }
  }
  
  // デフォルトのプログラム情報を取得する関数
  function getDefaultProgram(title) {
    // タイトルによってプログラム内容を変える
    if (title.includes('藤森洸一')) {
      return `
        <p>ドビュッシー：チェロソナタ</p>
        <p>スーク：バラードとセレナード<p/>
        <p>グリエール：2本のチェロのための二重奏曲 より抜粋</p>
        <p>ピアッティ：2本のチェロとピアノのためのセレナーデ　他</p>
      `;
    } else if (title.includes('和田志織 ')) {
      return `
        <p>J.S.バッハ：無伴奏チェロ組曲 第3番</p>
        <p>ヒンデミット：無伴奏ヴィオラソナタ 作品31-4</p>
        <p>ブラームス：ヴィオラソナタ 第2番</p>
        <p>ブラームス：クラリネット三重奏曲(ヴィオラ版) 他</p>
      `;
    } else if (title.includes('Orchestra Est') ) {
      return `
        <p>モーツァルト：交響曲第40番 ト短調 K.550</p>
        <p>ドヴォルザーク：チェロ協奏曲 ロ短調 Op.104*</p>
        <p>ブラームス：交響曲第4番 ホ短調 Op.98</p>
      `;
    } else if (title.includes('ENJOY!室内楽アカデミー・フェロー演奏会 Ⅰ')) {
      return `
        <p>高木優帆はカルテット・シュトゥルムに出演いたします。</p>
      `;
    } else if (title.includes('ENJOY!室内楽アカデミー・フェロー演奏会 Ⅱ')) {
      return `
        <p>高木優帆はカルテット・シュトゥルムに出演いたします。</p>
      `;
    } else {
      return `
        <p>未定</p>
      `;
    }
  }
  
  // モーダルを閉じる関数
  function closeModal() {
    // 閉じるアニメーションを追加
    modal.classList.add('closing');
    
    // アニメーション完了後に非表示
    setTimeout(() => {
      modal.classList.remove('show');
      modal.classList.remove('closing');
      document.body.style.overflow = ''; // スクロール有効化
      
      // スワイプヒントがあれば削除
      const swipeHint = modal.querySelector('.swipe-hint');
      if (swipeHint && swipeHint.parentNode) {
        swipeHint.parentNode.removeChild(swipeHint);
      }
    }, 300); // CSSアニメーションの時間と合わせる
    
    // カレンダーオプションも閉じる
    calendarOptionsMenu.style.display = 'none';
  }
  
  // Google Calendar用のリンクを生成
  function generateGoogleCalendarLink(title, date, venue, time) {
    // 日時のフォーマット
    const formattedDate = formatDateForCalendar(date, time);
    
    // タイトルから改行タグを削除
    const cleanTitle = title.replace(/<br\s*\/?>/gi, ' ');
    
    // Google Calendar URLを生成
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(cleanTitle)}&dates=${formattedDate.start}/${formattedDate.end}&details=${encodeURIComponent(cleanTitle + ' - ' + venue + 'にて開催')}&location=${encodeURIComponent(venue)}`;
  }
  
  // iCalendar (.ics) データの生成
  function generateICalData(title, date, venue, time) {
    // 日時をiCal形式に変換
    const formattedDate = formatDateForCalendar(date, time);
    
    // タイトルから改行タグを削除
    const cleanTitle = title.replace(/<br\s*\/?>/gi, ' ');
    
    // iCalデータの生成
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${cleanTitle}`,
      `LOCATION:${venue}`,
      `DESCRIPTION:${cleanTitle} - ${venue}にて開催`,
      `DTSTART:${formattedDate.start}`,
      `DTEND:${formattedDate.end}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }
  
  // Outlook用のリンクを生成
  function generateOutlookLink(title, date, venue, time) {
    // 日時のフォーマット
    const formattedDate = formatDateForCalendar(date, time);
    
    // タイトルから改行タグを削除
    const cleanTitle = title.replace(/<br\s*\/?>/gi, ' ');
    
    // Outlook URLを生成
    return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(cleanTitle)}&location=${encodeURIComponent(venue)}&startdt=${formattedDate.start}&enddt=${formattedDate.end}&body=${encodeURIComponent(cleanTitle + ' - ' + venue + 'にて開催')}`;
  }
  
  // Yahoo!カレンダー用のリンクを生成
  function generateYahooLink(title, date, venue, time) {
    // 日時のフォーマット
    const formattedDate = formatDateForCalendar(date, time);
    
    // タイトルから改行タグを削除
    const cleanTitle = title.replace(/<br\s*\/?>/gi, ' ');
    
    // Yahoo!カレンダー URLを生成
    return `https://calendar.yahoo.co.jp/?v=60&TITLE=${encodeURIComponent(cleanTitle)}&ST=${formattedDate.start}&ET=${formattedDate.end}&in_loc=${encodeURIComponent(venue)}&DESC=${encodeURIComponent(cleanTitle + ' - ' + venue + 'にて開催')}`;
  }
  
  // 日時をカレンダー形式にフォーマットする関数
function formatDateForCalendar(dateStr, timeStr) {
  // 日付文字列を分解（例: "2025/3/29"）
  const parts = dateStr.split('/');
  if (parts.length !== 3) {
    // フォーマットが不正の場合はデフォルト値を返す
    return { 
      start: '20250101T120000', 
      end: '20250101T140000' 
    };
  }
  
  const year = parts[0];
  const month = parts[1].padStart(2, '0');
  const day = parts[2].padStart(2, '0');
  
  // 時間情報の抽出
  let startHour = '13';  // デフォルト値
  let startMinute = '00'; // デフォルト値
  let endHour = '15';    // デフォルト値
  let endMinute = '00';  // デフォルト値
  
  if (timeStr) {
    // 「開演」という文字がある場合は削除
    const cleanTimeStr = timeStr.replace('開演', '').trim();
    
    // 時間形式（例: "19:30"）を検出
    const timeMatch = cleanTimeStr.match(/(\d+):(\d+)/);
    if (timeMatch) {
      startHour = timeMatch[1].padStart(2, '0');
      startMinute = timeMatch[2].padStart(2, '0');
      
    } else if (cleanTimeStr.includes('午後') || cleanTimeStr.includes('PM')) {
      // 「午後〇時〇分」形式の処理
      const hourMatch = cleanTimeStr.match(/午後\s*(\d+)時/);
      const minuteMatch = cleanTimeStr.match(/(\d+)分/);
      
      if (hourMatch) {
        // 午後の場合は12を加算（ただし、12時の場合は加算しない）
        const hour = parseInt(hourMatch[1]);
        startHour = (hour === 12 ? 12 : hour + 12).toString().padStart(2, '0');
      }
      
      if (minuteMatch) {
        startMinute = minuteMatch[1].padStart(2, '0');
      }
    } else if (cleanTimeStr.includes('午前') || cleanTimeStr.includes('AM')) {
      // 「午前〇時〇分」形式の処理
      const hourMatch = cleanTimeStr.match(/午前\s*(\d+)時/);
      const minuteMatch = cleanTimeStr.match(/(\d+)分/);
      
      if (hourMatch) {
        // 午前の場合はそのまま（ただし、12時の場合は0時とする）
        const hour = parseInt(hourMatch[1]);
        startHour = (hour === 12 ? '00' : hour.toString().padStart(2, '0'));
      }
      
      if (minuteMatch) {
        startMinute = minuteMatch[1].padStart(2, '0');
      }
    }
    
    // 終了時間は開始から2時間後と仮定
    const endTime = new Date();
    endTime.setHours(parseInt(startHour) + 2);
    endTime.setMinutes(parseInt(startMinute));
    
    endHour = endTime.getHours().toString().padStart(2, '0');
    endMinute = endTime.getMinutes().toString().padStart(2, '0');
  }
  
  return {
    start: `${year}${month}${day}T${startHour}${startMinute}00`,
    end: `${year}${month}${day}T${endHour}${endMinute}00`
  };
}
});