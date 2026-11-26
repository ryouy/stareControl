# stareControl

**学習済みモデル版を修正しました。** 上下左右の反転初期設定を変更し、**約10秒の5点補正**を追加しました。

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Pretrained_Gaze.ipynb)

**[学習済み視線推定・修正版をColabで開く](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Pretrained_Gaze.ipynb)**

カメラ開始 → **全画面** → **5点補正** の順に進めてください。中央・左・右・上・下の5点から、画面の向き・移動幅・軸間の混ざりを自動で補正します。長時間の個人学習は不要です。

**精度の限界**: 5点補正が調整するのは画面座標への変換だけで、Gaze360学習済みモデルの角度推定自体は変わりません。表示する補正誤差は学習データへの当てはまりで、未知の位置での精度ではありません。

## 学習済み版

- `stareControl_Pretrained_Gaze.ipynb` — Colabから別タブで起動する視線推定アプリ
- `web/pretrained.js` — ONNX Runtime Webで実行する視線推定コード
- `web/pretrained.html` — HTML入口（モデルファイルは別途必要）

## 詳細な学習を試す版

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Realtime_Calibration.ipynb)

9 / 25 / 49点の離散学習と、30 / 60 / 90秒の連続追従学習に対応します。

## 録画解析パイロット版

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ryouy/stareControl/blob/main/stareControl_Colab_Pilot.ipynb)

**注意**: 現時点では疑似クリックのみで、OSのマウスは操作しません。動画は録画・アップロードしません。Gaze360由来の重みの利用条件は商用利用前に確認してください。
