(function(){
	var load = function(){
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

	window.onload = function(){
		load();
	}
})();