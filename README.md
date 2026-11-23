# stareControl

通常のWebカメラからリアルタイムで視線位置を推定する、視線コントローラの実験プロジェクトです。細目クリック（疑似クリック）と多点・連続キャリブレーションに対応します。

## Colabで開く

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)

**[最新版のリアルタイム学習ノートブック](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)**

ノートブックを上から実行し、最後のセルから**別タブの専用画面**を開いてください。カメラ開始後、全画面に切り替えてから学習するのがおすすめです。

### 学習方法

| モード | 動作 |
| --- | --- |
| **離散点学習** | 画面の **9・25・49点** を約1.6秒ずつ見つめる |
| **連続追従学習** | 画面を移動する目標点を **30・60・90秒** 追いかける |
| **両方学習** | 離散学習の後に連続追従学習を実行 |
| **追加学習** | 過去のサンプルに新しいサンプルを追加してモデルを再計算 |

標準は**25点＋60秒**です。学習中の中止は **Esc** または右上の「学習を中止」。学習サンプルCSVで、目標座標・目の特徴量・学習モードを保存できます。再実行時にも同一セッション内の学習データを使います。「学習データを初期化」で消去できます。

学習した視線位置は緑の点で表示します。両目を軽く細めて約0.45秒維持すると疑似クリックになります。

### 精度・プライバシーに関する注意

普通のWebカメラでは画面位置の推定に限界があります。表示される「学習内の平均誤差」は**学習データへの当てはまり**であり、未学習位置の精度を示す検証結果ではありません。連続追従では視線の遅れを約140msと仮定してラベルを補正しています。

動画を録画・アップロードするコードはなく、学習サンプルはブラウザメモリ上に保持します。CSVは明示的に保存したときのみ出力されます。外部CDNからMediaPipeの実行コードとモデルを読み込みます。

## リポジトリ構成

- `stareControl_Realtime_Calibration.ipynb` — 独立タブの実験用Colab（JavaScript全文を収録）
- `web/realtime.js` — リアルタイム解析、学習、GUIの本体
- `index.html` — 静的ホスティング用HTML
- `stareControl_Colab_Pilot.ipynb` — 以前の録画解析実験

**制限:** 現在は画面内の疑似クリックのみで、OSマウスは直接操作しません。
