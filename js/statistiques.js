google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawRightChart);
google.charts.setOnLoadCallback(drawLeftChart);

let option_stats = {
  title: 'Commandes passés',
  hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
  vAxis: {minValue: 0}
};

function drawLeftChart()
{
  if ($("#inputObjectSelect").val() == "1") {
    console.log("test1");
    drawChartId1();
  }
  else if ($("#inputObjectSelect").val() == "2") {
    console.log("test2");
    drawChartId2();
  }
  else if ($("#inputObjectSelect").val() == "3") {
    console.log("test3");
    drawChartId3();
  }
}


function drawChartId1() {
  google.charts.load('current', {'packages':['corechart']});
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Déjeuner', 'Diner'],
    ['2013',  30,      10],
    ['2014',  70,      20],
    ['2015',  20,      35],
    ['2016',  26,      15]
  ]);

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div_left'));
  chart.draw(data, option_stats);
}

function drawChartId2() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Déjeuner', 'Diner'],
    ['2013',  33,      15],
    ['2014',  37,      20],
    ['2015',  22,      30],
    ['2016',  20,      10]
  ]);

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div_left'));
  chart.draw(data, option_stats);
}

function drawChartId3() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Déjeuner', 'Diner'],
    ['2013',  33,      12],
    ['2014',  37,      25],
    ['2015',  22,      50],
    ['2016',  20,      18]
  ]);

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div_left'));
  chart.draw(data, option_stats);
}


function drawRightChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Déjeuner', 'Diner'],
    ['2013',  1000,      400],
    ['2014',  1170,      460],
    ['2015',  660,       1120],
    ['2016',  1030,      540]
  ]);

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div_right'));
  chart.draw(data, option_stats);
}

$("#inputObjectSelect").change(drawLeftChart);
console.log("test1");
