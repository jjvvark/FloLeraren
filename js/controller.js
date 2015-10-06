(function(){

var app = angular.module('controllers', []);
app.controller('bodyController', ['$scope', 'dataFactory', function($scope, dataFactory){

// Elements
var thumbImage = angular.element( document.querySelector("#resultImage"));
var pvThumbImage = angular.element( document.querySelector("#pvResultImage"));

// Shared / Helper
var volgorde = function(a, b){

	if(a.Volgorde < b.Volgorde) {
		return -1;
	}

	if(a.Volgorde > b.Volgorde) {
		return 1;
	}

	return 0;

};

function getPageID() {

	if( $scope.toetsType === $scope.toetsTypes.module ) {

		switch( $scope.moduleType ) {
			case $scope.moduleTypes.hoofdstukken:
				return 2;
				break;
			case $scope.moduleTypes.opdrachten:
				return 3;
				break;
			case $scope.moduleTypes.oefentoetsen:
				return 4;
				break
		}

	} else if( $scope.toetsType === $scope.toetsTypes.toets ) {

		switch( $scope.vraagType ) {
			case $scope.vraagTypes.gesloten:
				return 6;
				break;
			case $scope.vraagTypes.open:
				console.log("Vraag types open nog niet gedefinieerd in getPageID");
				break;
		}

	}

	console.log("error :: getPageId :: Unknown page id");
	return -1;

}

// Constants
$scope.moduleTypes = {
	hoofdstukken: 0,
	opdrachten: 1,
	oefentoetsen: 2
};

$scope.toetsTypes = {
	module: 0,
	toets: 1
};

$scope.vraagTypes = {
	open: 0,
	gesloten: 1
};

$scope.pages = {
	home: 0,
	nakijken: 1,
	studenten: 2,
	statistiek: 3,
	berichten: 4,
	bestanden: 5,
	info: 6
};

// Routing
$scope.currentPage = $scope.pages.studenten;
$scope.isPage = function(page){
	return $scope.currentPage === page;
};
$scope.setPage = function(page){

	if( $scope.currentPage === page ) {
		return;
	}

	$scope.currentPage = page;

	$scope.refresh();

};


// Main Data

//Pakketten
$scope.pakketten = [];
$scope.currentPakket = null;
$scope.setPakket = function(pakket){

	// Dezelfde
	if($scope.currentPakket === pakket) {
		return;
	}

	$scope.resetStudLijst();

	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();

	$scope.resetAntwoord();
	$scope.resetPogingen();
	$scope.resetVragen();
	$scope.resetStudenten();
	$scope.resetHoofdstukken();
	$scope.resetKlassen();
	$scope.resetModules();

	$scope.currentPakket = pakket;
	$scope.refresh();

};
$scope.resetPakketten = function(){
	$scope.currentPakket = null;
	$scope.pakketten = [];
};

//Modules
$scope.modules = [];
$scope.currentModule = null; 
$scope.setModule = function(module){

	//Dezelfde
	if($scope.currentModule === module) {
		return;
	}

	$scope.resetStudLijst();

	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();

	$scope.resetAntwoord();
	$scope.resetPogingen();
	$scope.resetVragen();
	$scope.resetStudenten();
	$scope.resetKlassen();
	$scope.resetHoofdstukken();
	$scope.currentModule = module;

	$scope.refresh();

};
$scope.resetModules = function(){
	$scope.currentModule = null;
	$scope.modules = [];
};

//Klassen
$scope.klassen = [];
$scope.currentKlas = null;
$scope.setKlas = function(klas){

	if($scope.currentKlas === klas) {
		// Dezelfde
		return;
	}

	$scope.resetStudLijst();

	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();

	$scope.resetAntwoord();
	$scope.resetPogingen();
	$scope.resetVragen();
	$scope.resetStudenten();
	$scope.currentKlas = klas;

	$scope.refresh();

};
$scope.resetKlassen = function(){
	$scope.klassen = [];
	$scope.currentKlas = null;
};


// Nakijken

//Hoofdstukken
$scope.hoofdstukken = [];
$scope.currentHoofdstuk = null;
$scope.setHoofdstuk = function(hoofdstuk){

	if( $scope.currentHoofdstuk === hoofdstuk ) {
		// Dezelfde
		return;
	}

	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();
	$scope.resetAntwoord();
	$scope.resetPogingen();
	$scope.resetVragen();

	$scope.currentHoofdstuk = hoofdstuk;

	$scope.refresh();

};
$scope.resetHoofdstukken = function(){
	$scope.hoofdstukken = [];
	$scope.currentHoofdstuk = null;
};

//Opdrachten
$scope.opdrachten = [];
$scope.currentOpdracht = null;
$scope.setOpdracht = function(opdracht){

	if( $scope.currentOpdracht === opdracht ) {
		// Dezelfde
		return;
	}

	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();
	$scope.resetAntwoord();
	$scope.resetPogingen();
	$scope.resetVragen();

	$scope.currentOpdracht = opdracht;

	$scope.refresh();

};
$scope.resetOpdrachten = function(){
	$scope.opdrachten = [];
	$scope.currentOpdracht = null;
};

//Oefentoetsen
$scope.oefentoetsen = [];
$scope.currentOefentoets = null;
$scope.setOefentoets = function(oefentoets){

	if( $scope.currentOefentoets === oefentoets ) {
		// Dezelfde
		return;
	}

	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();
	$scope.resetAntwoord();
	$scope.resetPogingen();

	$scope.resetAntwoord();
	$scope.currentOefentoets = oefentoets;

	$scope.refresh();

};
$scope.resetOefentoetsen = function(){
	$scope.oefentoetsen = [];
	$scope.currentOefentoets = null;
};

//Studenten
$scope.studenten = [];
$scope.currentStudent = null;
$scope.setStudent = function(student){

	//Dezelfde
	if(student === $scope.currentStudent) {
		return;
	}

	$scope.resetPogingen();
	$scope.resetVragen();

	$scope.currentStudent = student;

	$scope.refresh();

};
$scope.resetStudenten = function(){
	$scope.studenten = [];
	$scope.currentStudent = null;
};
$scope.isStudent = function(student){
	return student === $scope.currentStudent;
};

//Pogingen
$scope.pogingen = [];
$scope.currentPoging = null;
$scope.setPoging = function(poging){

	if(poging === $scope.currentPoging) {
		return;
	}

	$scope.currentPoging = poging;
	$scope.resetVragen();
	$scope.resetAntwoord();

	$scope.refresh();

};
$scope.resetPogingen = function(){
	$scope.pogingen = [];
	$scope.currentPoging = null;
};

//Vragen
$scope.vragen = [];
$scope.currentVraag = null;
$scope.setVraag = function(vraag){

	// Dezelfde
	if(vraag === $scope.currentVraag) {
		return;
	}

	$scope.currentVraag = vraag;

	$scope.refresh();

};
$scope.resetVragen = function(){
	$scope.vragen = [];
	$scope.currentVraag = null; 
};
$scope.isVraag = function(vraag){
	return vraag === $scope.currentVraag;
};

$scope.antwoord = null;
$scope.setAntwoord = function(antwoord){
	$scope.antwoord = antwoord;
	//set image
	thumbImage.attr("src", antwoord.SnapshotThumbnail);
};
$scope.resetAntwoord = function(){
	thumbImage.attr("src", "");
	$scope.antwoord = null;
};

// PerVraagVragen
$scope.pvvragen = [];
$scope.currentPVVraag = null;
$scope.setPVVraag = function(vraag){

	if(vraag === $scope.currentPVVraag) {
		return;
	}

	$scope.resetPVAntwoord();
	$scope.resetPVStudent();

	$scope.currentPVVraag = vraag;

	$scope.refresh();

};
$scope.resetPVVragen = function(){
	$scope.pvvragen = [];
	$scope.currentPVVraag = null;
};
$scope.isPVVraag = function(vraag){
	return $scope.currentPVVraag === vraag;
};

// PerVraagStudenten
$scope.pvstudenten = [];
$scope.currentPVStudent = null;
$scope.setPVStudent = function(student){

	if($scope.currentPVStudent === student) {
		return;
	}

	$scope.currentPVStudent = student;

	$scope.refresh();

};
$scope
$scope.isPVStudent = function(student){
	return $scope.currentPVStudent === student;
};
$scope.resetPVStudent = function(){
	$scope.pvstudenten = [];
	$scope.currentPVStudent = null;
};

$scope.pvAntwoord = null;
$scope.setPVAntwoord = function(antwoord){
	$scope.pvAntwoord = antwoord;
	//set image
	pvThumbImage.attr("src", antwoord.SnapshotThumbnail);
};
$scope.resetPVAntwoord = function(){
	pvThumbImage.attr("src", "");
	$scope.pvAntwoord = null;
};

// Filters
$scope.toetsType = $scope.toetsTypes.module;
$scope.$watch('toetsType', function(newValue, oldValue){
	$scope.refresh();
});

$scope.moduleType = $scope.moduleTypes.hoofdstukken;
$scope.$watch('moduleType', function(newValue, oldValue){
	console.log("moduleType", newValue);
	$scope.resetStudLijst();
	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();
	$scope.resetPogingen(); 
	$scope.resetAntwoord();
	$scope.resetVragen();
	$scope.refresh();
});

$scope.perVraag = false;
$scope.$watch('perVraag', function(newValue, oldValue){
	$scope.resetStudLijst();
	$scope.resetPVAntwoord();
	$scope.resetPVVragen();
	$scope.resetPVStudent();
	$scope.resetPogingen(); 
	$scope.resetAntwoord();
	$scope.resetVragen();
	$scope.refresh();

});

// Studenten
$scope.studLijst = [];
$scope.studCurrentStudent = null;
$scope.setStudLijst = function(lijst){

	if(lijst === $scope.studLijst) {
		return;
	}

	$scope.studLijst = lijst;
};
$scope.resetStudLijst = function(){
	$scope.studLijst = [];
};

// Disablers
$scope.isDisabled = function(){
	return $scope.currentModule === null || $scope.currentKlas === null;
};

// Refresh
$scope.refresh = function(){

	console.log("refresh");

	// Als er geen pakketten zijn
	if( $scope.currentPakket === null ) {

		dataFactory.getPakketten().then(function(data){
			$scope.pakketten = data;
		}, function(response){
			console.log("refresh :: getPakketten ::", response);
		});

		return;

	}

	// Wanneer een nieuw pakket gekozen is
	if( $scope.currentModule === null ) {

		dataFactory.getModules($scope.currentPakket).then( function(data){
			$scope.modules = data;
			// $scope.refresh();

		}, function(response){
			console.log("refresh :: getModules ::", response);
		} );

		return;

	}

	if( $scope.currentKlas === null ) {

		dataFactory.getKlassen($scope.currentPakket.LicenseID, $scope.currentModule.CourseID).then(function(data){

			$scope.klassen = data;

			if( data.length == 0 ) {
				console.log("klassen error: 0 found in dit pakket.");
			} else {

				// zet eerste klas (aka alle klassen) als standaard
				$scope.setKlas(data[0]);

			}

		}, function(response){
			console.log("refresh :: getKlassen ::", response);
		});
		return;

	}

	// refresh per page
	if( $scope.currentPage === $scope.pages.nakijken ) {
		refreshNakijken();
	} else if( $scope.currentPage === $scope.pages.studenten ) {
		refreshStudenten();
	}

};

function refreshNakijken(){

	// Ga Coursinfo halen
	if( $scope.currentHoofdstuk === null ) {

		dataFactory.getCourseInfo( $scope.currentModule.CourseID ).then(function(data){

			// process course info
			var h = []; // temp hoofdstukken
			var o = []; // temp opdrachten
			var f = []; // temp oefentoetsen

			for(var i = 0; i < data.length; i++) {
				if(data[i].PageKindID === 2) {
					h.push(data[i]);
				} else if(data[i].PageKindID === 3) {
					o.push(data[i]);
				} else if(data[i].PageKindID === 4) {
					f.push(data[i]);
				}
			}

			$scope.hoofdstukken = h.sort( volgorde );
			$scope.setHoofdstuk( $scope.hoofdstukken[0] );

			$scope.opdrachten = o.sort( volgorde );
			$scope.setOpdracht( $scope.opdrachten[0] );

			$scope.oefentoetsen = f.sort( volgorde );
			$scope.setOefentoets( $scope.oefentoetsen[0] );

			$scope.refresh();
			
		}, function(response){
			console.log("error", response);
		});

		return;

	}

	// get pid
	var pid = -1;

	if( $scope.moduleType === $scope.moduleTypes.hoofdstukken ) {
		pid = $scope.currentHoofdstuk.Id;
	} else if( $scope.moduleType === $scope.moduleTypes.opdrachten ) {
		pid = $scope.currentOpdracht.Id;
	} else if( $scope.moduleType === $scope.moduleTypes.oefentoetsen ) {
		pid = $scope.currentOefentoets.Id;
	}

	if(pid == -1) {
		console.log( "Handle this error: pid :", pid );
		return;
	}

	if( $scope.perVraag ) {
		nakijkenPerVraag(pid);
	} else {
		nakijkenPerStudent(pid)
	}

}

function nakijkenPerVraag(pid) {

	// Zet vragen neer
	if( $scope.currentPVVraag === null ) {

		dataFactory.getPVVragen($scope.currentPakket.LicenseID, $scope.currentModule.CourseID, $scope.currentKlas.Id, pid).then( function(data){
			$scope.pvvragen = data;

			if(data.length > 0) {
				$scope.setPVVraag(data[0]);
			} else {
				console.log("no pvvragen found.");
			}

		}, function(response){
			console.log("error :: nakijkenPerVraag :: getPVVragen", response);
		} );

		return;

	}

	if( $scope.currentPVStudent === null ) {

		// attemptID staat op 1, voor laatste
		dataFactory.getPVStudenten($scope.currentPakket.LicenseID, pid, $scope.currentPVVraag.ObjectID, 1).then(function(data){

			$scope.pvstudenten = data;

			if(data.length > 0) {
				$scope.setPVStudent(data[0]);
			} else {
				console.log("no pvstudenten/antwoord gevonden");
			}

		}, function(response){
			console.log("error :: refresh :: nakijkenPerVraag ::", response);
		});

		return;

	}

	if( $scope.pvAntwoord === null ) {

		dataFactory.getPVVraag( $scope.currentPVStudent.Id ).then( function(data){

			$scope.setPVAntwoord( data );

		}, function(response){
			console.log("error :: refresh :: getPVAntwoord", response);
		} );

	}


}

function nakijkenPerStudent(pid) {

	// Zet studenten neer
	if( $scope.currentStudent === null ) {

		dataFactory.getStudenten($scope.currentPakket.LicenseID, $scope.currentModule.CourseID, $scope.currentKlas.Id, pid).then(function(data){
			$scope.studenten = data;

			if(data.length > 0) {
				$scope.setStudent(data[0]);
				$scope.refresh();
			} else {
				console.log("no students found");
			}

		}, function(response){
			console.log("error :: Refresh :: getStudenten", response);
		});

		return;

	}

	// Pogingen
	if( $scope.currentPoging === null ) {

		dataFactory.getAttempts( $scope.currentStudent.LicensedCourseID, pid ).then( function(data){

			$scope.pogingen = data;

			if(data.length === 0) {
				console.log("error :: getAttempts :: geen pogingen gevonden");
			} else {
				$scope.setPoging(data[0]);
			}

		}, function(response){
			console.log( "error :: getAttempts ::", response );
		} );

		return;

	}

	// Vragen
	if( $scope.currentVraag === null ) {

		dataFactory.getVragen($scope.currentStudent.LicensedCourseID, pid, $scope.currentPoging.Id).then(function(data){
			$scope.vragen = data;
			if(data.length > 0) {
				$scope.currentVraag = data[0];
				$scope.refresh();
			} else {
				console.log("Er zijn geen vragen.");
			}
		}, function(response){
			console.log("error :: refresh :: getVragen ::", response);
		});

		return;

	}

	// Vraag en antwoord
	if( $scope.currentVraag != null ) {

		dataFactory.getVraag( $scope.currentVraag.Id ).then(function(data){

			// thumbImage.attr("src", data.SnapshotThumbnail);
			$scope.setAntwoord(data);

		}, function(response){
			console.log("error :: refresh :: getVraag ::", response);
		});

	}

}
 
function refreshStudenten(){
	
	if( $scope.studCurrentStudent === null ) {

		dataFactory.getStudentOverzicht($scope.currentPakket.LicenseID, $scope.currentModule.CourseID, $scope.currentKlas.Id, getPageID()).then(function(data){
			
			$scope.setStudLijst(data);

		}, function(response){
			console.log("error :: refreshStudenten :: studLijst", response);
		});

	}

};

$scope.toggleUserLicense = function(id, itemName){

	 //          licenseID, courseID, attributeID, pageID, licensedCourseID, itemName
	console.log( $scope.currentPakket.LicenseID, $scope.currentModule.CourseID, getPageID(), id, itemName );
	dataFactory.toggleLicense( $scope.currentPakket.LicenseID, $scope.currentModule.CourseID, getPageID(), id, itemName ).then(
		function(data){
			$scope.refresh();
		}, function(response){
			console.log("error :: toggleUserLicense ::", response);
		});
}

// Debug
$scope.go = function(){
	console.log( "currentPakket    ", $scope.currentPakket );
	console.log( "currentModule    ", $scope.currentModule );
	console.log( "currentKlas      ", $scope.currentKlas );
	console.log( "currentHoofdstuk ", $scope.currentHoofdstuk );
	console.log( "currentOpdracht  ", $scope.currentOpdracht );
	console.log( "currentOefentoets", $scope.currentOefentoets );
	console.log( "currentStudent   ", $scope.currentStudent );
	console.log( "currentVraag     ", $scope.currentVraag );
	console.log( "currentPVVraag   ", $scope.currentPVVraag );
	console.log( "currentPVStudent ", $scope.currentPVStudent );
	console.log( "studenten Lijst  ", $scope.studLijst );
};

}]);

})();