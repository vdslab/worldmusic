let table;
const year = "2021";
const country = "Netherland";
const filename = country + year + ".csv";

const features = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "loudness",
  "mode",
  "speechiness",
  "tempo",
  "valence"
];

function preload() {
  table = loadTable(filename, "csv", "header");
}

function setup() {
  let x = 800;
  let y = 700;
  let c = createCanvas(x,y);

  noLoop();
  for (let f = 0; f < features.length; f++) {
    background(255);
    const streams = new Array(table.getRowCount());  //行数分の配列
    const value = new Array(table.getRowCount());
    for (let i = 0; i < table.getRowCount(); ++i) {
      streams[i] = int(table.getColumn("streams")[i]); //streamの値を代入
      value[i] = parseFloat(table.getColumn(features[f])[i]); //valueの値を代入
      //print(streams[i],value[i])
    }
    fill(0, 0, 0);
    line(125, 0, 125, 650);  //縦軸
    line(0, 620, 1200, 620); //横軸
    text("streams", 0, y / 2, 70, 80);
    text(features[f], x / 2, 60, 70, 80);
    const bins = createBins(streams, value, min(value), max(value), 40); // binsの値:スタージェスの公式だとint(Math.log2(table.getRowCount()))だけど値が9と小さ過ぎる？
    drawHistogram(bins, value);
    //print(min(value), max(value));
    //print(int(Math.log2(table.getRowCount())));
    //saveCanvas(c, country + year + features[f]);
  }
}
function draw() {}

function createBins(streams, value, minValue, maxValue, numBins) {
  const bins = new Array(numBins); //bins分
  bins.fill(0);
  for (let i = 0; i < streams.length; ++i) {
    const j = int(((value[i] - minValue) * numBins) / (maxValue - minValue));
    if (0 <= j && j < numBins) {
      bins[j] += streams[i];
    } else if (j == numBins) {
      bins[numBins - 1] += streams[i];
    }
  }
  print(bins);
  return bins;
}
function drawHistogram(bins, value) { //ヒストグラムの描画
  const binWidth = 15;
  const binMax = max(bins);
  for (let i = 0; i < bins.length; ++i) {
    const binHeight = ((height * bins[i]) / binMax) * 0.8;
    //print("テスト",binHeight,binMax,bins[i])
    if(bins[i] === binMax){
      fill(155,212,163);
    }else if(bins[i] < (binMax/4)){
      fill(255,241,0);
    }else if(bins[i] < (binMax/2)){
      fill(255,165,0)
    }else{
      fill(48,126,184);
    }
    line(binWidth * i + 125, 620, binWidth * i + 125, 630);
    rect(binWidth * i + 125, height - binHeight - 80, binWidth, binHeight);
  }
  line(binWidth * bins.length + 125, 620, binWidth * bins.length + 125, 630);
  y = max(bins) / 10;
  for (let i = 0; i < 10; i++) {
    fill(0, 0, 0);
    text(
      parseInt(y * (i + 1), 10),
      50,
      620 - ((height * 0.8) / 10) * (i + 1) - 8,
      50,
      15
    );
    line(
      115,
      620 - ((height * 0.8) / 10) * (i + 1),
      125,
      620 - ((height * 0.8) / 10) * (i + 1)
    );
  }

  diff = (max(value) - min(value)) / 40;
  s = min(value);
  for (let i = 0; i <= bins.length; ++i) {
    push();
    translate(binWidth * i + 125, 635);
    rotate(radians(60));
    text(s, 0, 0);
    pop();
    s += diff;
    if(max(value) < s ){
      break;
    }
  }
}