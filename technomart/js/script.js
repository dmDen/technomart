var writeUsBtn = document.querySelector(".write-us-btn");
var writeUsForm = document.querySelector(".write-us-form");
var sendForm = writeUsForm.querySelector("form");
var yourNameInput = sendForm.querySelector("#your-name");
var yourEmailInput = sendForm.querySelector("#your-email");
var emailTextInput = sendForm.querySelector("#e-mail-text");

var btnsCloseForm = document.querySelectorAll(".btn-close-form");
var btnsBuy = document.querySelectorAll(".catalog-item-actions>.buy");
var cartForm = document.querySelector(".cart-form");
var btnsCancel = document.querySelectorAll(".cancel-btn");

//Закрытие модальной формы
function CloseForm(form) {
	if (form.classList.contains("write-us-send-error"))
		form.classList.remove("write-us-send-error");
	if (form.classList.contains("modal-show")) {		
		//form.classList.add("modal-close");
		form.classList.remove("modal-show");
	}
	
}

//Открыть Напишите нам
writeUsBtn.addEventListener("click", function(event) {
	event.preventDefault();	
	writeUsForm.classList.add("modal-show");
	var inputYourName = writeUsForm.querySelector(".your-name");
	inputYourName.focus();
});

//Клик по закр. крестику на любой форме
for (var i = 0; i < btnsCloseForm.length; i++) {
    btnsCloseForm[i].addEventListener("click", function(event) {
        event.preventDefault();
		CloseForm(event.target.parentElement);	
    });
}

//Клик по кнопке отмена на любой форме
for (var i = 0; i < btnsCancel.length; i++) {
    btnsCancel[i].addEventListener("click", function(event) {
        event.preventDefault();
		CloseForm(event.target.parentElement.parentElement);
		CloseForm(event.target.parentElement.parentElement.parentElement);
    });
}

//Открыть форму Товар добавлен
for (var i = 0; i < btnsBuy.length; i++) {
    btnsBuy[i].addEventListener("click", function(event) {
        event.preventDefault();
		cartForm.classList.add("modal-show");
    });
}

//Закрываем формы по Esc
window.addEventListener("keydown", function (event) {
	if (event.keyCode == 27) {
		if (writeUsForm.classList.contains("modal-show"))
			writeUsForm.classList.remove("modal-show");
		if (cartForm.classList.contains("modal-show"))
			cartForm.classList.remove("modal-show");
	}
});

//Проверяем заполенность полей перед отправкой
sendForm.addEventListener("submit", function(event) {
	if (!(yourNameInput.value && yourEmailInput.value && emailTextInput.value))
	{
		event.preventDefault();
		writeUsForm.classList.add("write-us-send-error");
	}
});