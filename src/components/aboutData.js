import React, { useState } from "react";

const aboutData = () => {
  return (
    <div>
      <p>
        <a href="https://spotifycharts.com/regional" target="_blank" rel="noopener noreferrer">Spotify Chart</a>にて世界各国のDailyやWeeklyのTop200やViral50のランキングデータがCSV形式でダウンロードできる。
        今回はそこから今回対象とした国のみのデータを集め、<a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify API</a>を使用して可視化した。
        （対象国：アメリカ、日本、イギリス、ドイツ、フランス、カナダ、オーストラリア、オランダ）
      </p>
    </div>
  );
};

export default aboutData;