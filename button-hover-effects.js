// ボタンホバーエフェクトの強化
document.addEventListener('DOMContentLoaded', function() {
    // ホバーエフェクト対象のボタン類
    const buttons = document.querySelectorAll('.section-button, .calendar-button, .ticket-link, .contact-option-link, button[type="submit"], .btn-primary');
    
    buttons.forEach(button => {
        // タッチデバイスのチェック
        if (window.matchMedia("(hover: hover)").matches) {
            // ポインターホバーがサポートされている場合のみ適用
            
            // リップルエフェクト
            button.addEventListener('mousedown', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                // アニメーション終了後、ripple要素を削除
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // ホバートラッキング（ボタン上でのマウス位置を追跡するエフェクト）
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // ホバーライト効果（位置に対応した光彩効果）
                const percentX = x / rect.width;
                const percentY = y / rect.height;
                
                // 光彩効果の角度を計算（マウス位置に基づいて）
                const deg = Math.atan2(percentY - 0.5, percentX - 0.5) * (180 / Math.PI);
                const distance = Math.sqrt(Math.pow(percentX - 0.5, 2) + Math.pow(percentY - 0.5, 2)) * 2;
                const alpha = Math.max(0, 1 - distance);
                
                // スタイルを適用
                this.style.background = `linear-gradient(${deg}deg, rgba(255,255,255,${alpha * 0.15}) 0%, #50031a 100%)`;
            });
            
            // マウスリーブ時に元のスタイルに戻す
            button.addEventListener('mouseleave', function() {
                this.style.background = '';
            });
        }
        
        // すべてのデバイスで適用するエフェクト（タッチ対応）
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
        
        // フォーカス時のエフェクト（アクセシビリティ向上）
        button.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        button.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
    
    // シェアボタンの特別なエフェクト
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            const buttonType = this.classList.contains('twitter') ? 'twitter' :
                              this.classList.contains('facebook') ? 'facebook' :
                              this.classList.contains('email') ? 'email' : 'default';
            
            // ボタンタイプに基づいた色を適用
            switch (buttonType) {
                case 'twitter':
                    this.style.backgroundColor = '#1da1f2';
                    break;
                case 'facebook':
                    this.style.backgroundColor = '#4267B2';
                    break;
                case 'email':
                    this.style.backgroundColor = '#ea4335';
                    break;
                default:
                    this.style.backgroundColor = '#50031a';
                    break;
            }
        });
        
        button.addEventListener('mouseout', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // カレンダーボタンの特別なアニメーション
    const calendarButtons = document.querySelectorAll('.calendar-button');
    
    calendarButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            // カレンダーアイコンのアニメーション
            const icon = this.querySelector('svg');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
});