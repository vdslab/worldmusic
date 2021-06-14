let table;
const year = "2021";
const country = "Global";
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
  "streams",
  "tempo",
  "time_signature",
  "valence",
];

function preload() {
  table = loadTable(filename, "csv", "header");
}

function setup() {
  let c = createCanvas(1200, 600);

  noLoop();
  for (let f = 0; f < features.length; f++) {
    background(255);
    const streams = new Array(table.getRowCount());
    const value = new Array(table.getRowCount());
    for (let i = 0; i < table.getRowCount(); ++i) {
      streams[i] = int(table.getColumn("streams")[i]);
      value[i] = parseFloat(table.getColumn(features[f])[i]);
    }
    fill(0, 0, 0);
    line(125, 0, 125, 550);
    line(0, 520, 1200, 520);
    text("streams", 0, windowHeight / 4, 70, 80);
    text(features[f], windowWidth / 2, 590, 70, 80);
    const bins = createBins(streams, value, min(value), max(value), 50);
    drawHistogram(bins, value);
    saveCanvas(c, country + year + features[f]);
  }
}
function draw() {}

function createBins(streams, value, minValue, maxValue, numBins) {
  const bins = new Array(numBins);
  bins.fill(0);
  for (let i = 0; i < streams.length; ++i) {
    const j = int(((value[i] - minValue) * numBins) / (maxValue - minValue));
    // print(values_aco[i]);
    if (0 <= j && j < numBins) {
      bins[j] += streams[i];
    } else if (j == numBins) {
      bins[numBins - 1] += streams[i];
    }
  }
  print(bins);
  return bins;
}
function drawHistogram(bins, value) {
  const binWidth = 20;
  const binMax = max(bins);
  for (let i = 0; i < bins.length; ++i) {
    const binHeight = ((height * bins[i]) / binMax) * 0.8;
    fill(0, 0, 255);
    line(binWidth * i + 125, 520, binWidth * i + 125, 530);
    rect(binWidth * i + 125, height - binHeight - 80, binWidth, binHeight);
  }
  line(binWidth * bins.length + 125, 520, binWidth * bins.length + 125, 530);
  y = max(bins) / 10;
  for (let i = 0; i < 10; i++) {
    fill(0, 0, 0);
    text(
      parseInt(y * (i + 1), 10),
      50,
      520 - ((height * 0.8) / 10) * (i + 1) - 8,
      50,
      15
    );
    line(
      115,
      520 - ((height * 0.8) / 10) * (i + 1),
      125,
      520 - ((height * 0.8) / 10) * (i + 1)
    );
  }

  diff = (max(value) - min(value)) / 50;
  s = min(value);
  for (let i = 0; i <= bins.length; ++i) {
    push();
    translate(binWidth * i + 125, 535);
    rotate(radians(90));
    text(s, 0, 0);
    pop();
    s += diff;
  }
}
