
 console.log('yi');
	var test = true; //в рабочем режиме false, в режиме тестировани€ true
	var dataAddress = {
		'USD':[
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHUSD',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCUSD',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD'
		],
		'EUR':[
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHEUR',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCEUR',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCEUR'
		],
		'RUB':[
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHRUB',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCRUB',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCRUB'
		],
		'GBP':[
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHGBP',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCGBP',
			'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCGBP'
		]
	};
	/*console.log(dataAddress['USD']);*/
	
	//создаем обьект дл€ отображению даных по криптовалюте
	function Cripto(name, backgroundColor, backgroundImage, units){
		this['name'] = name;
		this['backgroundColor'] = backgroundColor;
		this['backgroundImage'] = backgroundImage;
		this['units'] = units;//'percent' или 'price' отображаем либо в процентах либо в номинале
		this['price'] = 0;
		this['changes'] = {
			'percent':{},
			'price':{}
			};
		
			 
		
		
	}
	/********************************************************/
	
	function CriptoValue(hour, day, week, month, year){
		this['Hour'] = hour;
		this['Day'] = day;
		this['Week'] = week;
		this['Month'] = month;
		this['Year'] = year;
		
		
	}
	
	/********************************************************/
	
	
	var currency = [];
		currency[0] = new Cripto( 'Ethereum', 'green','url("img/eCoinBg.png")', 'percent');
		currency[1] = new Cripto( 'Litecoin', 'grey','url("img/lCoinBg.png")', 'percent');
		currency[2] = new Cripto( 'Bitcoin', 'brown','url("img/bCoinBg.png")', 'percent');
		
	for(let i = 0; i < 3; i++){
		
		currency[i]['changes']['percent']=new CriptoValue(0,0,0,0,0);
		
		currency[i]['changes']['price']=new CriptoValue(0,0,0,0,0);
	}

	//получаем данные дл€ валюты USD
	var i = 0;
	var str;
	
		loadDoc(dataAddress['USD'][0], 0, test);
	
function loadDoc(address, number, test) {
	
	var res;
	var obj;
  var xhttp = new XMLHttpRequest();// создаем обьект xmlhttpRequest
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   getData(this, number, test);//функци€ обрабатывает данные ответа на запрос, после обработки запускает следующий //запрос, когда получены данные по всем запросам отображает данные
	
    }
  };
  xhttp.open("GET", address, true);
  xhttp.send();

}
function getData(xhttp, number, test){
	//console.log(res);
	var obj = JSON.parse(xhttp.responseText);
	currency[number]['price'] = obj.ask;
	if(test){console.log('getData: ' + 'number = ' + number + ' price = ' + currency[number]['price']);}
	for(y in currency[number]['changes']){
		for (x in obj['changes'][y]){
			if(test){console.log('y = ' + y + ' x = ' + x);}
			currency[number]['changes'][y][x] = obj['changes'][y][x];
			if(test){console.log('currency: ' + currency[number]['changes'][y][x]);}
			
		}
	}
	if(test){console.log('getData: ' + currency[number]['changes']['percent']['Hour']);}
	if(test){console.log('getData: ' + currency[number]['changes']['percent']['Hour'] + '');}
	if(number++ < 2){
		loadDoc(dataAddress['USD'][number], number);
	}
	else{
		
		if (test){console.log('Data loaded');}
		for(var i = 0; i < 3; i++){
			showData(i, 'percent');
		}
	}
	//console.log(Data.ask);
	
}

function showData(number, percent, currencySign){
	//отображаем данные по текущей валюте number индекс данных в массиве currency
	var myParent = document.getElementById('ourCur');
	var main = createNewElem('DIV', 'coinBox', myParent);
	var coinBoxes = document.getElementsByClassName('coinBox');
	coinBoxes[number].id = currency[number]['name'];
	var currencyName = createNewElem('H4', '', main);
	//if(test){console.log('showData: ' + 'number = ' + number)}
	createTextNode(currencyName, currency[number]['name'] );
	var priceValue = createNewElem('DIV','', main);
	var spanEven = createNewElem('SPAN', 'even', priceValue);
	createTextNode(spanEven, 'price');
	var spanOdd = createNewElem('SPAN', 'odd', priceValue);
	createTextNode(spanOdd, currency[number]['price'] + '' + currencySign);
	var newButton = createNewButton();
	main.appendChild(newButton);
	newButton.onclick = percentToPrice;
	var i = 0;
	for(let x in currency[number]['changes'][percent]){
		/*if(i++ < 3){}
		else{
		var listItem = createNewElem('DIV', '', main);
		var spanEven = createNewElem('SPAN', 'even', listItem);
		createTextNode(spanEven, x);
		var spanOdd = createNewElem('SPAN', 'odd', listItem);
		createTextNode(spanOdd, currency[number][x]);}*/
		switch(x){
			case 'hour':;
			case 'day':;
			case 'week':;
			case 'month':{
				var listItem = createNewElem('DIV', '', main);
				var spanEven = createNewElem('SPAN', 'even', listItem);
				createTextNode(spanEven, x);
				var spanOdd = createNewElem('SPAN', 'odd', listItem);
				createTextNode(spanOdd, currency[number]['changes'][percent][x] + '' + currencySign);
			}
			default : break;
		}
		}
		
	
	
	//str = 'Ethe ' + currency[0]['price'] + ', Lite ' + currency[1]['price'] + ', Bit '+ currency[2]['price'];
	
	

}




