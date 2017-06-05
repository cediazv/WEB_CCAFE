(function(){
	var load = function(){
		manageMenu();
		cargarMenu();
		cargarBuscador();
		breadCrumb();
	}

	var modal = function(show){
		var modalElems = document.querySelectorAll('aside.modal-background,aside.modal-content');
		[].forEach.call(modalElems, function(e){
			if (show){
				e.classList.remove('oculto');
			}
			else{
				e.classList.add('oculto');
			}
		});
	}

	var breadCrumb = function(){
		window['breadCrumb'] = {
			addItem: function(text, url) {
				var bread = document.querySelector('.bread-crumb');

				var item = document.createElement('a');
				item.innerHTML = text;
				item.href = url;

				bread.appendChild(item);
			}
		}
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

		var btnCloseModal = document.querySelector('button.modal-close');
		btnCloseModal.onclick = function(){
			modal(false);
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
			div.style.backgroundImage = 'url(/images/icons/' + o.icono_comite + ')';
			div.setAttribute('cod_comite', o.cod_comite);
			var span = document.createElement('span');
			span.innerHTML = o.nombre_comite;
			div.appendChild(span);
			div.onclick = function(){ 
				if (o.cod_comite > 0){
					window.location.href = o.url_comite ? '/contenido?url=' + encodeURIComponent(o.url_comite) + '&cod=' + o.cod_comite : '/principal?cod=' + o.cod_comite; 
				}
				else{
					o.onclick.call(this);
				}
			};
			menu.appendChild(div);
		}
		var itemF = function(o){
			var a = document.createElement('a');
			if (o.cod_comite > 0){
				a.href = o.url_comite ? '/contenido?url=' + encodeURIComponent(o.url_comite) + '&cod=' + o.cod_comite : '/principal?cod=' + o.cod_comite; 
			}
			else{
				a.href = '#';
				a.onclick = o.onclick;
			}
			a.innerHTML = o.nombre_comite;
			menuF.appendChild(a);
		}
		comites.forEach(function(o){ item(o); itemF(o); });
		var login = {
			icono_comite: 'login.svg',
			cod_comite: -1,
			nombre_comite: 'Ingresar',
			onclick: function(){
				modal(true);
			}			
		};
		item(login);
		itemF(login);
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
			btnClose.classList.add('show');
		}

		var btnClose = document.querySelector('aside.close');
		btnClose.onclick = function(){
			document.querySelector('.search-container').classList.remove('show');
			btnBusqueda.style.display='';
			this.classList.remove('show');
		}
	}

	AddEvent(window, 'load', function(){
		load();
	});
})();