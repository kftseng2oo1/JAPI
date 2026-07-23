# 木質節拍器 · Metronome

木質質感的節拍器 PWA，可離線使用、可加入手機主畫面。

## 功能特色

- 🎼 Web Audio API 精準排程（lookahead scheduler），長時間播放不會漂移
- 🪵 視覺化黃銅擺針，擺動速度與弧度隨 BPM 連動
- 👆 點按抓拍（tap tempo）、拍號選擇（2/4、3/4、4/4、6/8）
- 🔔 三種音色（木魚 / 電子嗶聲 / 清脆鈴音），重拍自動疊加高音提示
- ⏱ 練習定時器（5–30 分鐘可選，時間到自動停止並震動提示）
- 🎵 音符動畫、拍點光暈隨拍子跳動
- ⌨️ 鍵盤快捷鍵（空白鍵播放/暫停、上下鍵調整 BPM）
- 📳 觸覺回饋（Android 支援，iOS Safari 因平台限制不支援 Vibration API）
- 📴 Service Worker 離線快取，可完全離線使用

## 檔案結構

```
metronome-pwa/
├── index.html      ← 主程式
├── manifest.json   ← PWA 安裝設定
├── sw.js           ← Service Worker（離線快取）
├── icon-192.png    ← App 圖示 192px
└── icon-512.png    ← App 圖示 512px
```

## 上傳到 GitHub

1. 建立新 repo（例如 `metronome`）
2. 把這五個檔案全部拖曳上傳到 repo 根目錄，commit
3. Settings → Pages → Source 選擇 `main` branch / root
4. 幾分鐘後即可透過 `https://kftseng2oo1.github.io/metronome/` 使用

## 安裝為 App

1. 用手機瀏覽器開啟上方網址
2. iOS Safari：點選「分享」→「加入主畫面」
3. Android Chrome：點選「安裝應用程式」

## 本地執行

直接開啟 `index.html` 即可，不需要伺服器；若要測試 Service Worker 離線快取，需透過本機伺服器（例如 `python3 -m http.server`）或部署後在 HTTPS 環境下測試。
