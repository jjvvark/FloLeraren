(function(){

var app = angular.module( 'controllers', [] );

app.controller('bodyController', [ '$scope', 'dataFactory', '$location', function($scope, dataFactory, $location){

// cons
$scope.moduleTypes = {
	hoofdstukken: 0,
	opdrachten: 1,
	oefentoetsen: 2
};

// shared
var volgorde = function(a, b){

			if(a.Volgorde < b.Volgorde) {
				return -1;
			}

			if(a.Volgorde > b.Volgorde) {
				return 1;
			}

			return 0;

		};

// Routing
$scope.currentPage = "studenten";
$scope.isPage = function(page){
	return $scope.currentPage === page;
};
$scope.setPage = function(page){
	$scope.currentPage = page;
};


// Pakketten
$scope.pakketten = [];
$scope.currentPakket = null;
$scope.pakketLabel = function(){

	if($scope.currentPakket === null) {
		return 'Kies een pakket...';
	} else {
		return $scope.currentPakket.PackageDescription;
	}

};

$scope.setPakket = function(pakket){
	$scope.currentPakket = pakket;

	// reset modules
	$scope.currentModule = null;
	$scope.modules = [];
	$scope.studenten = [];

	// laad modules
	var p = dataFactory.getModules(pakket);

	p.then(function(data){
		$scope.modules = data;
	}, function(){
		console.log('something went wrong');
	});

};

// Modules
$scope.modules = [];
$scope.currentModule = null;
$scope.moduleLabel = function(){
	return ($scope.currentModule === null) ? "Kies een module..." : $scope.currentModule.CourseDescription;
};
$scope.setModule = function(module){

	$scope.currentModule = module;

	// temp!!
	if($scope.currentKlas === null) {
		console.log("Problem :: Check Klas!");
		return;
	}

	// get coursedata
	var p = dataFactory.getCourseInfo( $scope.currentModule.CourseID );

	p.then( function(response){

		// process course info
		var h = []; // temp hoofdstukken
		var o = []; // temp opdrachten
		var f = []; // temp oefentoetsen

		for(var i = 0; i < response.length; i++) {
			if(response[i].PageKindID === 2) {
				h.push(response[i]);
			} else if(response[i].PageKindID === 3) {
				o.push(response[i]);
			} else if(response[i].PageKindID === 4) {
				f.push(response[i]);
			}
		}

		$scope.hoofdstukken = h.sort( volgorde );
		// if( $scope.hoofdstukken.length === 0 ) {
		// 	console.log("Geen hoofdstukken");
		// 	return;
		// }
		// $scope.setHoofdstuk( $scope.hoofdstukken[0] );

		$scope.opdrachten = o.sort( volgorde );
		$scope.oefentoetsen = f.sort( volgorde );

		if($scope.moduleType === $scope.moduleTypes.hoofdstukken) {

			if( $scope.hoofdstukken.length === 0 ) {
				console.log("Geen hoofdstukken");
				return;
			}
			$scope.setHoofdstuk( $scope.hoofdstukken[0] );

		} else if($scope.moduleType === $scope.moduleTypes.opdrachten) {
			
		} else if($scope.moduleType === $scope.moduleTypes.oefentoetsen) {
			
		}


	}, function(response){
		console.log("error getCourseInfo ::", response);
	} );

};

function getStudenten(){

	var p = dataFactory.getStudenten($scope.currentPakket.LicenseID, $scope.currentHoofdstuk.CourseID, $scope.currentHoofdstuk.Id);

	p.then(function(response){
		$scope.studenten = response;
	}, function(response){
		console.log("error getStudenten ::", response);
	});

}

// current data
$scope.hoofdstukken = [];
$scope.currentHoofdstuk = null;
$scope.setHoofdstuk = function(hoofdstuk){

	$scope.currentHoofdstuk = hoofdstuk;
	getStudenten();

};

$scope.opdrachten = [];
$scope.currentOpdracht = null;
$scope.setOpdracht = function(opdracht){
	$scope.currentOpdracht = opdracht;
};

$scope.oefentoetsen = [];
$scope.currentOefentoets = null;
$scope.setOefentoets = function(toets){
	$scope.currentOefentoets = toets;
};

$scope.studenten = [];
$scope.currentStudent = null;
$scope.isCurrentStudent = function(student){
	return student === $scope.currentStudent;
}
$scope.setStudent = function(student){
	$scope.currentStudent = student;

	// laad vragen
	var p = dataFactory.getVragen($scope.currentStudent.LicensedCourseID, $scope.currentHoofdstuk.Id );

	p.then(function(response){
		console.log(response);
		$scope.vragen = response.sort(volgorde);

	}, function(resonse){
		console.log("error getVragen", response);
	});

};

$scope.vragen = [];
$scope.currentVraag = null;
$scope.isCurrentVraag = function(vraag){
	return $scope.currentVraag === vraag;
};
$scope.setVraag = function(vraag){
	$scope.currentVraag = vraag;

	dataFactory.getVraag($scope.currentVraag.Id).then(function(data){
		console.log("vraag", data);
		angular.element( document.querySelector("#resultImage")).attr("src", data.SnapshotThumbnail);
	}, function(response){
		console.log("error", response);
	});
};

// Klassen
$scope.klassen = [];
$scope.currentKlas = null; // id voor alle klassen
$scope.setKlas = function(klas){
	$scope.currentKlas = klas;
};

// soort
$scope.soort = 'module';
$scope.$watch("soort", function(newValue, oldValue){
});

// moduleTypes
$scope.moduleType = $scope.moduleTypes.hoofdstukken;
$scope.$watch("moduleType", function(newValue, oldValue){
	$scope.moduleType = newValue;

});

// moduleTypes
$scope.toetsTypes = 'open';
$scope.$watch("toetsTypes", function(newValue, oldValue){
	// console.log('yeah ' + newValue);
});

$scope.go = function(){

	console.log("pakket", $scope.currentPakket);
	console.log("module", $scope.currentModule);
	console.log("klas  ", $scope.currentKlas);
	console.log("hfds  ", $scope.hoofdstukken);
	console.log("studen", $scope.currentStudent);
	console.log("vraag ", $scope.currentVraag);

};

// program init

$scope.start = function(){ 

	var p = dataFactory.getPakketten();

	p.then(function(data){
		$scope.pakketten = data;
	}, function(){
		console.log('failed');
	});

	// klas
	dataFactory.getKlassen().then(function(data){
		// console.log(data);

		if(data.length > 0) {
			$scope.klassen = data;
			$scope.currentKlas = $scope.klassen[0];
		}

	}, function(){
		console.log("Mother");
	});

};

}]);

})();