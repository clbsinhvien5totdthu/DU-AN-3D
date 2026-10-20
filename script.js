(function () {
  'use strict';

  // Màu hoa và hình cánh hoa
  var COLORS = ['#ff5e8a', '#ff7aa8', '#ffb3c7', '#fff1e0', '#ffd45e', '#ff9a7a'];
  var PETAL = 'M0 0C-17-13-15-40 0-49C15-40 17-13 0 0Z';

  var stage = document.getElementById('stage');
  var garden = document.getElementById('garden');
  var card = document.getElementById('card');
  var opened = false;

  // Nhạc nền: Blue (yung kai), bản piano cover của Hyunjoo Jung
  var VIDEO_ID = '5v9qO37qp2U';
  var musicBtn = document.getElementById('music');
  var player = null, playerReady = false, wantPlay = false;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick() { return COLORS[Math.floor(Math.random() * COLORS.length)]; }

  // Biểu tượng bông hoa, vẽ một lần rồi dùng lại bằng <use>
  function buildSymbols() {
    var g = '<g id="fl" stroke="#0000001f" stroke-width="1">', i;
    for (i = 0; i < 8; i++) {
      g += '<path d="' + PETAL + '" fill="currentColor" transform="rotate(' + i * 45 + ')"/>';
    }
    for (i = 0; i < 8; i++) {
      g += '<path d="' + PETAL + '" fill="#fff" fill-opacity=".3" stroke="none" transform="rotate(' + (i * 45 + 22.5) + ') scale(.62)"/>';
    }
    g += '<circle r="9" fill="#ffd45e" stroke="none"/><circle r="3.6" fill="#e08a1e" stroke="none"/></g>';
    g += '<path id="pt" d="' + PETAL + '" fill="currentColor"/>';
    document.getElementById('defs').innerHTML = g;
  }

  // Cá nhân hóa qua đường dẫn: ?to=Các bạn nữ team Backend&from=Anh Nam
  function personalize() {
    var q = new URLSearchParams(location.search);
    var to = (q.get('to') || '').trim().slice(0, 50);
    var from = (q.get('from') || '').trim().slice(0, 40);
    document.getElementById('to').textContent = 'Gửi ' + (to || 'các bạn nữ ban Kỹ thuật') + ',';
    document.getElementById('from').textContent = from ? '— ' + from : '— Ban Kỹ thuật';
  }

  // Một bông hoa: thân mọc lên rồi hoa nở ở đầu thân
  function flower(xPx, size, h, delay, dim) {
    var f = document.createElement('div');
    f.className = 'f';
    f.style.cssText = '--x:' + xPx + 'px;--s:' + size + 'px;--h:' + h + 'px;--d:' + delay +
      's;--c:' + pick() + ';--dim:' + (dim || 1);
    f.innerHTML = '<i class="st"></i><svg class="b" viewBox="-50 -50 100 100" aria-hidden="true"><use href="#fl"/></svg>';
    garden.appendChild(f);
  }

  // Cả vườn hoa + cánh hoa rơi
  function plant() {
    var W = innerWidth, H = innerHeight;
    // Chiều cao tối đa để hoa không che lời chúc
    var avail = Math.max(90, H - card.getBoundingClientRect().bottom - 12);
    var rows = [
      { n: 8, s: [40, 58], dim: 0.72 },
      { n: 8, s: [52, 74], dim: 0.86 },
      { n: 7, s: [66, 92], dim: 1 }
    ];
    var k = 0;
    rows.forEach(function (r) {
      for (var j = 0; j < r.n; j++) {
        var size = Math.min(rnd(r.s[0], r.s[1]), W * 0.26);
        var x = (j + 0.5) / r.n * W + rnd(-0.35, 0.35) * W / r.n;
        var h = Math.max(50, rnd(0.3, 1) * (avail - size / 2));
        flower(x, size, h, 1.1 + k * 0.09 + rnd(0, 0.35), r.dim);
        k++;
      }
    });

    for (var n = 0; n < 12; n++) {
      var p = document.createElement('div');
      var s = rnd(12, 20);
      p.className = 'p';
      p.style.cssText = 'left:' + rnd(0, 96) + '%;width:' + s + 'px;--c:' + pick() +
        ';--t:' + rnd(10, 17) + 's;--d:' + rnd(3, 11) + 's';
      p.innerHTML = '<svg viewBox="-18 -50 36 50" width="' + s + '" height="' + s * 1.4 +
        '" aria-hidden="true"><use href="#pt"/></svg>';
      stage.appendChild(p);
    }
  }

  // Tải sẵn trình phát ngay khi vào trang để lúc chạm hoa là phát được liền
  function loadMusic() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = function () {
      player = new YT.Player('yt', {
        width: 200, height: 200, videoId: VIDEO_ID,
        playerVars: { playsinline: 1, controls: 0, rel: 0, disablekb: 1, loop: 1, playlist: VIDEO_ID },
        events: {
          onReady: function () {
            playerReady = true;
            if (wantPlay) player.playVideo();
          },
          onStateChange: function (e) {
            var playing = e.data === 1;
            musicBtn.classList.toggle('off', !playing);
            musicBtn.setAttribute('aria-label', playing ? 'Tắt nhạc' : 'Bật nhạc');
          },
          // Video không cho nhúng hoặc lỗi mạng: ẩn nút nhạc, trang vẫn chạy bình thường
          onError: function () { musicBtn.style.display = 'none'; }
        }
      });
    };
  }

  function toggleMusic() {
    if (!playerReady) { wantPlay = true; return; }
    if (player.getPlayerState() === 1) { player.pauseVideo(); } else { player.playVideo(); }
  }

  function open() {
    if (opened) return;
    opened = true;
    stage.classList.add('open');
    document.body.classList.add('open');
    plant();
    // Phát nhạc ngay trong lần chạm đầu tiên (trình duyệt điện thoại yêu cầu vậy)
    wantPlay = true;
    if (playerReady) player.playVideo();
  }

  buildSymbols();
  personalize();
  loadMusic();

  document.getElementById('seed').addEventListener('click', open);
  musicBtn.addEventListener('click', toggleMusic);

  // Sau khi mở: chạm đâu, hoa mọc ở đó
  stage.addEventListener('pointerdown', function (e) {
    if (!opened || e.target.closest('#seed') || e.target.closest('#music')) return;
    var h = Math.max(50, Math.min(innerHeight - e.clientY, innerHeight * 0.9));
    flower(e.clientX, rnd(50, 84), h, 0, 1);
  });
})();
