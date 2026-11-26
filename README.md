# stareControl

Webカメラで視線方向を推定し、目を細めて疑似クリックする実験アプリです。実験用のGoogle Colabノートブックを公開しています。

## 1. 学習済みモデル版（簡単・おすすめ）

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Pretrained_Gaze.ipynb)

**[学習済みモデル版をColabで開く](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Pretrained_Gaze.ipynb)**

自分で大量の学習をする必要はありません。公開済みの **Gaze360** 学習済み **MobileOne S0（ONNX）** をColab実行時にダウンロードします。

**使い方：**
1. Colabでセルを上からすべて実行する（初回はGitHub配布のONNXモデルを取得）
2. 最後のセルから**別タブ**の専用画面を開く
3. 「カメラを開始」だけで、視線の **Yaw / Pitch（角度）** をリアルタイムに推定
4. 画面位置への概算表示を補正したい場合だけ、「全画面」→「中央だけ補正」で約3秒間中央を見る
5. 視線の緑色の点を確認し、必要なら感度や左右・上下反転を調整する

**重要：** モデルが予測するのは視線の方向（角度）であり、モニター上の正確なXY座標ではありません。緑色の点は角度からの**概算マッピング**です。正確なカーソル操作には端末・顔位置に対応する補正が別途必要です。OSのマウスは動かず、細目クリックも画面内の疑似クリックです。

重みは [MobileGaze](https://github.com/yakhyo/gaze-estimation) の公開配布元からダウンロードします。ソースコードのMITライセンスと学習済み重みの利用条件は別です。特に **Gaze360で学習した重みは研究・非商用用途を前提**とし、商用化前に元データの規約と重みの再配布条件を確認してください。モデルの重み自体はこのリポジトリに同梱していません。

## 2. 自分の目で学習する多点・連続学習版

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)

9 / 25 / 49点の離散学習と、30 / 60 / 90秒の連続追従学習に対応しています。モデルを比較したい場合や、精密な個人調整の実験に使用できます。

## 3. 録画解析パイロット版

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Colab_Pilot.ipynb)

## リポジトリ構成

- `stareControl_Pretrained_Gaze.ipynb` — 学習済みモデル版（最初に試すもの）
- `web/pretrained.js` — ONNX Runtime WebとMediaPipeを使うリアルタイム推論UI
- `web/pretrained.html` — Web配信向けのHTML（モデル重みを別途配置する必要あり）
- `stareControl_Realtime_Calibration.ipynb` — 従来の多点・連続学習版
- `web/realtime.js` — 多点・連続学習の実装本体
- `stareControl_Colab_Pilot.ipynb` — 録画解析パイロット版

**プライバシー:** カメラ映像の録画やアップロードは行いません。ブラウザ内で推論します。外部CDNから必要なライブラリとモデルを取得します。CSVの保存は明示的な操作が必要です。