/********************************************************************************************************************/
/* Create elements*/

	//‘ункци€ создает новый элемент tagName которого заданый первым параметром
	//и присоеден€ет еЄ последним в родительский элемент который задаетс€ вторым параметром
	//ѕри необходимости назначает элементу им€ класса который передаетс€ третьим параметром, если параметр //отсутствует им€ класса не назначаетс€.
	//ѕри необходимости назначает им€ ID который передаетс€ четвертым параметром
	//≈сли первые два параметра не указаные - функци€ возвращает null(нечего создать и некуда присоедин€ть)
	function createNewElem(myElement, myClass, myParent){
	var elem = document.createElement(myElement);
	myParent.appendChild(elem);
	elem.className = myClass;
	return elem;
}
/********************************************************************************************************************/
/* Create textNode*/
function createTextNode(myElement, myText){
	var textNode = document.createTextNode(myText);
	myElement.appendChild(textNode);
}

/********************************************************************************************************************/
function createNewButton(){
	var elem = document.createElement('DIV');
	var even = createNewElem('SPAN', 'even', elem);
	createTextNode(even, 'Percent change');
	var odd = createNewElem('SPAN', 'odd', elem);
	var newButton = createNewElem('BUTTON', 'myButtonsPercent', odd);
	createTextNode(newButton, '');
	newButton.onclick = function (){
		elem = this;
		percentToPrice(elem);
		}
	return elem;
}
/* Switcher */
function percentToPrice(elem){
	var str = elem.style.backgroundImage;
	var currencySign = '';
	if(str.indexOf('radioOn') < 0){
		elem.style.backgroundImage = 'url("img/radioOn.png")';// %
		currencySign = '%';
	}else{
		elem.style.backgroundImage = 'url("img/radioOff.png")';//номинал валюты
		currencySign = '$';
	}
	
		//if(test){alert(currencySign)};
	return currencySign;
}

/**************************************************************************************************************************************************/

function openModal(){
	var choiceCurrency = document.getElementById('openingModal');
	if(choiceCurrency.style.visibility === 'hidden'){
		choiceCurrency.style.visibility = "visible";
	} else{
		choiceCurrency.style.visibility = "hidden";
	}
	
}

function exchangeCurrency(elemId){
	var defaultValue = document.getElementById('defaultCurrency');
		//if(test){alert(defaultValue.innerHTML);};
	var exchanger = defaultValue.innerHTML;
	var newValue = document.getElementById(elemId);
		//if(test){alert(newValue.innerHTML);};
	defaultValue.innerHTML = newValue.innerHTML;
	newValue.style.display = 'none';
	var uncover = '';
	switch(exchanger){
		case 'USD' : {
			uncover = document.getElementById('usd');
			uncover.style.display = 'block';
		};break;
		case 'EUR' : {
			uncover = document.getElementById('eur');
			uncover.style.display = 'block';
		};break;
		case 'RUB' :  {
			uncover = document.getElementById('rub');
			uncover.style.display = 'block';
		}; break;
		case 'GBP' :  {
			uncover = document.getElementById('gbp');
			uncover.style.display = 'block';
		};break;
		default: break;
	}
	
}

/*	
var index = 1;
var etClassName = [
	'etBgOne',
	'etBgTwo,'
];

function updateIndex(){
	if(index === 0){
		index = 1;
	}else {
		index = 0;
	}
}

myCheckLoad.onclick = function(e){
	e.currentTarget.etClassName = etClassName[index];
	updateIndex();
}
*/
// реализаци€ лежит здесь https://www.linkedin.com/pulse/20140702040804-99746459-change-css-background-image-with-click
/*
console.log(myCheck.checked);

var openCurrency = document.getElementsByClassName('currencySelection');
var choiceCurrency = document.getElementsByClassName('currencySelect');

openCurrency.onclick = 	choiceCurrency.style.display:'block';
*/