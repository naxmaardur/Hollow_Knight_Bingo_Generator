const fs = require('fs');
const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;

const gridLayout = [
	2,3,1,1,2,
	3,1,2,2,1,
	1,2,4,2,1,
	2,1,2,1,3,
	1,2,1,3,2
];
		
const BingoJson = require('./HollowKnightBingo_new.json');
const Dif = [null, MakeListOfDifficulty(1), MakeListOfDifficulty(2), MakeListOfDifficulty(3), MakeListOfDifficulty(4)];
const Finallist =  Array(25);
 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Nothing');
});

server.listen(port, hostname, () => {
  //Run generator;
  var ObjectHolder = RandomPropertyAndRemove(Dif[4]);
  RemoveExclusions(ObjectHolder["excludes"]);
  var Entry = {};
  Entry.name = ObjectHolder.name;
  Finallist[12] = Entry;
  for(var i = 0; i < gridLayout.length; i++){
	  if(gridLayout[i] !== 4){
		var result = RandomPropertyAndRemove(Dif[gridLayout[i]]);
		RemoveExclusions(result["excludes"]);
		Finallist[i] = {name: result.name};
	  }
  }

   var str = JSON.stringify(Finallist);
	fs.writeFile('Output.txt', str, (err) => {
        console.log(str);
        // In case of a error throw err.
        if (err) throw err;
    });
});

server.close();

function MakeListOfDifficulty(dif) {
	var list = {};
	for (const key in BingoJson) {
		if(BingoJson[key]['Difficulty'] == dif){
			list[key] =BingoJson[key];
		}
	};
	return list;
}

function RemoveExclusions(exclusions) {
	if (exclusions && exclusions.length > 0) {
		for (let i = 1; i <= 3; i++) {
			for (const key of exclusions) {
				delete Dif[i][key];
			}
		}
	}
}	

function RandomPropertyAndRemove(obj) {
    var keys = Object.keys(obj);
	var keyIndex = keys.length * Math.random() << 0;
	var result = obj[keys[keyIndex]];
	result = VariateResult(result);
	delete obj[keys[keyIndex]];
    return result;
};

function VariateResult(result) {
	if (result.name.includes("%") && result.variations != null){
		var index = result.name.indexOf("%");
		var randomVariation = result.variations[result.variations.length * Math.random() << 0];
		result.name = result.name.slice(0, index) + randomVariation + result.name.slice(index + 1);
	}
	return result;
}
			


