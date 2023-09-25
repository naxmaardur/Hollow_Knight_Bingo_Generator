
const fs = require('fs');
const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;

const gridLayout = [2,3,1,1,2,
			  3,1,2,2,1,
			  1,2,4,2,1,
			  2,1,2,1,3,
			  1,2,1,3,2];
		
const BingoJson = require('./HollowKnightBingo_new.json');
//console.log(BingoJson);

const Dif1 = MakeListOfDifficulty(1);
const Dif2 = MakeListOfDifficulty(2);
const Dif3 = MakeListOfDifficulty(3);
const Dif4 = MakeListOfDifficulty(4);

const Finallist =  [,,,,,,,,,,,,,,,,,,,,,,,,];
 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Worldtt');
});

server.listen(port, hostname, () => {
  //console.log(`Server running at http://${hostname}:${port}/`);
  
  //Run generator;
  var ObjectHolder = RandomPropertyAndRemove(Dif4);
  RemoveExclusions(ObjectHolder["excludes"]);
  var Entry = {};
  Entry.name = ObjectHolder.name;
  Finallist[12] = Entry;
  
  for(var i = 0; i < gridLayout.length; i++){
	  var result;
	  if(gridLayout[i] === 1){
		result = RandomPropertyAndRemove(Dif1);
	  }
	  if(gridLayout[i] === 2){
		result = RandomPropertyAndRemove(Dif2);
	  }
	  if(gridLayout[i] === 3){
		result = RandomPropertyAndRemove(Dif3);
	  }
	  
	  if(gridLayout[i] !== 4){
		RemoveExclusions(result["excludes"]);
		var NewEntry = {};
		NewEntry.name = result.name;
		Finallist[i] = NewEntry;
	  }
  }
  
   var str = JSON.stringify(Finallist);
	fs.writeFile('Output.txt', str, (err) => {
        console.log(str);
        // In case of a error throw err.
        if (err) throw err;
    });
});


function MakeListOfDifficulty(dif) {
	var list = {};
	
	for (const key in BingoJson) {
		if(BingoJson[key]['Difficulty'] == dif){
			list[key] =BingoJson[key];
		}
	};
	return list;
}


function RemoveExclusions(exclusions){
	if(exclusions != {} ){
		for(var i = 0; i < exclusions.length; i++){
			delete Dif1[exclusions[i]];
			delete Dif2[exclusions[i]];
			delete Dif3[exclusions[i]];
		}
	}
}	
	
	


function RandomPropertyAndRemove(obj) {
    var keys = Object.keys(obj);
	var key = keys.length * Math.random() << 0;
	var result = obj[keys[key]];
	delete obj[keys[key]];
    return result;
};
			


