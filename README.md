# stareControl

通常のWebカメラから視線位置を推定し、目を軽く細めた操作を疑似クリックとして認識する実験プロジェクトです。

## リアルタイム版（専用タブで開く）

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)

**[リアルタイム版をColabで開く](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)**

1. Colabで**上からすべてのセルを実行**する
2. 最後のセルに出る `https://localhost:...` の**Colab転送リンク**をクリックする
3. **別タブの専用画面**でカメラ使用を許可する
4. 「全画面」→「9点学習」で表示される9点を約2秒ずつ見る
5. 緑色の点で視線推定を確認し、**両目を軽く細めて約0.45秒維持**すると疑似クリック
6. 必要ならクリック感度・維持時間を調整し、CSV保存

### Colabセル内では表示しない理由

Colabの `display(Javascript(...))` はセル出力の小さなフレームに画面が収まってしまい、カメラ・学習点が切れることがあります。修正版はPythonの簡易Webサーバーと `output.serve_kernel_port_as_window` で独立したタブへ切り出しています。Colabのランタイムを切断すると専用画面も停止します。

**ノートブックの中に実装本体（JavaScript）も収録済み**です。11行の起動処理だけでなく、全文をColabで編集・検証できます。

### 直接表示用HTML

`index.html` は同じリアルタイムUIの静的HTMLです。GitHub PagesなどHTTPSの静的ホスティングを有効にするとColabなしで開けます。ただしPagesで公開していないリポジトリでは直接アクセスできません。

### 制限

一般的なWebカメラによる視線推定は近似値で、照明・姿勢などに左右されます。OSのマウスポインタは動かしません。映像を録画・サーバーに送信する実装はありません。MediaPipeのモデルとライブラリは外部CDNから読み込みます。

## 録画解析パイロット版

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Colab_Pilot.ipynb)

以前の12秒の録画動画解析を行う実験ノートブックです。

## 構成

- `stareControl_Realtime_Calibration.ipynb`: リアルタイム専用画面と全実装コードを含むColab版
- `web/realtime.js`: Web版実装の原本
- `index.html`: 静的ホスティング用の専用画面
- `stareControl_Colab_Pilot.ipynb`: 録画解析の旧実験版
