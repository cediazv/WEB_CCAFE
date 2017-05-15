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
                	//document.getElementById('fecha').innerHTML = data.f_creacion_comite;

                    document.title = data.nombre_comite + ' - Facultad de Ingeniería - Universidad El Bosque';

                    window['breadCrumb'].addItem(data.nombre_comite, '/principal?cod=' + data.cod_comite);

                    var contenedor = document.getElementById('contenido-inicial');

                    /*****************************BORAR*****************************/
                    var c = [
                        {
                            title:'¿Quiénes somos?',
                            img:'http://www.uelbosque.edu.co/sites/default/files/styles/home_noticia_cuadrada_280x280/public/2017-05/funraising_universidad_el_bosque_0.jpg?itok=UgFyc5IE', 
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                        },
                        {
                            title:'Objetivos',
                            img:'http://www.uelbosque.edu.co/sites/default/files/imagecache/exito_estudiantil_imagen_serv_destacad_home/asesorias-individuales.jpg', 
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                        },
                        {
                            title:'Comuníquese con nosotros',
                            img:'', 
                            text: ''
                        }
                    ];

                    c.forEach(function(e){
                        var section = document.createElement('section');

                        var izq = document.createElement('section');
                        izq.classList.add('izquierda');
                        var img = document.createElement('img');
                        img.src = e.img;
                        img.width = 300;
                        izq.appendChild(img);
                        var p = document.createElement('p');
                        p.innerHTML = e.title;
                        izq.appendChild(p);

                        var der = document.createElement('section');
                        der.classList.add('derecha');

                        var div = document.createElement('div');
                        div.innerHTML = e.text;
                        der.appendChild(div);

                        section.appendChild(izq);
                        section.appendChild(der);

                        contenedor.appendChild(section);
                    });

                    var contenedorMenu = document.getElementById('menu-interno');

                    var menu = [
                        {
                            text: 'Menu1',
                            url: '#'
                        },
                        {
                            text: 'Menu2',
                            url: '#'
                        },
                        {
                            text: 'Menu3',
                            url: '#'
                        },
                        {
                            text: 'Menu4',
                            url: '#'
                        },
                        {
                            text: 'Menu5',
                            url: '#'
                        }
                    ];

                    menu.forEach(function(e){
                        var lnk = document.createElement('div');
                        lnk.innerHTML = e.text;
                        lnk.url = e.url;
                        AddEvent(lnk, 'click', function(){
                            window.lovation.href = this.url;
                        });

                        contenedorMenu.appendChild(lnk);
                    });

                }
            }
        };
        http.send();
	}

	AddEvent(window, 'load', function(){
		load();
	});

})();