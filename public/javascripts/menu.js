(function(){
	var load = function(){
		manageMenu();
		cargarMenu();
		cargarBuscador();
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
        var http = new XMLHttpRequest();
        http.open('GET', 'https://ccafeueb-s.herokuapp.com/committees', true);
        http.setRequestHeader('Accept', 'application/json, text/javascript');
        http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        http.onreadystatechange = function () {
            if (http.readyState == 4) {
                if (http.status == 200) {
                	mostrarMenu(JSON.parse(http.responseText).data);
                }
            }
        };
        http.send();
	}

	var mostrarMenu = function(comites){
		var menu = document.querySelector('.menu-ppal');
		var menuF = document.querySelector('nav.menu');
		var item = function(o){
			var div = document.createElement('div');
			div.setAttribute('cod_comite', o.cod_comite);
			var span = document.createElement('span');
			span.innerHTML = o.nombre_comite;
			div.appendChild(span);
			div.onclick = function(){ window.location.href = '/principal?cod=' + o.cod_comite; };
			menu.appendChild(div);
		}
		var itemF = function(o){
			var a = document.createElement('a');
			a.href = '#';
			a.innerHTML = o.nombre_comite;
			menuF.appendChild(a);
		}
		comites.forEach(function(o){ item(o); itemF(o); });
	}

	var cargarBuscador = function(){
		var txt = document.querySelector('.search-container input');
		var focus = function(){
			if (this.parentNode.classList.contains('focus')){
				this.parentNode.classList.remove('focus');
			}
			else{
				this.parentNode.classList.add('focus');
			}
		}
		txt.onblur=focus;
		txt.onfocus=focus;

		var btnBusqueda = document.querySelector('.scd-part');
		btnBusqueda.onclick = function(){
			document.querySelector('.search-container').classList.add('show');
			txt.focus();
			this.style.display='none';
		}

		var btnClose = document.querySelector('aside.search-container aside.close');
		btnClose.onclick = function(){
			document.querySelector('.search-container').classList.remove('show');
			btnBusqueda.style.display='';
		}
	}

	AddEvent(window, 'load', function(){
		load();
	});
})();