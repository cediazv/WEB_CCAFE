(function(){

	var load = function(){
		var codigo = QueryString['cod'];

		var http = new XMLHttpRequest();
        http.open('GET', 'https://ccafeueb-s.herokuapp.com/committees/' + codigo, true);
        http.setRequestHeader('Accept', 'application/json, text/javascript');
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                if (http.status == 200) {
                	var data = JSON.parse(http.responseText).data;
                	document.getElementById('img').src = '/images/banners/' + data.banner_comite;
                	document.getElementById('nombre').innerHTML = data.nombre_comite;
                	document.getElementById('fecha').innerHTML = data.f_creacion_comite;
                }
            }
        };
        http.send();
	}

	AddEvent(window, 'load', function(){
		load();
	});

})();