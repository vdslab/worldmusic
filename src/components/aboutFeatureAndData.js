import React, { useState } from "react";

const aboutFeatureAndData = () => {
  return (
    <div>
      <h1 className="title">＜用語説明について＞</h1>
      （以下の用語説明は
      <a
        href="https://developer.spotify.com/documentation/web-api/reference/#objects-index"
        target="_blank"
        rel="noopener noreferrer"
      >
        こちら
      </a>
      より直訳したものである。）
      <ul>
      <li><h2 className="subtitle is-5">acousticnessとは？</h2></li>
      <p>
        0.0から1.0までの値で、トラックがアコースティックかどうかを示す。1.0はトラックがアコースティックであるという評価が高いことを表す。
      </p>
      <li><h2 className="title is-5">danceabilityとは？</h2></li>
      <p>
        テンポ、リズムの安定性、ビートの強さ、全体的な規則性などの音楽要素の組み合わせに基づき、トラックがダンスにどの程度適しているかを示す。0.0は最も踊りやすくなく、1.0は最も踊りやすい。
      </p>
      <li><h2 className="title is-5">energyとは？</h2></li>
      <p>
        激しさと活発さを知覚できる程度の数字で表し、0.0から1.0までの値で計測する。通常、エネルギッシュなトラックは早く、大きく、ノイズが多いと感じる。例えば、デスメタルはエネルギーが高いのに対し、バッハの前奏曲は低くなっている。知覚できると判断される要素には、ダイナミックレンジ、音の大きさ、音色、出だし（頭子音）、および一般的なエントロピーが含まれる。
      </p>
      <li><h2 className="title is-5">instrumentalnessとは？</h2></li>
      <p>
        トラックにボーカルが含まれていないかどうかを予測する。なお、「Ooh」と「aah」の音は楽器として取り扱う。ラップやスポークンワード（喋り言葉）のトラックは明らかに「ボーカル」である。楽器性の値が1.0に近いほど、トラックにボーカルコンテンツが含まれていない可能性が高い。0.5を超える値は楽器性の高いトラックを表すが、値が1.0に近づくにつれ、評価が高い（ボーカルを含まない程度）ということを示す。
      </p>
      <li><h2 className="title is-5">livenessとは？</h2></li>
      <p>
        レコードのなかに聴衆の存在がどれくらいあるのかを検出する。値が高いほど、そのトラックがライブで演奏された可能性が高い。
        値が0.8
        を超す場合は、そのトラックがライブ（生演奏）である可能性が高いことを示す。
      </p>
      <li><h2 className="title is-5">loudnessとは？</h2></li>
      <p>
        音の強さ・大きさ、トラックの全体の音の強さ・大きさを示すデシベル数（dB）。値はトラック全体の平均値であり、相関するトラック（同じような感じのトラック）の音の強さ・大きさを比較するときに役立つ。主に物理的な強さ（大きさ）に心理的な相関をもたらす音の品質を指している。値は一般的には-60
        から 0 db までの範囲で示される。
      </p>
      <li><h2 className="title is-5">modeとは？</h2></li>
      <p>
        モードはトラックの様式（長調または短調）、すなわち旋律の音階を示す。長調は１で示され、短調は０で示される。
      </p>
      <li><h2 className="title is-5">speechinessとは？</h2></li>
      <p>
        そのトラックのなかにある話し言葉の存在を検出する。ただのスピーチ
        （トークショー、オーディオ
        ブック、詩等）に似ているような録音であるほど、値は 1.0 に近づく。 0.66
        を超える値は、完全に話し言葉でできているトラックであろうことを示す。
        0.33 から 0.66
        までの値は、セクションまたはレイヤーのいずれかで音楽とスピーチの両方を含み無可能性のあるトラック（ラップ音楽等の場合も含む）を表す。
        0.33
        未満の値であれば、そのトラックはほとんど音楽であり、言葉が含まれていないことの可能性が高くなる。
      </p>
      <li><h2 className="title is-5">tempoとは？</h2></li>
      <p>
        トラック全体で見込まれる毎分時のビート（BPM）。音楽用語では、テンポは特定の曲の速度またはペースを指し、ビートの持続時間の平均から導き出されるものである。
      </p>
      <li><h2 className="title is-5">time_signatureとは？</h2></li>
      <p>曲の長さを示す。</p>
      <li><h2 className="title is-5">valenceとは？</h2></li>
      <p>
        0.0から1.0までの値を用いてそのトラックの音楽的なポジティブさ（陽気さ）を示す。高いほどトラックはよりポジティブに聞こえ（例：幸せ、陽気、陶酔）、低いほどよりネガティブに聞こえる（例：悲しい、落ち込んだ、怒っている）。
      </p>
      </ul>
      <h1 className="title">＜データについて＞</h1>
      <p>
        <a
          href="https://spotifycharts.com/regional"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spotify Chart
        </a>
        にて世界各国のDailyやWeeklyのTop200やViral50のランキングデータがCSV形式でダウンロードできる。
        今回はそこからデータを集め、
        <a
          href="https://developer.spotify.com/documentation/web-api/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spotify API
        </a>
        を使用して可視化した。
      </p>
    </div>
  );
};

