const FeatureVis = () => {
  return (
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Top1</p>
          {/*<Song id={'67BtfxlNbhBmCDR2L2l8qd'} /> みたいにidを変数として渡すとか？*/}
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Top2</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Top3</p>
        </article>
      </div>
    </div>
  );
};

export default FeatureVis;
