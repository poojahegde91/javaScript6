//Assignment 6
//Access the stored data from objects and manipulate these object

//import fs module
let fs = require("fs");
//import readline module
let readline = require("readline");

//Declare required variable for performing the operation
let lineno = 0;
//Declare Array variable to store the result
let countries = [];
let ascorderdata = [];
let descorderdata = [];
//Create readline interface using createInterface method to read the CSV file 

let run = function () {

	let rl = readline.createInterface({

		input:fs.createReadStream("data/country_details.csv")
	});
//Create supporting function to add Population data to object
	function populationData(population)
	{
		this.populationData = population;
	}


//Create supporting function to add GDP data to object
	function gdpData(gdp)
	{
		this.gdpData = gdp;
	}


//Create supporting function to add GDP per capita income data to object
	function gdpincomeData(gdpincome)
	{
		this.gdpincomeData = gdpincome;
	}


//Create supporting function to add GDP based on purchasing power parity data to object
	function gdppppData(gdpppp)
	{
		this.gdppppData = gdpppp;
	}

//Create class that helps to create instance of object to hold the data
function country(countryname, area)
{	
	this.countryname = countryname;
	this.area = area;
	this.populationData = populationData;
	this.gdpData = gdpData;
	this.gdpincomeData = gdpincomeData;
	this.gdppppData = gdppppData;
}


//Create supporting function populateCountriesData which stores country object
//(countryObject) into countries array.
function populateCountriesData(curdata)
{
	countries.push(curdata);
}

//Create function (getCountryData(countryname))to access a specific 
//country data and return the country object
function getCountryData(countryname)
{
	for(let index=0; index<countries.length; index++)
		if(countries[index].countryname == countryname)
		{
			return countries[index];
		}
}

//Create function(setCountryData(countryname,newArea)) to update area data 
//of a specific country.
function setCountryArea(countryname,newArea)
{
	for(let index=0; index<countries.length; index++)
		if(countries[index].countryname == countryname)
		{
			countries[index].area = newArea;
			break;
		}
}


rl.on("line",function(line){

   //create object(for ex.name can be - countryObject) of the class country(countryname,area)
   let lineRecords = line.trim().split(",");
	if(lineno>0)
	{
		let countryname = lineRecords[0].replace(/"/g,"");
		let area = lineRecords[1].replace(/"/g,"");
		let newcountry = new country(countryname, area);
    //read from csv file Population2010 till population2015 and store it in populationData array
	//let populationData = [];
	let populationData1 = [];
  	for(let index=2; index<=7; index++)
  	{
    	populationData1.push(parseFloat(lineRecords[index]));
  	}
	//read from csv file GDP2010 till GDP2015 and store it in gdpData array
	let gdpData1 = [];
  	for(let index=8; index<=13; index++)
  	{
   		gdpData1.push(parseFloat(lineRecords[index]));
  	}
	//read from csv file 'GrossDomesticProduct2010' till 'GrossDomesticProduct2015' and store it in gdpincomeData array
	let gdpincomeData1 = [];
  	for(let index=14; index<=19; index++)
  	{
    	gdpincomeData1.push(parseFloat(lineRecords[index]));
  	}

     //read from csv file PPP2010 till PPP2015 and store it in gdppppData array
	let gdppppData1 = [];
  	for(let index=20; index<=25; index++)
  	{
    	gdppppData1.push(parseFloat(lineRecords[index]));
 	}

 	
 	newcountry.populationData(populationData1);
    newcountry.gdpData(gdpData1);
    newcountry.gdpincomeData(gdpincomeData1);
    newcountry.gdppppData(gdppppData1);

    populateCountriesData(newcountry);

	}

	lineno++;
});
    //call supporting function on the object created (for ex.name can be - countryObject)
    //and pass appropriate variables
   
     
      

     //pass the object(countryObject) to the global array (countries) by calling 
     //populateCountriesData



//Handle the post processing functionality after file read is complete
rl.on("close",function()
{
 //manipulate the country data using set method declared above
 //(for ex - modify area of 'India' to 1000)
   
   
   setCountryArea('India', 1000);
   
  //use get method to retrive the country object for India and store it 
  //in a varaible
   let countrydata = getCountryData('India');

  //console.log(countrydata);
	
//Use array map and sort method to order countries in ascending order
	let mapped = countries.map(function(el)
	{	
		return el.countryname;
	});
	//console.log(mapped);
//store the resulting ascending order data in the separate array
	var ascorderdata = mapped.sort(function(a,b)
	{
		if(a<b){return -1;}
		if(a>b){return 1;}
		return 0;
	});
	//console.log(ascorderdata);

//Use array map and sort method to order countries in descending order
	let tempdata = countries.map(function(el)
	{
		return el.countryname;
	});
	//console.log(tempdata);
//store the resulting descending order data in the separate array
	var descorderdata = tempdata.sort(function(a,b)
	{
		if(a>b){return -1;}
		if(a<b){return 1;}
		return 0;
	});
	//console.log(descorderdata);
});
}
module.exports = {
	exec: run,
	descdata: descorderdata,
	countries: countries,
	ascdata: ascorderdata	
};

run();