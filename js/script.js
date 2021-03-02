function showCoordinates (e) {
	alert(e.latlng);
}

function centerMap (e) {
	map.panTo(e.latlng);
}

function zoomIn (e) {
	map.zoomIn();
}

function zoomOut (e) {
	map.zoomOut();
}

let map = L.map('map', {
	contextmenu: true,
	contextmenuWidth: 140,
	contextmenuItems: [{
		text: 'Afficher les coordonnées',
		callback: showCoordinates
	}, {
		text: 'Centrer la carte',
		callback: centerMap
	}, '-', {
		text: 'Zoomer',
		icon: 'img/zoom-in.png',
		callback: zoomIn
	}, {
		text: 'Dézoomer',
		icon: 'img/zoom-out.png',
		callback: zoomOut
	}]
}).setView([47.5038922, 3.3431156], 15);

let typeOfMap = false;
let button = document.getElementById('button');
let myMarkers = L.featureGroup().addTo(map);

let sidebar = L.control.sidebar('sidebar').addTo(map);

/*let map1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(map);

let map2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});*/

let vueSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

let vuePlan = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

button.addEventListener("click", function(){
	switch(typeOfMap){
		case(false):
		vuePlan.remove();
		vueSatellite.addTo(map);
		break;
		case(true):
		vueSatellite.remove();
		vuePlan.addTo(map);
		break;
		default:
		alert("Erreur");
		break;
	}
	typeOfMap === false ? typeOfMap = true : typeOfMap = false;
});


let marker;

filter();
btnForm.onclick = () => filter();

function filter() {

	myMarkers.clearLayers();

	let categories = [];

	if (ServicesPublics.checked) {
		categories.push('Services publics ou institution');
	}
	if (Education.checked) {
		categories.push('Education');
	}
	if (Culture.checked) {
		categories.push('Culture');
	}
	if (Commerces.checked) {
		categories.push('Commerces');
	}
	if (VenteDirecte.checked) {
		categories.push('Vente directe');
	}
	if (Artisans.checked) {
		categories.push('Artisans');
	}
	if (Dormir.checked) {
		categories.push('Où dormir ?');
	}
	if (Santé.checked) {
		categories.push('Santé');
	}
	if (Tourisme.checked) {
		categories.push('Tourisme');
	}
	if (Déchetterie.checked) {
		categories.push("Déchetterie et points d'apports");
	}
	if (Hameau.checked) {
		categories.push('Hameau');
	}

	for(let i = 0; i < coordonnees.length; i++){
		for(let j = 0 ; j < categories.length; j++){
			if(coordonnees[i]['categorie'] == categories[j]){
				switch(coordonnees[i]['categorie']){
					case("Services publics ou institution"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: redIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Education"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: blueIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Culture"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: goldIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Commerces"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: greenIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Vente directe"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: orangeIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Artisans"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: yellowIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Où dormir ?"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: greyIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Santé"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: blackIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Lieux de culte"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: violetIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Tourisme"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: darkblueIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Déchetterie et points d'apports"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: pinkIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					case("Hameau"):
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']], {icon: cyanIcon}).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers);
					break;

					default:
					marker = L.marker([coordonnees[i]['lat'], coordonnees[i]['long']]).addTo(map).bindPopup(coordonnees[i]['texte']).addTo(myMarkers)
					break;
				}
			}
		}
	}
}

/*let circle = L.circle([47.48956028801037, 3.3506592729459195], {
	color: '#f55',
	fillColor: '#fdd',
	fillOpacity: 0.5,
	radius: 250
}).addTo(map);*/