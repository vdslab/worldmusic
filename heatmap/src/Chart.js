import * as d3 from 'd3';

function Chart(){
    // データの準備
    const width = 1200; // グラフの幅
    const height = 800; // グラフの高さ
    const n = 30;
    // const m　= 20;
    const matrix = new Array(n);
    for(let i=0; i<n; i++){
        matrix[i] = new Array(n);
        for(let j=0; j<n; j++){
            matrix[i][j] = Math.random();
        }
    }

    // SVG領域の設定
    const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    const g = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");

    // スケールの設定
    const scale = d3   
        .scaleBand()
        .rangeRound([0, d3.min([width, height])])
        .domain(d3.range(n));
    const color = d3.scaleSequential(
        function(t) { return d3.interpolate("white", "steelblue")(t);}
        )
        .domain([0, d3.max(matrix, function(row) {return d3.max(row) })]);
    
    // ヒートマップ作成
    g.selectAll(".row")
        .data(matrix)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) {return "translate(0," + scale(i) + ")";})
        .selectAll(".cell")
        .data(function(d){return d})
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("x", function(d, i){return scale(i); })
        .attr("width", scale.bandwidth())
        .attr("height", scale.bandwidth())
        .attr("opacity", 0.9)
        .attr("fill", function(d) {return color(d);});
    
        return [];
}

export default Chart;