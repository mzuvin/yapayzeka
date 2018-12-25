
function getDistanceFromLatLongInKm(originLat, originLong, destinationLat, destinationLong) {

  var Radius = 6371; // dünya yarıçapı km 
  var dLat = deg2rad(destinationLat-originLat);
  var dLong = deg2rad(destinationLong-originLong);
  var a =Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(originLat)) * Math.cos(deg2rad(destinationLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var result = Radius * c;// KM cinsinden mesafe 
  return result;
}

function deg2rad(mDeg) {
  // Açıları dereceden radyana dönüştürme
  return mDeg* (Math.PI/180)
}


var centerLng = 45.9237753;//
var centerLat = 22.776915;


var map = L.map('map').setView([centerLng,centerLat], 6);
var buffer = 0.04;
var collection = [];
var geojsonlist = [];


//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
//http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '<a style="color:#000" target="_blank" href="https://ciftklik.net">CiftKlik</a> | <a style="color:#000" href="https://github.com/mzuvin">@mzuvin</a>'}).addTo(map);

nodes = {
  '0':{coord:[46.18333, 21.31667]},
  '1':{coord:[44.43225, 26.10626]},
  '2':{coord:[44.31667, 23.8]},
  '3':{coord:[44.63194, 22.65611]},
  '4':{coord:[44.02294, 28.64943]},
  '5':{coord:[45.8,24.9666667]},
  '6':{coord:[43.88333, 25.96667]},
  '7':{coord:[44.6879671,27.936559]},
  '8':{coord:[47.16667, 27.6]},
  '9':{coord:[45.68861, 21.90306]},
  '10':{coord:[44.904114, 22.364516]},
  '11':{coord:[46.9888178,25.894136]},
  '12':{coord:[47.0746904,21.8674042]},
  '13':{coord:[44.8560255,24.8384834]},
  '14':{coord:[45.1028554,24.3167777]},
  '15':{coord:[45.8, 24.15]},
  '16':{coord:[45.741163,21.1465497]},
  '17':{coord:[44.7206168,26.6284666]},
  '18':{coord:[46.63333, 27.73333]},
  '19':{coord:[46.624256,21.5091705]},
};

isimler=["Arad","Bucharest","Craiova","Dobreta","Eforie","Fagaras","Giurgiu","Hirsova","Iasi","Lugoj",
"Mehadia","Neamt","Oradea","Pitesti","Rimnicu","Sibiu","Timisoara","Urziceni","Vaslui","Zerind"];


//var kusMesafe=[366,0,160,242,161,178,77,151,226,244,241,234,380,98,193,253,329,80,199,374];
function hn(hedef) {
  // sezgisel fonksiyon.
  var hedef=nodes[hedef].coord;
  var kusMesafeDizi=[];
  for(var i in nodes){
    var uzaklik=getDistanceFromLatLongInKm(nodes[i].coord[0],nodes[i].coord[1],hedef[0],hedef[1]);
    kusMesafeDizi.push(parseInt(uzaklik.toFixed(0)));
  }
  return kusMesafeDizi;

}

function uzaklikgetir(bas,son){
  var uzaklik=getDistanceFromLatLongInKm(nodes[bas].coord[0],nodes[bas].coord[1],nodes[son].coord[0],nodes[son].coord[1]);
  return parseInt(uzaklik.toFixed(0));
}

function showStartFinish(start,finish){
  L.circleMarker(nodes[start].coord,{radius:8,color:"#00ff00",fillOpacity:1}).bindPopup("start: "+isimler[start]+""+start+'').addTo(map);
  L.circleMarker(nodes[finish].coord,{radius:8,color:"#ff0000",fillOpacity:1}).bindPopup('finish: '+isimler[finish]+finish+'').addTo(map);
}

function showNodes(nodes){
  for(var a in nodes){
   // L.circleMarker(nodes[a].coord,{radius:5,color:"#0000ff",fillOpacity:1}).bindPopup(a+"."+isimler[a]).addTo(map);
   L.marker(nodes[a].coord).addTo(map).bindPopup(a+"."+isimler[a]).openPopup();
 }
}
showNodes(nodes);

function yollariciz(coord) {
  L.polyline(coord, {color: 'red', weight: 1}).addTo(map);
}
var yollar=[6,1,5,15,12,19,0,15,0,16,9,10,3,2,13,14,15,14,2,13,1,17,7,4,4,7,17,18,8,11];

yollardizi2 = [];
for(i in yollar){
  yollardizi2.push(nodes[yollar[i]].coord);
}

yollariciz(yollardizi2);

var basicGraph = [
  {start:"0",finish:"19",distance:75},
  {start:"19",finish:"0",distance:75},
  {start:"19",finish:"12",distance:71},
  {start:"12",finish:"19",distance:71},
  {start:"12",finish:"15",distance:151},
  {start:"15",finish:"12",distance:151},
  {start:"0",finish:"15",distance:140},
  {start:"15",finish:"0",distance:140},
  {start:"0",finish:"16",distance:118},
  {start:"16",finish:"0",distance:118},
  {start:"16",finish:"9",distance:111},
  {start:"9",finish:"16",distance:111},
  {start:"9",finish:"10",distance:70},
  {start:"10",finish:"9",distance:70},
  {start:"10",finish:"3",distance:75},
  {start:"3",finish:"10",distance:75},
  {start:"3",finish:"2",distance:120},
  {start:"2",finish:"3",distance:120},
  {start:"15",finish:"0",distance:140},
  {start:"2",finish:"13",distance:138},
  {start:"13",finish:"2",distance:138},
  {start:"2",finish:"14",distance:146},
  {start:"14",finish:"2",distance:146},
  {start:"14",finish:"13",distance:uzaklikgetir(14,13)},
  {start:"15",finish:"5",distance:99},
  {start:"5",finish:"15",distance:99},
  {start:"15",finish:"14",distance:80},
  {start:"14",finish:"15",distance:140},
  {start:"5",finish:"1",distance:211},
  {start:"1",finish:"5",distance:211},
  {start:"13",finish:"1",distance:101},
  {start:"1",finish:"6",distance:90},
  {start:"6",finish:"1",distance:90},
  {start:"1",finish:"17",distance:uzaklikgetir(1,17)},
  {start:"17",finish:"1",distance:uzaklikgetir(17,1)},
  {start:"17",finish:"18",distance:uzaklikgetir(17,18)},
  {start:"18",finish:"17",distance:uzaklikgetir(18,17)},
  {start:"18",finish:"8",distance:uzaklikgetir(18,8)},
  {start:"8",finish:"18",distance:uzaklikgetir(8,18)},
  {start:"8",finish:"11",distance:uzaklikgetir(8,11)},
  {start:"11",finish:"8",distance:uzaklikgetir(11,8)},
  {start:"17",finish:"7",distance:uzaklikgetir(17,7)},
  {start:"7",finish:"17",distance:uzaklikgetir(7,17)},
  {start:"7",finish:"4",distance:uzaklikgetir(7,4)},
  {start:"4",finish:"7",distance:uzaklikgetir(14,13)}
];

function readyGraph(paths) {

  var graph = {};
  for(var i in paths){
    var path = paths[i];
    var start=path["start"];
    var finish=path["finish"];
    var distance=path["distance"];
    if(typeof graph[start]=="undefined"){
      graph[start]={};
      graph[start][finish]=distance;
    }else{
      graph[start][finish]=distance;
    }
    if(typeof graph[finish]=="undefined"){
      graph[finish]={};
      graph[finish][start]=distance;
    }else{
      graph[finish][start]=distance;
    }
  }
  return graph;
}

function indexsiragetir(test){
  var result = Array.from(Array(test.length).keys()).sort((a, b) => test[a] < test[b] ? -1 : (test[b] < test[a]) | 0);
  console.log(result);
  return result;
}

function enkisa(arr){
  var len = arr.length
  var min = Infinity;
  var index;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
      console.log("en kücük"+min);
      index = len;
    }
  }
  var obj = {
     min:  min,
     index: index,
     il: isimler[index]
  };
  return obj;

}

