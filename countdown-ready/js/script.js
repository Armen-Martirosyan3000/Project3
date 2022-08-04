// Determine the active elements on the page-սահմանում ենք էջի ակտիվ տարրերը
const year = document.querySelector('#year');//querySelector('#year')-ը գտնում է HTML-ում առաջին #year id-ին և վերադարձնում է, որպեսզի այն կարողանանք օգտագործել js կոդում, տվյալ դեպքում, year-ը օգտագործվել է՝ year.innerText(այս էլեմենտի միջոցով է երևում էկրանին) = currentYear(ընթացիկ տարին է որը հաշվել ենք ներքևում) + 1-ում հաջորդ տարվա ամսաթիվը հետևի ֆոնին
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const countdown = document.querySelector('#countdown');
const preloader = document.querySelector('#preloader');

// Making calculations-կատարում ենք հաշվարկները
const currentYear = new Date().getFullYear(); //new Date()-ն ստեղծում է Date օբյեկտ ընթացիկ ամսաթվով և ժամով, իսկ getFullYear() մեթոդը վերադարձնում է նշված ամսաթվի տարին ըստ տեղական ժամանակի։ Ստեղծում ենք ընթացիկ տարվա փոփոխականը և նրան տալիս ենք ընթացիկ ժամանակը new Date(ստեղծում ենք նոր օբյեկտ Date class-ով, այն վերադարձնում է ընթացիկ ժամանակը), getFullYear() վերադարձնում է ընթացիկ տարին
const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);//սա ապագա տարվա փոփոխականն է(մինչև այդ ժամանակն ենք աշխատեցնելու տայմեռը հետհաշվարկով, և այստեղով պետք է ստանանք հաջորդ տարվա 1 հունվարի 0ժամ 0րոպե 0վայրկյանը ), (`January 01 ${currentYear + 1} 00:00:00`)-միջոցով ծրագիրը յուրաքանչյուր տարում հետհաշվարկը ավտոմատ կատարում է մինչև հաջորդ տարվա հւնվարի 1-ը, այսինքն ընթացիկ տարի՝currentYear +1

// Set year per page-ստեղծում ենք տարեթիվը էկրանի առաջին էջին
year.innerText = currentYear + 1;// վերևում ստեղծելով year փոփոխականը նրան վերագրել ենք HTML-ում գտնվող #year id ունեցող div-ը, իսկ year.innerText(ներքին տեքստ) = currentYear + 1 սա նշանակում է year id-ով div-ում ներառի currentYear + 1 որտեղ currentYear-ը ընթացիկ տարին է որին գումարած 1 կտա հաջորդ տարին։Սրանով ստեղծվում է էկրանի հետևի ֆոնում գտնվող հաջորդ տարվա տարեթիվը։

