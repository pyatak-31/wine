const img = document.querySelectorAll(".img");//создаем массив всех картинок которые будем увеличивать
//По щелчку на одну из отобраных картинок создаем экземпляр класса и вызываем метод создающий модальное окно
for (let i of img) {
	i.addEventListener('click', () => {
		let newModal = new Modal(i);
		newModal.create();
	});
}

class Modal {
	//описания к картинкам
	data = {
		"1": "Виноградник",
		"2": "Сбор винограда",
		"3": "Варианты гидрозатвора",
		"4": "Переливание вина",
		"5": "Винный погреб"
	}
	
	constructor (el) {
		this.el = el;
	}
	
	create () {
		document.body.classList.toggle('lock');//блокируем пролистывание
		//создаем компоненты модального окна
		const popup = document.createElement("div"),
				popupBody = document.createElement("div"),
				popupContent = document.createElement("div"),
				popupClose = document.createElement("a"),
				popupImageWrapper = document.createElement("div"),
				image = document.createElement("img"),
				text = document.createElement("p");
	
		//Присваиваем компонентам имена заранее написанных классов
		popup.className = "popup close-popup";
		popupBody.className = "popup__body close-popup";
		popupContent.className = "popup__content";
		popupClose.className = "popup__close close-popup";
		popupClose.textContent = "x";//значок закрытия
		popupClose.href = "";
		popupImageWrapper.className = "popup__image-wrapper";
		image.src = this.el.dataset.big;//адрес открываемого в окне изображения
		text.className = "popup__text";
		text.innerHTML = `${this.data[this.el.dataset.big.match(/\d/g).join('')]}`;//используя регулярные выражения отделяем из названия число, и по этому числу берем описание из объекта data

		//создаем вложеннось компонентов
		document.body.append(popup);
		popup.append(popupBody);
		popupBody.append(popupContent);
		popupContent.append(popupClose);
		popupContent.append(popupImageWrapper);
		popupImageWrapper.append(image);
		popupImageWrapper.append(text);
		
		//закрытие окна
		popup.addEventListener("click", (e) => {
			e.preventDefault();
			if (e.target.classList.contains("close-popup")) {
				document.body.classList.toggle('lock');
				popup.remove();
			}   
		});
	}
}

//при клике на заголовок он двигается с изменением прозрачности, после чего возвращается в исходное положение
$(".header__title").click(function(){
    $(this).animate({
		opacity: 0,
		margin: '0 0 0 10px',
	}, 1500 )
		.animate ({
			opacity: 1,
			margin: '0',
		}, 1500, gift)
});

//появление надписи, и исчезновение ее через некоторое время
function gift() {
	$(this).parent().append($('<div class="alert-message">Заначка найдена!</div>'));
	
	setTimeout(function () {
        $('.alert-message').detach();
    }, 1500)
}