yol=readyGraph(basicGraph);
yoltoplami=0;
gidilen=[];
gercekdeger=0;

function astar(start,finish){
  console.log(gidilen);
  secim=[];
  for(var i in gidilen){
    if(gidilen.length>1){
      if(typeof gidilen[parseInt(i)+1]!='undefined')
       yoltoplami+=yol[gidilen[i]][gidilen[parseInt(i)+1]];  
     }
     
   }

  for(var i in yol[start]){
    gercekdeger=yol[start][i];
    secim[i]=kusMesafe[i]+gercekdeger+yoltoplami;
  }

  for(var j in gidilen){
    console.log(secim[gidilen[j]]);
    delete secim[gidilen[j]];
  }

  console.log("secim"+secim)
  obje=enkisa(secim);
  yeniRota=obje.index;
  gidilen.push(start);
  console.log(yeniRota + " "+ isimler[yeniRota]);
  if(yeniRota!=finish){
    //debugger;
    astar(yeniRota,finish);
  }
  if(yeniRota==finish){
    gidilen.push(yeniRota);
    return;
  }

}

function gbfs(start,finish){

  console.log(gidilen);
  secim=[];
  for(var i in yol[start]){
    secim[i]=kusMesafe[i];
  }
  
  for(var j in gidilen){
    console.log(secim[gidilen[j]]);
    delete secim[gidilen[j]];
  }
    //console.log(secim);

  console.log("secim"+secim)
  obje=enkisa(secim);
  yeniRota=obje.index;
  gidilen.push(start);
  console.log(yeniRota + " "+ isimler[yeniRota]);
  if(yeniRota!=finish){
    //debugger;
    gbfs(yeniRota,finish);
  }
  if(yeniRota==finish){
    gidilen.push(yeniRota);
    return;
  }

}

function showPath(start,path){
  lineCoords = [];
  lineCoords.push(nodes[start].coord);
  for(var i=0;i<path.length;i++){
    var nodeName =path[i];
    lineCoords.push(nodes[nodeName].coord);
  }

  var polyline = L.polyline(lineCoords, {color: 'blue'}).addTo(map);
}

bas=0;
son=0;
function ciz(bas,son){
 //astar 
 kusMesafe=hn(son);
 astar(bas,son);
 showPath(bas,gidilen);
 showStartFinish(bas,son);
}

function ciz2(argument) {
  //greddy best first search
  kusMesafe=hn(son);
  gbfs(bas,son);
  showPath(bas,gidilen);
  showStartFinish(bas,son);
}