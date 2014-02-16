/***
* popup.js
* The script which runs when the pop-up is created.
* Used to query the content script and push the responce back into our pop-up.
*/


// Query the active tab for data
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	// If there is an active tab...
	if (tabs.length > 0) {
	
		// Send a message requesting the page
		chrome.tabs.sendMessage(tabs[0].id, {method: "getPage"}, function(response) {

			if (chrome.runtime.lastError) {
				// An error occurred, log it
				console.log("ERROR: ", chrome.runtime.lastError);
			} else {
				// We got the html content, process it here
				console.log(response);

				// Define a beer object
                function Beer(names,link) {

					// Array of names to look for
                    this.arrayNames=names;

					// Link to Beer advocate page
                    this.baLink=link;
				}

				// Our list of beers
				var top = [
                    new Beer(["Heady Topper", "heady"], "http://www.beeradvocate.com/beer/profile/27039/16814/"),
                    new Beer(["Pliny The Younger"], "http://www.beeradvocate.com/beer/profile/863/21690/"),
                    new Beer(["Pliny The Elder", "pliny"], "http://www.beeradvocate.com/beer/profile/863/7971/"),
                    new Beer(["Bourbon County Brand Coffee Stout", "BCBCS"], "http://www.beeradvocate.com/beer/profile/1549/57747/"),
                    new Beer(["KBS", "Kentucky Breakfast Stout"], "http://www.beeradvocate.com/beer/profile/1199/19960/"),
                    new Beer(["Zombie Dust", " ZD "], "http://www.beeradvocate.com/beer/profile/26/64228/"),
                    new Beer(["Bourbon Barrel Aged Vanilla Bean Dark Lord", "BBAVDL", "BBAVBDL"], "http://www.beeradvocate.com/beer/profile/26/42349/"),
                    new Beer(["Trappist Westvleteren 12 (XII)", "Westvleteren 12", "westy 12"], "http://www.beeradvocate.com/beer/profile/313/1545/"),
                    new Beer(["Double Sunshine IPA"], "http://www.beeradvocate.com/beer/profile/17980/64545/"),
                    new Beer(["Parabola"], "http://www.beeradvocate.com/beer/profile/2210/41815/"),
                    new Beer(["Cantillon Fou' Foune", "Fou' Foune", "Fou Foune"], "http://www.beeradvocate.com/beer/profile/388/5281/"),
                    new Beer(["Bourbon County Brand Stout", "BCBS"], "http://www.beeradvocate.com/beer/profile/1549/10672/"),
                    new Beer(["Abner"], "http://www.beeradvocate.com/beer/profile/22511/58299/"),
                    new Beer(["Supplication"], "http://www.beeradvocate.com/beer/profile/863/22227/"),
                    new Beer(["Proprietor"], "http://www.beeradvocate.com/beer/profile/1549/102123/"),
                    new Beer(["Abyss"], "http://www.beeradvocate.com/beer/profile/63/34420/"),
                    new Beer(["Citra DIPA"], "http://www.beeradvocate.com/beer/profile/14064/56082/"),
                    new Beer(["Duck Duck Gooze", "DDG"], "http://www.beeradvocate.com/beer/profile/18149/51116/"),
                    new Beer(["Founders Breakfast Stout", "FBS"], "http://www.beeradvocate.com/beer/profile/1199/11757/"),
                    new Beer(["Hopslam"], "http://www.beeradvocate.com/beer/profile/287/17112/"),
                    new Beer(["Rochefort 10"], "http://www.beeradvocate.com/beer/profile/207/645/"),
                    new Beer(["Hunahpu"], "http://www.beeradvocate.com/beer/profile/17981/47022/"),
                    new Beer(["Bourbon County Brand Barleywine", "BCBB", "Bourbon County Barley"], "http://www.beeradvocate.com/beer/profile/1549/100421/"),
                    new Beer(["Bourbon Barrel Aged Plead The 5th", "BBAPt5", "BBA Plead The 5th"], "http://www.beeradvocate.com/beer/profile/1471/60426/"),
                    new Beer(["Bourbon Barrel Fourth Dementia", "BB4D"], "http://www.beeradvocate.com/beer/profile/2097/34313/"),
                    new Beer(["§ucaba", "Abacus", "Sucaba"], "http://www.beeradvocate.com/beer/profile/2210/41121/"),
                    new Beer(["Black Note"], "http://www.beeradvocate.com/beer/profile/287/37265/"),
                    new Beer(["Beatification"], "http://www.beeradvocate.com/beer/profile/863/27992/"),
                    new Beer(["Abrasive"], "http://www.beeradvocate.com/beer/profile/13014/46849/"),
                    new Beer(["Black Tuesday"], "http://www.beeradvocate.com/beer/profile/16866/51257/"),
                    new Beer(["Lou Pepe - Kriek", "Lou Pepe Kriek"], "http://www.beeradvocate.com/beer/profile/388/3659/"),
                    new Beer(["Ephraim"], "http://www.beeradvocate.com/beer/profile/22511/62172/"),
                    new Beer(["Double Galaxy"], "http://www.beeradvocate.com/beer/profile/22511/67760/"),
                    new Beer(["Barrel-Aged Abraxas", "BA Abraxas"], "http://www.beeradvocate.com/beer/profile/25888/87246/"),
                    new Beer(["Darkness"], "http://www.beeradvocate.com/beer/profile/13014/33127/"),
                    new Beer(["St. Bernardus Abt 12", "Bernardus 12", "Abt 12"], "http://www.beeradvocate.com/beer/profile/259/1708/"),
                    new Beer(["Westvleteren 8", "westy 8"], "http://www.beeradvocate.com/beer/profile/313/857/"),
                    new Beer(["Everett Porter"], "http://www.beeradvocate.com/beer/profile/22511/61062/"),
                    new Beer(["Saint Lamvinus"], "http://www.beeradvocate.com/beer/profile/388/8954/"),
                    new Beer(["Chocolate Rain"], "http://www.beeradvocate.com/beer/profile/16866/53728/"),
                    new Beer(["Permanent Funeral"], "http://www.beeradvocate.com/beer/profile/26/91670/"),
                    new Beer(["PseudoSue"], "http://www.beeradvocate.com/beer/profile/23222/72170/"),
                    new Beer(["Mornin' Delight", "Mornin Delight", "Morning Delight"], "http://www.beeradvocate.com/beer/profile/23222/76421/"),
                    new Beer(["Consecration"], "http://www.beeradvocate.com/beer/profile/863/45653/"),
                    new Beer(["Cable Car"], "http://www.beeradvocate.com/beer/profile/18149/38149/"),
                    new Beer(["Adam From The Wood", "Adam ftw"], "http://www.beeradvocate.com/beer/profile/173/20767/"),
                    new Beer(["Cantillon Gueuze"], "http://www.beeradvocate.com/beer/profile/388/1703/"),
                    new Beer(["Backyard Rye Bourbon County Brand Stout", "backyard rye", "BRBCBS"], "http://www.beeradvocate.com/beer/profile/1549/102122/"),
                    new Beer(["Temptation"], "http://www.beeradvocate.com/beer/profile/863/9474/"),
                    new Beer(["Speedway Stout - Bourbon Barrel Aged", "BBA speedway"], "http://www.beeradvocate.com/beer/profile/396/31484/"),
                    new Beer(["Kentucky Brunch Brand Stout", "KBBS"], "http://www.beeradvocate.com/beer/profile/23222/78820/"),
                    new Beer(["Enjoy By"], "http://www.beeradvocate.com/beer/profile/147/84596/"),
                    new Beer(["Blåbær", "Blabaer"], "http://www.beeradvocate.com/beer/profile/388/36316/"),
                    new Beer(["Double Citra"], "http://www.beeradvocate.com/beer/profile/22511/69522/"),
                    new Beer(["Bourbon Barrel Aged Dark Lord Imperial Stout", "BBADL", "BBA dark"], "http://www.beeradvocate.com/beer/profile/26/30184/"),
                    new Beer(["Nelson"], "http://www.beeradvocate.com/beer/profile/3120/32286/"),
                    new Beer(["Utopias"], "http://www.beeradvocate.com/beer/profile/35/25759/"),
                    new Beer(["Eclipse Stout - Elijah", "Eclipse Stout Elijah", "craig Eclipse", "eclipse elijah"], "http://www.beeradvocate.com/beer/profile/14936/55063/"),
                    new Beer(["bomb"], "http://www.beeradvocate.com/beer/profile/30356/94350/"),
                    new Beer(["California Brandy Barrel Aged", "brandy huna"], "http://www.beeradvocate.com/beer/profile/17981/93818/"),
                    new Beer(["Sculpin"], "http://www.beeradvocate.com/beer/profile/199/29619/"),
                    new Beer(["Weihenstephaner Hefeweissbier"], "http://www.beeradvocate.com/beer/profile/252/731/"),
                    new Beer(["Dreadnaught"], "http://www.beeradvocate.com/beer/profile/26/1558/"),
                    new Beer(["Mother Of All Storms", "moas"], "http://www.beeradvocate.com/beer/profile/1304/46230/"),
                    new Beer(["Sang Noir"], "http://www.beeradvocate.com/beer/profile/2391/56266/"),
                    new Beer(["Susan"], "http://www.beeradvocate.com/beer/profile/22511/86487/"),
                    new Beer(["Solitude #5", "Solitude 5"], "http://www.beeradvocate.com/beer/profile/22511/85523/"),
                    new Beer(["Péché Mortel", "peche mortel"], "http://www.beeradvocate.com/beer/profile/1141/10325/"),
                    new Beer(["Lou Pepe - Framboise", "Lou Pepe Framboise"], "http://www.beeradvocate.com/beer/profile/388/13825/"),
                    new Beer(["Hoppy Birthday"], "http://www.beeradvocate.com/beer/profile/3120/58610/"),
                    new Beer(["Atrial Rubicite"], "http://www.beeradvocate.com/beer/profile/24018/94634/"),
                    new Beer(["Fonteinen Oude Geuze", "Fonteinen Oude Geuze", "3f geuze"], "http://www.beeradvocate.com/beer/profile/2216/30517/"),
                    new Beer(["Speedway Stout"], "http://www.beeradvocate.com/beer/profile/396/3833/"),
                    new Beer(["Victory At Sea"], "http://www.beeradvocate.com/beer/profile/199/48505/"),
                    new Beer(["Duet"], "http://www.beeradvocate.com/beer/profile/3120/27604/"),
                    new Beer(["Edward"], "http://www.beeradvocate.com/beer/profile/22511/57886/"),
                    new Beer(["Melange No. 3", "Melange number 3", "Melange 3", "melange #3"], "http://www.beeradvocate.com/beer/profile/16866/47954/"),
                    new Beer(["Exponential Hoppiness"], "http://www.beeradvocate.com/beer/profile/3120/12068/"),
                    new Beer(["Bad Boy"], "http://www.beeradvocate.com/beer/profile/3120/34090/"),
                    new Beer(["Lagunitas Sucks"], "http://www.beeradvocate.com/beer/profile/220/74986/"),
                    new Beer(["Matt"], "http://www.beeradvocate.com/beer/profile/173/47546/"),
                    new Beer(["Solitude #4", "Solitude 4"], "http://www.beeradvocate.com/beer/profile/22511/83008/"),
                    new Beer(["FIDY"], "http://www.beeradvocate.com/beer/profile/28907/34483/"),
                    new Beer(["Nugget Nectar"], "http://www.beeradvocate.com/beer/profile/694/15881/"),
                    new Beer(["Founders Imperial Stout"], "http://www.beeradvocate.com/beer/profile/1199/21822/"),
                    new Beer(["Biscotti Break"], "http://www.beeradvocate.com/beer/profile/24300/80291/"),
                    new Beer(["Vietnamese Coffee"], "http://www.beeradvocate.com/beer/profile/396/75218/"),
                    new Beer(["Grey Monday"], "http://www.beeradvocate.com/beer/profile/16866/74295/"),
                    new Beer(["Assassin"], "http://www.beeradvocate.com/beer/profile/23222/78660/"),
                    new Beer(["Very Sour Blackberry", "VSB"], "http://www.beeradvocate.com/beer/profile/590/98225/"),
                    new Beer(["Imperial Russian Stout"], "http://www.beeradvocate.com/beer/profile/147/1160/"),
                    new Beer(["Lunch"], "http://www.beeradvocate.com/beer/profile/20681/68916/"),
                    new Beer(["Wisconsin Belgian Red"], "http://www.beeradvocate.com/beer/profile/590/1577/"),
                    new Beer(["Schaerbeekse"], "http://www.beeradvocate.com/beer/profile/2216/17647/"),
                    new Beer(["Lou Pepe - Gueuze", "Lou Pepe Gueuze"], "http://www.beeradvocate.com/beer/profile/388/13826/"),
                    new Beer(["Bodhi"], "http://www.beeradvocate.com/beer/profile/341/53187/"),
                    new Beer(["Kopi Luwak BBA", "BBA Kopi", "Kopi Luwak (Bourbon"], "http://www.beeradvocate.com/beer/profile/396/86108/"),
                    new Beer(["Black Magick"], "http://www.beeradvocate.com/beer/profile/13371/91693/"),
                    new Beer(["Celebrator Doppelbock"], "http://www.beeradvocate.com/beer/profile/39/131/"),
                    new Beer(["Double Jack"], "http://www.beeradvocate.com/beer/profile/2210/50697/"),
                    new Beer(["Blind Pig"], "http://www.beeradvocate.com/beer/profile/863/22790/"),
                    new Beer(["Pure Hoppiness"], "http://www.beeradvocate.com/beer/profile/3120/7597/"),
                    new Beer(["Drie Fonteinen Oude Geuze", "3f Oude Geuze"], "http://www.beeradvocate.com/beer/profile/2216/6305/"),
                    new Beer(["Silva Stout"], "http://www.beeradvocate.com/beer/profile/2743/62253/"),
                    new Beer(["Double Dose"], "http://www.beeradvocate.com/beer/profile/119/99838/"),
                    new Beer(["Birth Of Tragedy"], "http://www.beeradvocate.com/beer/profile/22511/75502/"),
                    new Beer(["Citra"], "http://www.beeradvocate.com/beer/profile/28178/87145/"),
                    new Beer(["RareR D.O.S.", "RareR DOS", "RareRDOS", "RDOS"], "http://www.beeradvocate.com/beer/profile/22147/79241/"),
                    new Beer(["Furious"], "http://www.beeradvocate.com/beer/profile/13014/28203/"),
                    new Beer(["Raspberry Tart"], "http://www.beeradvocate.com/beer/profile/590/1585/"),
                    new Beer(["Head Hunter"], "http://www.beeradvocate.com/beer/profile/19544/50564/"),
                    new Beer(["Pannepot"], "http://www.beeradvocate.com/beer/profile/15237/34306/"),
                    new Beer(["Barrel-Aged Blackout Stout", "BA Blackout"], "http://www.beeradvocate.com/beer/profile/73/27143/"),
                    new Beer(["Kuhnhenn Raspberry Eisbock"], "http://www.beeradvocate.com/beer/profile/2097/11784/"),
                    new Beer(["Uncle Jacob"], "http://www.beeradvocate.com/beer/profile/30/80197/"),
                    new Beer(["Great"], "http://www.beeradvocate.com/beer/profile/3120/25364/"),
                    new Beer(["Life Is Like", "Lil"], "http://www.beeradvocate.com/beer/profile/17981/98045/"),
                    new Beer(["Keene Idea"], "http://www.beeradvocate.com/beer/profile/3120/84225/"),
                    new Beer(["Backwoods Bastard"], "http://www.beeradvocate.com/beer/profile/1199/35036/"),
                    new Beer(["Unser Aventinus"], "http://www.beeradvocate.com/beer/profile/72/224/"),
                    new Beer(["Espresso Imperial Russian Stout"], "http://www.beeradvocate.com/beer/profile/147/92448/"),
                    new Beer(["Zhukov"], "http://www.beeradvocate.com/beer/profile/17981/45973/"),
                    new Beer(["Wet"], "http://www.beeradvocate.com/beer/profile/13014/53267/"),
                    new Beer(["Framboise For A Cure", "FFAC"], "http://www.beeradvocate.com/beer/profile/863/62403/"),
                    new Beer(["Firestone 17"], "http://www.beeradvocate.com/beer/profile/2210/103990/"),
                    new Beer(["Oude Tart With Sour Cherries", "Cherry oude", "oude with cherries"], "http://www.beeradvocate.com/beer/profile/16866/63724/"),
                    new Beer(["Hop Venom"], "http://www.beeradvocate.com/beer/profile/23066/72750/"),
                    new Beer(["Maple Bacon Coffee Porter", "MBCP"], "http://www.beeradvocate.com/beer/profile/16410/62761/"),
                    new Beer(["La Fin Du Monde"], "http://www.beeradvocate.com/beer/profile/22/34/"),
                    new Beer(["Rochefort 8"], "http://www.beeradvocate.com/beer/profile/207/1696/"),
                    new Beer(["Older Viscosity"], "http://www.beeradvocate.com/beer/profile/5318/34094/"),
                    new Beer(["Masala Mama"], "http://www.beeradvocate.com/beer/profile/1177/6368/"),
                    new Beer(["Live Oak HefeWeizen"], "http://www.beeradvocate.com/beer/profile/383/1062/"),
                    new Beer(["Arctic Devil"], "http://www.beeradvocate.com/beer/profile/385/18093/"),
                    new Beer(["Imperial Russian Stout - Bourbon Barrel Aged"], "http://www.beeradvocate.com/beer/profile/147/52752/"),
                    new Beer(["Julius"], "http://www.beeradvocate.com/beer/profile/28743/86237/"),
                    new Beer(["Old Rasputin"], "http://www.beeradvocate.com/beer/profile/112/412/"),
                    new Beer(["Ruination"], "http://www.beeradvocate.com/beer/profile/147/4083/"),
                    new Beer(["Sanctification"], "http://www.beeradvocate.com/beer/profile/863/20518/"),
                    new Beer(["Gandhi-Bot", "GandhiBot"], "http://www.beeradvocate.com/beer/profile/357/57259/"),
                    new Beer(["Cuvée Des Jacob", "Cuvee Des Jacob"], "http://www.beeradvocate.com/beer/profile/223/50772/"),
                    new Beer(["Serendipity"], "http://www.beeradvocate.com/beer/profile/590/86172/"),
                    new Beer(["Oude Gueuze Tilquin", "Tilquin gueuze"], "http://www.beeradvocate.com/beer/profile/25923/70745/"),
                    new Beer(["Event Horizon"], "http://www.beeradvocate.com/beer/profile/7753/64226/"),
                    new Beer(["Kuhnhenn Bourbon Barrel Barley Wine", "KBBBW"], "http://www.beeradvocate.com/beer/profile/2097/8388/"),
                    new Beer(["Damon"], "http://www.beeradvocate.com/beer/profile/22511/77273/"),
                    new Beer(["Caractère", "Caractere"], "http://www.beeradvocate.com/beer/profile/216/74778/"),
                    new Beer(["Apple Brandy Barrel-Aged Mexican Cake", "apple brandy mex"], "http://www.beeradvocate.com/beer/profile/24134/96523/"),
                    new Beer(["Chimay Grande Réserve (Blue)", "chimay blue", "blue chimay"], "http://www.beeradvocate.com/beer/profile/215/2512/"),
                    new Beer(["RuinTen"], "http://www.beeradvocate.com/beer/profile/147/82250/"),
                    new Beer(["Big Bad Baptist", "BBB"], "http://www.beeradvocate.com/beer/profile/22893/73618/"),
                    new Beer(["Cascade Apricot"], "http://www.beeradvocate.com/beer/profile/2391/42203/"),
                    new Beer(["Bois"], "http://www.beeradvocate.com/beer/profile/16866/93643/"),
                    new Beer(["Wings Of Armageddon"], "http://www.beeradvocate.com/beer/profile/25327/78517/"),
                    new Beer(["Cantillon Cuvée", "Cantillon Cuvee"], "http://www.beeradvocate.com/beer/profile/388/21683/"),
                    new Beer(["Twilight Of The Idols"], "http://www.beeradvocate.com/beer/profile/22511/62972/"),
                    new Beer(["Vigneronne"], "http://www.beeradvocate.com/beer/profile/388/2558/"),
                    new Beer(["Barrel Aged Sexual Chocolate", "BASC", "BA sex"], "http://www.beeradvocate.com/beer/profile/11036/51153/"),
                    new Beer(["Wulver"], "http://www.beeradvocate.com/beer/profile/12516/94714/"),
                    new Beer(["Peche 'n Brett", "peche n brett"], "http://www.beeradvocate.com/beer/profile/25710/81079/"),
                    new Beer(["Bourbon Abominable", "bbomb"], "http://www.beeradvocate.com/beer/profile/20680/55401/"),
                    new Beer(["Biscotti Break Bourbon", "bourbon biscot"], "http://www.beeradvocate.com/beer/profile/24300/104699/"),
                    new Beer(["Stormaktsporter"], "http://www.beeradvocate.com/beer/profile/10902/42664/"),
                    new Beer(["Westmalle Trappist Tripel", "Westmalle Tripel"], "http://www.beeradvocate.com/beer/profile/208/646/"),
                    new Beer(["Dark Lord"], "http://www.beeradvocate.com/beer/profile/26/7520/"),
                    new Beer(["Terrapin Coffee Oatmeal"], "http://www.beeradvocate.com/beer/profile/2372/21950/"),
                    new Beer(["Saison-Brett", "Saison Brett", "SaisonBrett"], "http://www.beeradvocate.com/beer/profile/423/36333/"),
                    new Beer(["Brunch Weasel"], "http://www.beeradvocate.com/beer/profile/13307/46987/"),
                    new Beer(["Myrcenary"], "http://www.beeradvocate.com/beer/profile/267/66436/"),
                    new Beer(["Cantillon Iris"], "http://www.beeradvocate.com/beer/profile/388/7435/"),
                    new Beer(["Rasputin XV"], "http://www.beeradvocate.com/beer/profile/112/87756/"),
                    new Beer(["Bitter Monk"], "http://www.beeradvocate.com/beer/profile/24903/72465/"),
                    new Beer(["Abraxas"], "http://www.beeradvocate.com/beer/profile/25888/76393/"),
                    new Beer(["Framinghammer Baltic Porter - Bourbon Barrel Aged", "bourbon Framinghammer"], "http://www.beeradvocate.com/beer/profile/26520/79898/"),
                    new Beer(["Sang Royal"], "http://www.beeradvocate.com/beer/profile/2391/49807/"),
                    new Beer(["Pirate Bomb"], "http://www.beeradvocate.com/beer/profile/30356/102340/"),
                    new Beer(["Fuzzy Baby"], "http://www.beeradvocate.com/beer/profile/357/82482/"),
                    new Beer(["90 Minute"], "http://www.beeradvocate.com/beer/profile/10099/2093/"),
                    new Beer(["Double Bastard"], "http://www.beeradvocate.com/beer/profile/147/1056/"),
                    new Beer(["Alpha King"], "http://www.beeradvocate.com/beer/profile/26/39/"),
                    new Beer(["Rodenbach Grand Cru"], "http://www.beeradvocate.com/beer/profile/216/673/"),
                    new Beer(["Plead The 5th", "pt5"], "http://www.beeradvocate.com/beer/profile/1471/45073/"),
                    new Beer(["Barrel Aged B.O.R.I.S.", "BA Boris", "barrel aged boris"], "http://www.beeradvocate.com/beer/profile/14879/47695/"),
                    new Beer(["Cuvée Van De Keizer", "Cuvee Van De Keizer"], "http://www.beeradvocate.com/beer/profile/1534/6947/"),
                    new Beer(["Bourbon Barrel Barleywine Ale"], "http://www.beeradvocate.com/beer/profile/652/41300/"),
                    new Beer(["Thumbprint Wild"], "http://www.beeradvocate.com/beer/profile/590/96366/"),
                    new Beer(["Berserker"], "http://www.beeradvocate.com/beer/profile/385/27339/"),
                    new Beer(["Humulus"], "http://www.beeradvocate.com/beer/profile/16866/51557/"),
                    new Beer(["Bottleworks XII", "Bottleworks 12"], "http://www.beeradvocate.com/beer/profile/16866/66743/"),
                    new Beer(["Sour In The Rye With Kumquats", "Sour In The Rye Kumquat", "kumquat sour in", "KSITR"], "http://www.beeradvocate.com/beer/profile/16866/79533/"),
                    new Beer(["Elevated"], "http://www.beeradvocate.com/beer/profile/24659/66245/"),
                    new Beer(["What Is Enlightenment"], "http://www.beeradvocate.com/beer/profile/22511/80774/"),
                    new Beer(["Cuvee De Castleton"], "http://www.beeradvocate.com/beer/profile/12959/36782/"),
                    new Beer(["Noyaux"], "http://www.beeradvocate.com/beer/profile/2391/56333/"),
                    new Beer(["The Pupil"], "http://www.beeradvocate.com/beer/profile/28994/81838/"),
                    new Beer(["Two Hearted"], "http://www.beeradvocate.com/beer/profile/287/1093/"),
                    new Beer(["Edmund Fitzgerald"], "http://www.beeradvocate.com/beer/profile/73/226/"),
                    new Beer(["Oak Aged Yeti"], "http://www.beeradvocate.com/beer/profile/158/19216/"),
                    new Beer(["Curieux"], "http://www.beeradvocate.com/beer/profile/4/16909/"),
                    new Beer(["Fantôme Saison", "Fantome Saison"], "http://www.beeradvocate.com/beer/profile/738/5057/"),
                    new Beer(["Cantillon Kriek"], "http://www.beeradvocate.com/beer/profile/388/1632/"),
                    new Beer(["Deliverance"], "http://www.beeradvocate.com/beer/profile/18149/60886/"),
                    new Beer(["Le Terroir"], "http://www.beeradvocate.com/beer/profile/192/26541/"),
                    new Beer(["White Rajah"], "http://www.beeradvocate.com/beer/profile/2470/62722/"),
                    new Beer(["Kiwi Rising"], "http://www.beeradvocate.com/beer/profile/26520/75414/"),
                    new Beer(["DRIPA"], "http://www.beeradvocate.com/beer/profile/2097/36988/"),
                    new Beer(["Kopi Luwak"], "http://www.beeradvocate.com/beer/profile/396/54035/"),
                    new Beer(["Solitude #6", "Solitude 6"], "http://www.beeradvocate.com/beer/profile/22511/90634/"),
                    new Beer(["Duvel"], "http://www.beeradvocate.com/beer/profile/222/695/"),
                    new Beer(["Founders Porter"], "http://www.beeradvocate.com/beer/profile/1199/7348/"),
                    new Beer(["Union Jack"], "http://www.beeradvocate.com/beer/profile/2210/38180/"),
                    new Beer(["Choklat"], "http://www.beeradvocate.com/beer/profile/3818/40058/"),
                    new Beer(["Founders Harvest"], "http://www.beeradvocate.com/beer/profile/1199/20478/"),
                    new Beer(["Espresso Oak Aged Yeti"], "http://www.beeradvocate.com/beer/profile/158/42723/"),
                    new Beer(["DirtWolf", "Dirt Wolf"], "http://www.beeradvocate.com/beer/profile/345/99873/"),
                    new Beer(["Odell IPA"], "http://www.beeradvocate.com/beer/profile/267/35626/"),
                    new Beer(["Hoponius Union"], "http://www.beeradvocate.com/beer/profile/26520/71820/"),
                    new Beer(["Pannepot Reserva"], "http://www.beeradvocate.com/beer/profile/15237/34312/"),
                    new Beer(["Good Gourd"], "http://www.beeradvocate.com/beer/profile/17981/47020/"),
                    new Beer(["Knuckle Sandwich"], "http://www.beeradvocate.com/beer/profile/17271/54745/"),
                    new Beer(["The Wanderer"], "http://www.beeradvocate.com/beer/profile/16866/68676/"),
                    new Beer(["Triple Play"], "http://www.beeradvocate.com/beer/profile/17980/66297/"),
                    new Beer(["Unicorn Galaxy"], "http://www.beeradvocate.com/beer/profile/28178/87912/"),
                    new Beer(["Black Damnation V"], "http://www.beeradvocate.com/beer/profile/15237/56776/"),
                    new Beer(["Jai Alai"], "http://www.beeradvocate.com/beer/profile/17981/46363/"),
                    new Beer(["Flower Power"], "http://www.beeradvocate.com/beer/profile/651/6076/"),
                    new Beer(["Tripel Karmeliet"], "http://www.beeradvocate.com/beer/profile/202/656/"),
                    new Beer(["AleSmith IPA"], "http://www.beeradvocate.com/beer/profile/396/3916/"),
                    new Beer(["La Folie"], "http://www.beeradvocate.com/beer/profile/192/1917/"),
                    new Beer(["Weihenstephaner Vitus"], "http://www.beeradvocate.com/beer/profile/252/35625/"),
                    new Beer(["Weihenstephaner Hefeweissbier Dunkel"], "http://www.beeradvocate.com/beer/profile/252/808/"),
                    new Beer(["Oude Tart"], "http://www.beeradvocate.com/beer/profile/16866/54888/"),
                    new Beer(["MO"], "http://www.beeradvocate.com/beer/profile/20681/78906/"),
                    new Beer(["Chillwave"], "http://www.beeradvocate.com/beer/profile/73/90156/"),
                    new Beer(["Girardin Gueuze"], "http://www.beeradvocate.com/beer/profile/2541/6317/"),
                    new Beer(["Simtra"], "http://www.beeradvocate.com/beer/profile/23200/78377/"),
                    new Beer(["Cherry Adam", "CAFTW"], "http://www.beeradvocate.com/beer/profile/173/45936/"),
                    new Beer(["Andechser Doppelbock Dunkel"], "http://www.beeradvocate.com/beer/profile/911/2899/"),
                    new Beer(["Lindley Park"], "http://www.beeradvocate.com/beer/profile/7753/75009/"),
                    new Beer(["Farmer's Reserve #3", "Farmer's Reserve 3"], "http://www.beeradvocate.com/beer/profile/24940/94425/"),
                    new Beer(["Tartare"], "http://www.beeradvocate.com/beer/profile/610/75491/"),
                    new Beer(["Czar Jack"], "http://www.beeradvocate.com/beer/profile/1177/20578/"),
                    new Beer(["Bligh's Barleywine", "Blighs Barleywine"], "http://www.beeradvocate.com/beer/profile/12314/73910/"),
                    new Beer(["Citra Pale Ale"], "http://www.beeradvocate.com/beer/profile/22511/59672/"),
                    new Beer(["Tweak"], "http://www.beeradvocate.com/beer/profile/30/56199/"),
                    new Beer(["Notorious"], "http://www.beeradvocate.com/beer/profile/23066/70013/"),
                    new Beer(["stone IPA"], "http://www.beeradvocate.com/beer/profile/147/88/"),
                    new Beer(["Hop Rod"], "http://www.beeradvocate.com/beer/profile/610/3158/"),
                    new Beer(["Wookey Jack"], "http://www.beeradvocate.com/beer/profile/2210/79286/"),
                    new Beer(["Arctic Panzer"], "http://www.beeradvocate.com/beer/profile/26/52531/")
				];

                /***
                * Update our beer list by fetching the actual list
                */

                // send a request to get the top 250 page
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "http://www.beeradvocate.com/lists/top/", true);
                xhr.onreadystatechange = function(){
                    if (xhr.readyState == 4) {

                        // execute when the request returns
                        if(xhr.status == 200) {

                            // execute if the page fetch was successful
                            var string = this.responseText;
                            var notDone = true;
                            var count = 0;
                            var beerlinklist = new Array();

                            while (notDone) {
                                var index = string.indexOf("/beer/profile/");
                                if (index == -1) {
                                    // we're done
                                    notDone = false;
                                } else {

                                    // find out the length of the link to judge if we want it
                                    var end = index;
                                    for (var i = 0; i < 4; i++) {
                                        end = string.indexOf("/", end + 1);
                                    }

                                    if (end - index < 27) {
                                        // found an actual beer link, add it to the list

                                        // grab the name in case it's a beer not in our list
                                        var name = string.substring(end + 6, string.indexOf("<", end + 7));

                                        beerlinklist[count] = new Beer([name], "http://www.beeradvocate.com" + string.substring(index, end + 1));
                                        count++;
                                    }
                                    string = string.substring(index + 28, string.length);
                                }
                            }

                            // use our list to create the final top 250 list
                            var new250 = new Array();
                            count = 0;
                            for (var i = 0; i < beerlinklist.length; i++) {
                                var found = -1;
                                for (var j = 0; j < top.length; j++) {
                                    if (top[j].baLink == beerlinklist[i].baLink) {
                                        // match to our manual list, use the old beer function
                                        new250[count] = top[j];
                                        found = j;
                                    }
                                }
                                if (found > -1) {
                                    // Already added the beer to the list, do nothing
                                    // console.log("match: " + top[found].arrayNames[0]);
                                } else {
                                    console.log("beer missing match: " + beerlinklist[i].arrayNames[0]);
                                    new250[count] = beerlinklist[i];
                                }
                                count++;
                            }
                            // swap the lists
                            top = new250;
                        }

                        // execute further code regardless of the fetch status
                        
                        /***
                        * Code to find beers in the page and add them to our popup
                        */

                        // inner function for findBeer is split out so that it can be recursively called in the skip case
                        function findBeerInnerFunction(beer, i, j, skip) {
                            // Check if our webpage text contains the beer name
                            var indexFound = response.htmlContent.toLowerCase().indexOf(beer.arrayNames[j].toLowerCase(), skip)
                            if(~indexFound) {

                                // special checks to stop some false positives on some of the short names, see if there are letters before or after mo/matt
                                if(beer.arrayNames[j].toLowerCase() == "matt" || beer.arrayNames[j].toLowerCase() == "mo") {
                                    if ((response.htmlContent.toLowerCase().charCodeAt(indexFound - 1) > 96) && (response.htmlContent.toLowerCase().charCodeAt(indexFound - 1) < 123) ||
                                        (response.htmlContent.toLowerCase().charCodeAt(indexFound + beer.arrayNames[j].length) > 96) && 
                                        (response.htmlContent.toLowerCase().charCodeAt(indexFound + beer.arrayNames[j].length) < 123) ) {
                                            // It's not actually matt or mo, has a letter on either side of it
                                        return findBeerInnerFunction(beer, i, j, indexFound + 2);
                                    }
                                }

                                // code executed if it is found.  Create a beer link and add it to our list.
                                var bl = document.getElementById('beerList');
                                var beertext = document.createTextNode("(" + (i + 1) + ") " + beer.arrayNames[j]);
                                var link = document.createElement('li');
                                var entry = document.createElement('a');
                                entry.appendChild(beertext);
                                entry.setAttribute("href", beer.baLink);
                                link.appendChild(entry);
                                bl.appendChild(link);
                                return true;
                            }
                        }

                        // takes in a beer, checks if it is found, adds it to the table
                        function findBeer(beer, i) {
                            for (var j = 0; j < beer.arrayNames.length; j++) {
                                var found = findBeerInnerFunction(beer, i, j, 0);
                                if (found) {
                                    return;
                                }
                            }
                        }

                        // Go through the list and call the above function to check if it is in the webpage
                        for (var i = 0; i < top.length; i++) {
                            findBeer(top[i], i);
                        }

                        /***
                        * Code to make our links works
                        */

                        // get all links
                        var hrefs = document.getElementsByTagName("a");

                        // function to call when clicked
                        function openLink() {
                            var href = this.href;
                            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                chrome.tabs.create({ url: href });
                            });
                        }

                        // add the function to all of our links
                        for (var i=0,a; a=hrefs[i]; ++i) {
                            hrefs[i].addEventListener('click', openLink);
                        }

                        var text = document.getElementById('someText');
                        text.innerHTML  = "Top 250 beers found within this tab: "
                    }
                }
                xhr.send();
                var text = document.getElementById('someText');
                text.innerHTML  = "Currently searching this tab for top 250 beers."
			}
		});
	}
});