export default aboutFeatureAndData;

//ドロップダウンの場合↓
// const Explanation = (feature) => {
//   if (feature.feature === "acousticness") {
//     return (
//       <div>
//         <p>
//           0.0から1.0までの値で、トラックがアコースティックかどうかを示す。1.0はトラックがアコースティックであるという評価が高いことを表す。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "danceability") {
//     return (
//       <div>
//         <p>
//           テンポ、リズムの安定性、ビートの強さ、全体的な規則性などの音楽要素の組み合わせに基づき、トラックがダンスにどの程度適しているかを示す。0.0は最も踊りやすくなく、1.0は最も踊りやすい。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "energy") {
//     return (
//       <div>
//         <p>
//           激しさと活発さを知覚できる程度の数字で表し、0.0から1.0までの値で計測する。通常、エネルギッシュなトラックは早く、大きく、ノイズが多いと感じる。例えば、デスメタルはエネルギーが高いのに対し、バッハの前奏曲は低くなっている。知覚できると判断される要素には、ダイナミックレンジ、音の大きさ、音色、出だし（頭子音）、および一般的なエントロピーが含まれる。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "instrumentalness") {
//     return (
//       <div>
//         <p>
//           トラックにボーカルが含まれていないかどうかを予測する。なお、「Ooh」と「aah」の音は楽器として取り扱う。ラップやスポークンワード（喋り言葉？）のトラックは明らかに「ボーカル」である。楽器性の値が1.0に近いほど、トラックにボーカルコンテンツが含まれていない可能性が高い。0.5を超える値は楽器性の高いトラックを表すが、値が1.0に近づくにつれ、評価が高い（＝ボーカルを含まない程度）ということを示す。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "liveness") {
//     return (
//       <div>
//         <p>
//           活性（イキイキしているさま）レコードのなかに聴衆の存在がどれくらいあるのかを検出する。値が高いほど、そのトラックがライブで演奏された可能性が高い。
//           値が0.8
//           を超す場合は、そのトラックがライブ（生演奏）である可能性が高いことを示す。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "loudness") {
//     return (
//       <div>
//         <p>
//           音の強さ・大きさ、トラックの全体の音の強さ・大きさを示すデシベル数
//           （dB）。loudnessの値はトラック全体の平均値であり、相関するトラック（同じような感じのトラック）の音の強さ・大きさを比較するときに役立ちます。loudnessは、主に物理的な強さ（大きさ）に心理的な相関をもたらす音の品質を指している。値は一般的には
//           -60 から 0 db までの範囲で示される。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "mode") {
//     return (
//       <div>
//         <p>
//           モードはトラックの様式（長調または短調）、すなわち旋律の音階を示す。長調は１で示され、短調は０で示される。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "speechiness") {
//     return (
//       <div>
//         <p>
//           そのトラックのなかにある話し言葉の存在を検出する。ただのスピーチ
//           （トークショー、オーディオ
//           ブック、詩等）に似ているような録音であるほど、値は 1.0 に近づく。 0.66
//           を超える値は、完全に話し言葉でできているトラックであろうことを示す。
//           0.33 から 0.66
//           までの値は、セクションまたはレイヤーのいずれかで音楽とスピーチの両方を含み無可能性のあるトラック（ラップ音楽等の場合も含む）を表す。
//           0.33
//           未満の値であれば、そのトラックはほとんど音楽であり、言葉が含まれていないことの可能性が高くなる。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "tempo") {
//     return (
//       <div>
//         <p>
//           トラック全体で見込まれる毎分時のビート（BPM）。音楽用語では、テンポは特定の曲の速度またはペースを指し、ビートの持続時間の平均から導き出されるものである。
//         </p>
//       </div>
//     );
//   } else if (feature.feature === "time_signature") {
//     return (
//       <div>
//         <p>曲の長さ</p>
//       </div>
//     );
//   } else if (feature.feature === "valence") {
//     return (
//       <div>
//         <p>
//           0.0から1.0までの値を用いてそのトラックの音楽的なポジティブさ（陽気さ）を示す。高いほどトラックはよりポジティブに聞こえ（例：幸せ、陽気、陶酔）、低いほどよりネガティブに聞こえる（例：悲しい、落ち込んだ、怒っている）。
//         </p>
//       </div>
//     );
//   }
// };

// const aboutFeature = () => {
//   const [feature, setFeature] = useState("acousticness");
//   const elements = [
//     "acousticness",
//     "danceability",
//     "energy",
//     "instrumentalness",
//     "liveness",
//     "loudness",
//     "mode",
//     "speechiness",
//     "tempo",
//     "time_signature",
//     "valence",
//   ];
//   return (
//     <div>
//       <select
//         onChange={(event) => {
//           setFeature(event.target.value);
//         }}
//       >
//         {elements.map((element, i) => {
//           return <option key={i}>{element}</option>;
//         })}
//       </select>
//       <h2 class="title is-2">{feature}とは？</h2>
//       <Explanation feature={feature} />
//     </div>
//   );
// };
