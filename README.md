# stareControl

通常のWebカメラで視線方向と目の動きを推定するプロジェクトです。

## リアルタイム版（おすすめ）

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)

**[リアルタイム版をColabで開く](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)**

1. セルを実行し、表示された「カメラを開始」を押す
2. 全画面にして「9点学習」を選ぶ
3. 指示された位置の点を順番に約2秒ずつ見つめる
4. 学習完了後、緑色の点で推定視線位置を確認する
5. 両目を軽く細めた状態を約0.45秒保って**疑似クリック**する
6. 感度・維持時間を調整し、必要に応じてCSV保存

ブラウザ内でMediaPipe Tasks Vision APIを実行するため、録画してから解析する方式ではありません。Webカメラ映像はサーバーへ送らず、ブラウザ内で推論します（モデルとライブラリは外部CDNから読み込みます）。

**制約:** 視線座標は9点で学習した近似値です。精度はカメラ・照明・姿勢に左右されます。クリックは可視化のみで、OSのポインタやクリックを操作しません。カメラを使うため、Chrome等でカメラ許可が必要です。

## 録画解析パイロット版

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Colab_Pilot.ipynb)

録画した12秒の動画をTasks APIで解析する初期バージョンです。

## ファイル

- `stareControl_Realtime_Calibration.ipynb` — リアルタイム視線推定・9点キャリブレーション
- `web/realtime.js` — ブラウザ側のMediaPipe処理・UI・学習・疑似クリック
- `stareControl_Colab_Pilot.ipynb` — 以前の録画解析実験

## 開発方針

将来はPySide6によるデスクトップGUIに移行し、OSのカーソル制御、個人別閾値校正、視線推定の精度評価を行います。
