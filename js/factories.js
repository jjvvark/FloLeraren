(function(){

//temp
var timeout = 500;

var app = angular.module('factories', []);

app.factory('dataFactory', [ '$timeout', '$q', '$http', function($timeout, $q, $http){

	var f = {};

	var apiKey = "77e5ae58-1568-4d09-afb9-c15ca7f1ed5b";
	var instituteID = 3;
	var gebruikerID = 53;

	var pakkettenQ = null;
	var modulesQ = null;
	var klassenQ = null;
	var studentenQ = null;
	var vragenQ = null;
	var vraagQ = null;
	var attemptsQ = null;
	var pvVragenQ = null;
	var pvStudentenQ = null;
	var pvvraagQ = null;
	var pvStudentenOverzichtQ = null;
	var toggleLicenseQ = null;
	
	f.getPakketten = function(){

		var deferred = $q.defer();

		if( pakkettenQ != null ) {
			// Request busy
			deferred.reject("busy");
		} else {

			pakkettenQ = $http.get("http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/Pakketten/?apiKey=" + apiKey + 
			"&instituteID=" + instituteID + "&gebruikerID=" + gebruikerID + "&skip=0&take=20&searchValue=")
			
			pakkettenQ.then(function(response){

				// console.log("pakketten", JSON.parse( response.data ));

				deferred.resolve( JSON.parse( response.data ) );

			}, function(response){

				deferred.reject(response);

			});

			pakkettenQ.finally(function(){
				pakkettenQ = null;
			});

		}

		

		return deferred.promise;

	};

	f.getModules = function(pakket){

		var deferred = $q.defer();

		$http.get("http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/Modules/?apiKey=" + apiKey + "&pakketID=" + pakket.Id + "&take=150&searchValue=").then(
			function(response){
				// console.log("Modules", JSON.parse( response.data ));
				deferred.resolve( JSON.parse( response.data ) );
			}, function(response){
				deferred.reject(response);
			});

		return deferred.promise;

	};

	f.getKlassen = function(licenseID, courseID){

		var deferred = $q.defer();

		if( klassenQ != null ) {
			// busy
			deferred.reject("busy");

		} else {

			klassenQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/TeacherAttributesFiltered/?apiKey=" + apiKey + "&instituteID=" + instituteID + "&gebruikerID=" + gebruikerID + "&licenseID=" + licenseID + "&courseID=" + courseID + "&take=50&searchValue=" )
			klassenQ.then( function(response){
				deferred.resolve( JSON.parse( response.data ) );
			}, function(response){
				deferred.reject(response);
			} );
			klassenQ.finally(function(){
				klassenQ = null;
			});

		}

		return deferred.promise;

	}

	// f.getKlassen = function(){

	// 	// get klassen
	// 	// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/TeacherAttributesFiltered/?apiKey=66bc67b1-a6be-4156-84c8-d9f5961d8fe8&instituteID=3&gebruikerID=53&licenseID=77&courseID=131&take=50&searchValue=
	// 	var result = "[{\"Id\":-1,\"InstituteID\":3,\"Name\":\"Alle klassen\",\"Description\":\"\"},{\"Id\":1,\"InstituteID\":3,\"Name\":\"KlasA\",\"Description\":\"hjvhjvhj\"},{\"Id\":6,\"InstituteID\":3,\"Name\":\"Klas D\",\"Description\":null},{\"Id\":14,\"InstituteID\":3,\"Name\":\"MTL 1B\",\"Description\":null}]"

	// 	var deferred = $q.defer();

	// 	$timeout(function(){

	// 		deferred.resolve( JSON.parse(result) );

	// 	}, timeout);

	// 	return deferred.promise;

	// };

	f.getCourseInfo = function(courseID){

		// voorbeeld voor hoofdstukken
		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseResultsPages/?apiKey=b27fc78c-a208-4513-bd94-04450f5b49c3&courseID=121&pageKindID=2&take=50&searchValue=

		var deferred = $q.defer();

		$http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseResultsPages/?apiKey=" + apiKey + "&courseID=" + courseID + "&pageKindID=-1&take=50&searchValue=" ).then( function(response){
			deferred.resolve(JSON.parse(response.data));
		}, function(response){
			deferred.reject(response);
		} );

		return deferred.promise;

	};

	f.getStudenten = function(licenseID, courseID, klasID, pageID){

		var deferred = $q.defer();

		if(studentenQ != null) {
			deferred.reject("yes");
		} else {

		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/Studenten/?apiKey=f5fb608f-b6d6-4d7e-af95-e68e1d9cf1df&instituteID=3&gebruikerID=53&licenseID=77&courseID=121&attributeID=-1&pageID=2724&skip=0&take=20&searchValue=

			studentenQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/Studenten/?apiKey=" + apiKey + "&instituteID=" + instituteID + "&gebruikerID=" + gebruikerID + "&licenseID=" + licenseID + "&courseID=" + courseID + "&attributeID=" + klasID + "&pageID=" + pageID + "&skip=0&take=20&searchValue=" )
			studentenQ.then(
				function(response){
					deferred.resolve( JSON.parse( response.data ) );
				}, function(response){
					deferred.reject(response);
				}
			);
			studentenQ.finally(function(){
				studentenQ = null;
			});

		}

		return deferred.promise;

	};

	f.getVragen = function(licensedCourseID, pageID, attemptID){

		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseResults/?apiKey=f17bef90-8ce9-4626-8874-fe6b685b712a&licensedCourseID=13704&pageID=2731&attemptID=1&take=50&utcOffset=-120

		var deferred = $q.defer();

		if(vragenQ != null) {
			deferred.reject("busy");
		} else {

			vragenQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseResults/?apiKey=" + apiKey + "&licensedCourseID=" + licensedCourseID + "&pageID=" + pageID + "&attemptID=" + attemptID + "&take=50&utcOffset=-120" )
			
			vragenQ.then(
			function(response){	
				deferred.resolve(JSON.parse(response.data));
			}, function(response){
				deferred.reject(response);
			});

			vragenQ.finally( function(){
				vragenQ = null;
			} );

		}

		return deferred.promise;
  
	};

	f.getVraag = function(id){
		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseAnswersID/?apiKey=366fe51d-9356-4b9e-b43b-4450f97d65d3&resultID=925550

		var deferred = $q.defer();

		if(vraagQ != null) {
			deferred.reject();
		} else {

			vragenQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseAnswersID/?apiKey=" + apiKey + "&resultID=" + id );
			vragenQ.then(function(response){
				deferred.resolve(JSON.parse(response.data));
			}, function(response){
				deferred.reject(response);
			});
			vragenQ.finally(function(){
				vragenQ = null;
			});

		}

		return deferred.promise;
	};

	f.getPVVraag = function(id){
		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseAnswersID/?apiKey=366fe51d-9356-4b9e-b43b-4450f97d65d3&resultID=925550

		var deferred = $q.defer();

		if(pvvraagQ != null) {
			deferred.reject();
		} else {

			pvvraagQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/CourseAnswersID/?apiKey=" + apiKey + "&resultID=" + id );
			pvvraagQ.then(function(response){
				deferred.resolve(JSON.parse(response.data));
			}, function(response){
				deferred.reject(response);
			});
			pvvraagQ.finally(function(){
				pvvraagQ = null;
			});

		}

		return deferred.promise;
	};



	f.getOverzicht = function( licenseID, courseID, pageKind ){

		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/StudentenOverzicht/?apiKey=5befc9e2-b84b-4cef-acf6-f9676b85a6f0&instituteID=3&gebruikerID=53&licenseID=77&courseID=118&attributeID=-1&pageKindID=2&take=50&limit=6

		var deferred = $q.defer();

		$http.get("http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/StudentenOverzicht/?apiKey=" + apiKey + "0&instituteID=" + instituteID + "&gebruikerID=" + gebruikerID + "&licenseID=" + licenseID + "&courseID=" + courseID + "8&attributeID=-1&pageKindID=" + pageKind + "&take=50&limit=6").then(
			function(){
				deferred.resolve(JSON.parse(response.data));
			}, function(response){
				deferred.reject(response);
			});

		return deferred.promise;

	};

	f.getAttempts = function( licensedCourseID, pageID ){

		var deferred = $q.defer();

		if( vragenQ != null ) {
			deferred.reject("busy");
		} else {

			// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/ResultAttempts/?apiKey=54515411-e91b-45af-a0de-e1a7aff40431&licensedCourseID=14645&pageID=2724&take=50&searchValue=

			vragenQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/ResultAttempts/?apiKey=" + apiKey + "&licensedCourseID=" + licensedCourseID + "&pageID=" + pageID + "&take=50&searchValue=" )

			vragenQ.then( function(response){
				deferred.resolve( JSON.parse( response.data ) );
			}, function(response){
				deferred.reject(response);
			} );

			vragenQ.finally(function(){
				vragenQ = null;
			});

		}

		return deferred.promise;

	}

	f.getPVVragen = function(licenseID, courseID, klasID, pageID){

		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/Vragen/?apiKey=54515411-e91b-45af-a0de-e1a7aff40431&instituteID=3&gebruikerID=53&licenseID=77&courseID=121&attributeID=-1&pageID=2724&take=50&searchValue=
	
		var deferred = $q.defer();

		if( pvVragenQ != null ) {
			deferred.reject("busy");
		} else {

			pvVragenQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/Vragen/?apiKey=" + apiKey + "&instituteID=" + instituteID + "&gebruikerID=" + gebruikerID + "&licenseID=" + licenseID + "&courseID=" + courseID + "&attributeID=" + klasID + "&pageID=" + pageID + "&take=50&searchValue=" );

			pvVragenQ.then( function(response){
				deferred.resolve( JSON.parse( response.data ) );
			}, function(response){
				deferred.reject(response);
			} );

			pvVragenQ.finally(function(){
				pvVragenQ = null;
			});

		}

		return deferred.promise;

	};

	f.getPVStudenten = function(licenseID, pageID, objectID, attemptID){

		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/VragenCourseResults/?apiKey=54515411-e91b-45af-a0de-e1a7aff40431&licenseID=77&pageID=2724&objectID=6RdGe76F3Xo.5jurRNo7LYE&attemptID=1&take=50&utcOffset=-120

		var deferred = $q.defer();

		if( pvStudentenQ != null ) {

			deferred.reject("busy");

		} else {

			pvStudentenQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/VragenCourseResults/?apiKey=" + apiKey + "&licenseID=" + licenseID + "&pageID=" + pageID + "&objectID=" + objectID + "&attemptID=" + attemptID + "&take=50&utcOffset=-120" );

			pvStudentenQ.then(  function(response){
				deferred.resolve( JSON.parse(response.data) );
			}, function(response){
				deferred.reject(response);
			} );

			pvStudentenQ.finally( function(){
				pvStudentenQ = null;
			} );

		}

		return deferred.promise;

	};

	f.getStudentOverzicht = function(licenseID, courseID, klasID, pageKindID){

		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/StudentenOverzicht/?apiKey=fb2ac010-efc8-4dfd-951b-5a852e459f7d&instituteID=3&gebruikerID=53&licenseID=77&courseID=121&attributeID=-1&pageKindID=2&take=50&limit=6
		// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/StudentenOverzicht/?apiKey=b648da31-23fe-4da6-998c-70f97072c4aa&instituteID=3&gebruikerID=53&licenseID=77&courseID=181&attributeID=-1&pageKindID=6&take=50&limit=6

		var deferred = $q.defer();

		if( pvStudentenOverzichtQ != null ) {
			deferred.reject("busy");
		} else {
			pvStudentenOverzichtQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/StudentenOverzicht/?apiKey=" + apiKey + "&instituteID=" + instituteID + "&gebruikerID=" + gebruikerID + "&licenseID=" + licenseID + "&courseID=" + courseID + "&attributeID=" + klasID + "&pageKindID=" + pageKindID + "&take=50&limit=6" );
			pvStudentenOverzichtQ.then(function(response){

				var parsedData = JSON.parse( response.data );

				for(var i = 0; i < parsedData.length; i++) {

					parsedData[i].HoofdstukkenLaatstePoging = JSON.parse( parsedData[i].HoofdstukkenLaatstePoging );
					parsedData[i].HoofdstukkenMetResultaten = JSON.parse( parsedData[i].HoofdstukkenMetResultaten );

				}

				deferred.resolve( parsedData );

			}, function(response){
				deferred.reject(response);
			});
			pvStudentenOverzichtQ.finally( function(){
				pvStudentenOverzichtQ = null;
			} );
		}

		return deferred.promise;

	};

	f.toggleLicense = function(licenseID, courseID, pageID, licensedCourseID, itemName){

		var deferred = $q.defer();

		if( toggleLicenseQ != null ) {
			deferred.resolve("busy");
		} else {

			// http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/ToggleLicensedCourseStatusID/?apiKey=5bc0c689-446f-414f-91eb-623189e383b7&instituteID=3&gebruikerID=53&licenseID=119&courseID=183&attributeID=-1&pageID=3047&licensedCourseID=14951&itemName=TeacherAllowsAccess
			toggleLicenseQ = $http.get( "http://roverssoftware.nl/ReportService/Reports.svc/Dashboard/ToggleLicensedCourseStatusID/?apiKey=" + apiKey + "&instituteID=" + instituteID + "&gebruikerID=" + gebruikerID + "&licenseID=" + licenseID + "&courseID=" + courseID + "&attributeID=-1&pageID=" + pageID + "&licensedCourseID=" + licensedCourseID + "&itemName=" + itemName );

			toggleLicenseQ.then( function(response){
				console.log("response", response);
				deferred.resolve( JSON.parse(response.data) );
			}, function(response){
				deferred.reject(response);
			} );

			toggleLicenseQ.finally( function(){
				toggleLicenseQ = null;
			} );

		}

		return deferred.promise;

	};

	return f;

}]);

})();






