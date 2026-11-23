# stareControl

Webカメラから視線の相対的な動きと左右のウインクを検出する、視線コントローラの試作プロジェクトです。

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Colab_Pilot.ipynb)

## Colabで試す

上の **Open in Colab** をクリックし、セルを上から順に実行してください。

1. MediaPipeなどの依存パッケージをインストール
2. ブラウザでカメラへのアクセスを許可し、12秒間撮影
3. 顔・虹彩位置・目の開閉・左右ウインクの候補を解析
4. 注釈付き動画とグラフを確認し、CSVをダウンロード

**注意**: Colab版はPCのマウスを直接動かしません。視線は未校正の相対値であり、画面上の正確な座標ではありません。左右クリックの判定と左右の対応は試験的なものです。動画を公開しないようご注意ください。

## 使用技術

Python、OpenCV、MediaPipe Tasks API (Face Landmarker)、Google Colab

## 今後の予定

9点キャリブレーション、クリック誤検知の抑制、PySide6によるデスクトップGUIとOSカーソル制御。
