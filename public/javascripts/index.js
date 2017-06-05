(function(){
	var load = function(){
		cargarSquares();
	}

	var cargarSquares = function(){
		var mostrarSquares = function(committees){
			var container = document.getElementById('squares');
			committees.forEach(function(committee){
				var div = document.createElement('div');
				//div.style.backgroundImage = 'url(/images/banners/' + committee.banner_comite + ')';
				var divText = document.createElement('div');
				divText.innerHTML = 'Temas de interés de ' + committee.nombre_comite;
				div.appendChild(divText);

				container.appendChild(div);
			});
		}

		var http = new XMLHttpRequest();
        http.open('GET', 'https://ccafeueb-s.herokuapp.com/committees', true);
        http.setRequestHeader('Accept', 'application/json, text/javascript');
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                if (http.status == 200) {
                	mostrarSquares(JSON.parse(http.responseText).data);
                }
            }
        };
        http.send();
	}

	AddEvent(window, 'load', function(){
		load();
	});
})();