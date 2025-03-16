// カレンダー連携機能の強化
document.addEventListener('DOMContentLoaded', function() {
    // コンサートページのみで実行
    if (!document.querySelector('.concert-item')) return;
    
    // 各コンサートのカレンダーボタンにイベントを追加
    const calendarButtons = document.querySelectorAll('.calendar-button');
    
    calendarButtons.forEach(button => {
        // 現在のhrefを保存（元のGoogle Calendarリンク）
        const originalHref = button.href;
        
        // クリック時の処理を変更
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // カレンダーオプションの表示
            showCalendarOptions(this, originalHref);
        });
    });
    
    // カレンダーオプションを表示する関数
    function showCalendarOptions(button, googleCalLink) {
        // 既存のオプションメニューを削除
        const existingMenu = document.querySelector('.calendar-options-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // イベント情報を取得
        const concertItem = button.closest('.concert-item');
        const title = concertItem.querySelector('h3').textContent.trim();
        
        // 日時情報の取得と整形
        const dateEl = concertItem.querySelector('.concert-date');
        const date = dateEl ? dateEl.textContent.trim() : '';
        
        // 会場情報の取得
        const venueEl = concertItem.querySelector('.concert-info p:nth-child(2)');
        const venue = venueEl ? venueEl.textContent.replace('会場：', '').trim() : '';
        
        // 日時情報を整形（Google URLからより正確な情報を取得）
        let startTime = '', endTime = '';
        try {
            const url = new URL(googleCalLink);
            const params = new URLSearchParams(url.search);
            const dates = params.get('dates');
            if (dates) {
                const [start, end] = dates.split('/');
                startTime = start;
                endTime = end;
            }
        } catch (e) {
            console.error('カレンダーURLの解析に失敗しました:', e);
        }
        
        // カレンダーオプションメニューを作成
        const optionsMenu = document.createElement('div');
        optionsMenu.className = 'calendar-options-menu';
        
        // メニューの内容
        optionsMenu.innerHTML = `
            <div class="calendar-options-header">
                <h4>カレンダーを選択</h4>
                <span class="close-options">&times;</span>
            </div>
            <div class="calendar-options-body">
                <a href="${googleCalLink}" target="_blank" rel="noopener noreferrer" class="calendar-option">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#4285F4" d="M12.72 13.15v-3.5c0-.13-.1-.23-.23-.23h-1.04c-.13 0-.23.1-.23.23v4.11c0 .13.1.23.23.23h3.49c.13 0 .23-.1.23-.23v-1.04c0-.13-.1-.23-.23-.23h-2.22z"></path>
                        <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11.5c0 .83-.67 1.5-1.5 1.5h-7c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5v7z"></path>
                    </svg>
                    Google カレンダー
                </a>
                <a href="${getiCalLink(title, date, venue, startTime, endTime)}" class="calendar-option">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#157EFB" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"></path>
                    </svg>
                    iCalendar (.ics)
                </a>
                <a href="${getOutlookLink(title, date, venue, startTime, endTime)}" target="_blank" rel="noopener noreferrer" class="calendar-option">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#0078D4" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"></path>
                    </svg>
                    Outlook
                </a>
                <a href="${getYahooLink(title, date, venue, startTime, endTime)}" target="_blank" rel="noopener noreferrer" class="calendar-option">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                        <path fill="#5F01D1" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"></path>
                    </svg>
                    Yahoo!カレンダー
                </a>
            </div>
        `;
        
        // ボタン位置に基づいてメニューの配置を決定
        const buttonRect = button.getBoundingClientRect();
        
        // bodyにメニューを追加
        document.body.appendChild(optionsMenu);
        
        // メニューの位置設定
        const menuRect = optionsMenu.getBoundingClientRect();
        
        // 画面からはみ出る場合の調整
        let topPosition = buttonRect.top + window.scrollY + buttonRect.height + 5;
        let leftPosition = buttonRect.left + window.scrollX;
        
        // 右端からはみ出す場合
        if (leftPosition + menuRect.width > window.innerWidth) {
            leftPosition = window.innerWidth - menuRect.width - 10;
        }
        
        // 下端からはみ出す場合
        if (topPosition + menuRect.height > window.innerHeight + window.scrollY) {
            topPosition = buttonRect.top + window.scrollY - menuRect.height - 5;
            }
        
        // メニューのスタイルを設定
        optionsMenu.style.position = 'absolute';
        optionsMenu.style.top = `${topPosition}px`;
        optionsMenu.style.left = `${leftPosition}px`;
        
        // 閉じるボタンのクリックイベント
        const closeBtn = optionsMenu.querySelector('.close-options');
        closeBtn.addEventListener('click', function() {
            optionsMenu.remove();
        });
        
        // メニュー外クリックで閉じる
        document.addEventListener('click', function closeMenu(e) {
            if (!optionsMenu.contains(e.target) && e.target !== button) {
                optionsMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
        
        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                optionsMenu.remove();
                document.removeEventListener('keydown', escClose);
            }
        });
    }
    
    // iCalendar (.ics) 形式のリンクを生成
    function getiCalLink(title, date, venue, startTime, endTime) {
        // 日時のフォーマット
        let formattedStart = formatDateForICal(date, startTime);
        let formattedEnd = formatDateForICal(date, endTime);
        
        // iCalendarデータの生成
        const icalData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `SUMMARY:${title}`,
            `LOCATION:${venue}`,
            `DESCRIPTION:${title} - ${venue}にて開催`,
            `DTSTART:${formattedStart}`,
            `DTEND:${formattedEnd}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');
        
        // Blobを作成してダウンロードリンクを生成
        const blob = new Blob([icalData], { type: 'text/calendar;charset=utf-8' });
        return URL.createObjectURL(blob);
    }
    
    // Outlook用のリンクを生成
    function getOutlookLink(title, date, venue, startTime, endTime) {
        // Outlookのフォーマットは基本的にGoogle Calendarと同じ
        let formattedStart = '';
        let formattedEnd = '';
        
        try {
            // Google Calendar形式の日時からOutlook用に変換
            if (startTime) {
                const startDate = new Date(startTime.substring(0, 4), 
                                          parseInt(startTime.substring(4, 6)) - 1, 
                                          startTime.substring(6, 8), 
                                          startTime.substring(9, 11), 
                                          startTime.substring(11, 13));
                
                formattedStart = startDate.toISOString().replace(/-|:|\.\d+/g, '');
            }
            
            if (endTime) {
                const endDate = new Date(endTime.substring(0, 4), 
                                        parseInt(endTime.substring(4, 6)) - 1, 
                                        endTime.substring(6, 8), 
                                        endTime.substring(9, 11), 
                                        endTime.substring(11, 13));
                
                formattedEnd = endDate.toISOString().replace(/-|:|\.\d+/g, '');
            }
        } catch (e) {
            console.log('日時の変換に失敗しました:', e);
            // 失敗した場合はシンプルな形式で
            formattedStart = formatSimpleDate(date) + 'T130000';
            formattedEnd = formatSimpleDate(date) + 'T160000';
        }
        
        return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&location=${encodeURIComponent(venue)}&startdt=${formattedStart}&enddt=${formattedEnd}`;
    }
    
    // Yahoo!カレンダー用のリンクを生成
    function getYahooLink(title, date, venue, startTime, endTime) {
        // Yahoo!カレンダーのフォーマットに合わせて日時を変換
        let formattedDate = formatSimpleDate(date);
        let startHour = '13';
        let startMinute = '00';
        let endHour = '16';
        let endMinute = '00';
        
        try {
            // より正確な時間情報があれば使用
            if (startTime) {
                startHour = startTime.substring(9, 11);
                startMinute = startTime.substring(11, 13);
            }
            
            if (endTime) {
                endHour = endTime.substring(9, 11);
                endMinute = endTime.substring(11, 13);
            }
        } catch (e) {
            console.log('日時の変換に失敗しました:', e);
        }
        
        const yahooDateFormat = `${formattedDate}T${startHour}${startMinute}00/${formattedDate}T${endHour}${endMinute}00`;
        
        return `https://calendar.yahoo.co.jp/?v=60&TITLE=${encodeURIComponent(title)}&ST=${yahooDateFormat}&in_loc=${encodeURIComponent(venue)}`;
    }
    
    // iCalendarフォーマット用の日付整形
    function formatDateForICal(dateStr, timeStr) {
        // 日付文字列を分解 (例: "2025/3/29")
        const parts = dateStr.split('/');
        if (parts.length !== 3) return '20250101T000000';
        
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        
        // 時間情報があればそれを使用、なければ13:00をデフォルトに
        let hour = '13';
        let minute = '00';
        
        try {
            if (timeStr) {
                hour = timeStr.substring(9, 11);
                minute = timeStr.substring(11, 13);
            }
        } catch (e) {
            console.log('時間の変換に失敗しました:', e);
        }
        
        return `${year}${month}${day}T${hour}${minute}00`;
    }
    
    // シンプルな日付フォーマット (YYYYMMDD)
    function formatSimpleDate(dateStr) {
        // 日付文字列を分解 (例: "2025/3/29")
        const parts = dateStr.split('/');
        if (parts.length !== 3) return '20250101';
        
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        
        return `${year}${month}${day}`;
    }
});