function updateCounter() {
	const currentTime = new Date();//սրանով սահմանում են ընթացիկ ժամանակը,որպեսզի այդ պահից հաշվարկը իրականացվի մինչև տարվա վերջ
	const diff = nextYear - currentTime;//սրանով մենք հաշվում ենք տարբերությունը nextYear-նոր տարվա և currentTime-ընթացիկ ժամանակի,որով էլ կիմանանք թե որքան ժամանակ է մնացել մինչև նոր տարուն

	//Translation in days-միլիվայրկյանները փոխում ենք օրերի
	const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);//daysLeft-մնացած օրեր, diff = nextYear - currentTime այս բանաձևով մինչև նոր տարվա սկիզբը մնացած ժամանակը ստացվում է միլիվայրկյաններով,դրա համար այդ միլիվայրկյանները որպեսզի վերածենք ավելի հասկանալի ժամանակի միավորի պետք է՝ diff-ը բաժանենք /1000-ի(որի միջոցով միլիվայրկյանը վերածում ենք վայրկյանի)/60(որի միջոցով վայրկյանը վերածում ենք րոպեի)/60(որի միջոցով րոպեն վերածում ենք ժամի)/24 (որի միջոցով ժամը վերածում ենք օրվա: արդյունքում daysLeft փոփոխականը կտա այս պահից մինչև հուվարի 1-ը մնացած ժամանակը օրերով։Math.floor-ը թիվը կլորացնում է դեպի ներքև
	
	// Hours total, then remainder of division by 24 (conversion to days)-Ժամերի ընդհանուր քանակը, ապա բաժանման մնացորդը 24-ի (վերափոխում օրերի)
	const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;//hoursLeft-մնացած ժամեր, նույն մեթոդով հաշվում ենք(diff / 1000 / 60 / 60) թե որքան ժամ է մնացել մինչև հուվարի 1-ը, հետո % 24-ով մենք ստանում ենք վերևում հաշվարկած օրերի մնացորդային օրերը վերածածված ժամերի(քանի որ վերևում օրերը ստացվել են 99․3 ու Math.floor-ը կլորացնում է դեպի ներքև ու վերցնում է ամբողջ օրերի թիվը այսինքն 99-ը, դրա համար այդ մնացորդային 0,3 օրը %(մաջիլո) 24-ի միջոցով մենք վերածում ենք ժամերի )
	
	// Minutes total, then the remainder of the conversion to hours, minutes left-Ընդամենը րոպեներ, այնուհետև դարձնել մնացորդը ժամերի, մնացածը րոպեների
	const minutesLeft = Math.floor(diff / 1000 / 60) % 60;//minutesLeft-մնացած րոպեներ,նույն մեթոդով հաշվում ենք րոպեները
	
	// Seconds total, then the rest of the conversion to minutes, seconds left-Վայրկյաններ ընդհանուր, ապա մնացածը փոխակերպում րոպեների, մնացածը վայրկյանների
	const secondsLeft = Math.floor(diff / 1000) % 60;//secondsLeft-մնացած վայրկյաններ, նույն մեթոդով հաշվում ենք վայրկյանները


	days.innerText = daysLeft < 10 ? '0' + daysLeft : daysLeft;//սրանով սահմանվում է, որպեսզի էկրանին երևա քանի օր է մնացել(վերևում ստեղծել էինք days փոփոխականը՝ const days = document.querySelector('#days') և այդ փոփոխականին վերագրում ենք վերևում ստեղծված const daysLeft-ը, որպեսզի days.innerText-ը իր մեջ ներառի մնացորդային օրերի քանակը և ցույց տա էկրանին։ Իսկ սա՝ < 10 ? '0' + daysLeft : daysLeft գրում ենք որպեսզի եթե մնացորդային թիվը փոքր լինի 0-ից դիմացը գրվի 0, օրինակ 07, ?(տեռնառնիյ օպերատոր)-սա if-ի դեր է տանում, :(else-ի դերն է տանում, հակառակ դպքում) daysLeft-սա նշանակում է հակառակ դեպքում եթե 10-ից մեծ է ցույց տալ միայն daysLeft-ը
	hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;//նույն մեթոդով սահմանվում է, որպեսզի էկրանին երևա քանի ժամ է մնացել
	minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;//նույն մեթոդով սահմանվում է, որպեսզի էկրանին երևա քանի րոպե է մնացել
	seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;//նույն մեթոդով սահմանվում է, որպեսզի էկրանին երևա քանի վայրկյան է մնացել
}

//updateCounter(); սա դնում ենք սկզբից աշխատում է հետո հանում են ու թողում ենք միայն setInterval(updateCounter, 1000) սա, դա նրա համար է արվում որ ամեն վայրկյան թարմացվելուց չգրվի 00։00։00։00, այլ միանգամից թարմացվի

// We run the calculation 1 time per second (every second)-Մենք հաշվարկը կատարում ենք վայրկյանում 1 անգամ (յուրաքանչյուր վայրկյան)
setInterval(updateCounter, 1000);// setInterval-ը թույլ է տալիս թարմացնել սահմանված կոդերը սահմանված ինտերվալում, այսինք function updateCounter(թարմացվող հաշվիչ)() -այս ֆունկցիան թարմացվում է ամեն վայրկյան՝ setInterval(updateCounter, 1000) այս կոդի միջոցով

//preloader-ը(https://loading.io/, https://loading.io/css/-այս կայքից է ներբեռնված) սպասման էլեմենտի էֆեկտ է տալիս՝ թվում է թե ինչ որ հաշվարկ է գնում նոր երևում է տայմեռը, 
setTimeout(function () {
	preloader.remove();//preloader.remove()-ով մենք հանում ենք preloader-ը(preloader փոփոխական ստեղծել ենք վերևում) remove մեթոդով
	countdown.style.display = 'flex';//քանի որ countdown-ը(տայմեռի փոփոխականն է որը ստեղծել ենք վերևում) css-ում դրել ենք none, որ էկրանը միացնելուց սկզբում երևա preloader-ը, js-ի միջոցով մենք դնում ենք flex, որ միանա ներքևում սահմանելով որ միանա տայմեռը էկրանը միացնելուց 1 վայրկյան հետո
}, 1000);//1000-ը միլիվայրկյանը 1 վայրկյան է

//CLOCK

function startTime() {
	const today = new Date();//new Date()-ն ստեղծում է Date օբյեկտ ընթացիկ ամսաթվով և ժամով
	let h = today.getHours(); //getHours() մեթոդը վերադարձնում է ժամը նշված ամսաթվի համար՝ ըստ տեղական ժամանակի:
	let m = today.getMinutes();// սահմանում է րոպեն
	let s = today.getSeconds();// սահմանում է վայրկյանը
	հ = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
	setTimeout(startTime, 1000);
	document.getElementById('txt').style.fontSize = "320%";
	document.getElementById('txt').style.color = "#0000DE";
}

function checkTime(i) {
	if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10--< 10 թվերի դիմաց ավելացրեք զրո
	return i;
}