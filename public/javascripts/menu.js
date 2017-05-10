(function(){
	var load = function(){
		manageMenu();
		cargarMenu();
	}

	var manageMenu = function(){
		var btnContainer = document.querySelector('.menu-container');
		var btn = document.querySelector('.btn-menu > button');

		btn.onclick = function(){
			if(btnContainer.classList.contains('show')){
				btnContainer.classList.remove('show');
			}
			else{
				btnContainer.classList.add('show');
			}
		}
	}

	var cargarMenu = function(){
		//https://ccafeueb-s.herokuapp.com/committees
        var http = new XMLHttpRequest();
        http.open('GET', 'https://ccafeueb-s.herokuapp.com/committees', true);
        http.setRequestHeader('Accept', 'application/json, text/javascript');
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                if (http.status == 200) {
                	debugger
                }
            }
        };
        http.send();

        return http;
	}

	window.onload = function(){
		load();
	}
})();