var btnsCloseForm = document.querySelectorAll(".btn-close-form");
var btnsBuy = document.querySelectorAll(".catalog-item__buy");
var cartForm = document.querySelector(".cart-form");
var btnsCancel = document.querySelectorAll(".cancel-btn");
var modalForms = document.querySelectorAll(".modal-form");

var writeUsBtn = document.querySelector(".write-us-btn");

if (writeUsBtn) {
	var writeUsForm = document.querySelector(".write-us-form");
	var sendForm = writeUsForm.querySelector("form");
	var yourNameInput = sendForm.querySelector("#your-name");
	var yourEmailInput = sendForm.querySelector("#your-email");
	var emailTextInput = sendForm.querySelector("#e-mail-text");
	var mapA = document.querySelector(".map>a");
	var mapForm = document.querySelector(".map-form");
}


//Открытие модальной формы
function OpenForm(form) {
	if (!form.classList.contains("modal-show")) {
		form.classList.remove("modal-hide");
		form.classList.add("modal-show");
	}	
}

//Закрытие модальной формы
function CloseForm(form) {
	if (form.classList.contains("write-us-send-error"))
		form.classList.remove("write-us-send-error");
	if (form.classList.contains("modal-show")) {				
		form.classList.remove("modal-show");
		form.classList.add("modal-hide");		
	}	
}


//Открыть Напишите нам
if (writeUsForm) {
	writeUsBtn.addEventListener("click", function(event) {
		event.preventDefault();
		OpenForm(writeUsForm);
		var inputYourName = writeUsForm.querySelector(".your-name");
		inputYourName.focus();
	});
}

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
		OpenForm(cartForm);
    });
}

//Закрываем формы по Esc
window.addEventListener("keydown", function (event) {
	if (event.keyCode == 27) {
		for (var i = 0; i < modalForms.length; i++)
			CloseForm(modalForms[i]);
	}
});

//Проверяем заполенность полей перед отправкой
if (writeUsForm) {
	sendForm.addEventListener("submit", function(event) {
		if (!(yourNameInput.value && yourEmailInput.value && emailTextInput.value))
		{
			event.preventDefault();
			sendForm.classList.add("write-us-send-error");
		}
	});
}

//Открываем карту
if (mapA) {
	mapA.addEventListener("click", function(event) {
		event.preventDefault();
		OpenForm(mapForm);
	});
}

//Оживляем фильтр цены
var filterArea = document.querySelector(".filter-range-controls");
if (filterArea) {	
	var bar = filterArea.querySelector(".bar");
	var inputMinPrice = document.querySelector("input.min-price");
	var inputMaxPrice = document.querySelector("input.max-price");
	var toggleMin = filterArea.querySelector(".toggle-min");
	var toggleMax = filterArea.querySelector(".toggle-max");
	var flagMin = false;
	var flagMax = false;
	var minLeft = 10;
	var maxLeft = 190;
	var allWidth = maxLeft - minLeft;
	var currentMinPos = parseInt(toggleMin.style.left);
	var currentMaxPos = parseInt(toggleMax.style.left);
	var priceRange = 100000;
	
	//Выставление цены в интпуты. По значения ползунка
	function SetPriceValueToInput(inputElement, toggleValue) {
		var minPriceValue = Math.round(priceRange * (toggleValue-minLeft) / allWidth);
		inputElement.value = minPriceValue;
		inputElement.setAttribute("value", minPriceValue);				
	}
	
	SetPriceValueToInput(inputMinPrice, currentMinPos);
	SetPriceValueToInput(inputMaxPrice, currentMaxPos);
	
	//Выставление цены в ползунок. По значениям инпутов
	function SetPriceValueToRange(event) {
		var minValue = parseInt(inputMinPrice.value);
		var maxValue = parseInt(inputMaxPrice.value);
		minValue = Math.max(minValue, 0);
		minValue = Math.min(minValue, priceRange);
		maxValue = Math.max(maxValue, 0);
		maxValue = Math.min(maxValue, priceRange);
		if (minValue > maxValue) {
			if (event.target == inputMinPrice)
				minValue = maxValue;
			else
				maxValue = minValue;			
		}
		toggleMin.style.left = Math.round(allWidth * minValue / priceRange + minLeft) + "px";
		toggleMax.style.left = Math.round(allWidth * maxValue / priceRange + minLeft) + "px";
		bar.style.marginLeft = Math.round(minValue / priceRange * 100) + "%";
		bar.style.width = Math.round((maxValue - minValue) / priceRange * 100) + "%";
	}
	
	inputMinPrice.addEventListener("change", SetPriceValueToRange);	
	inputMaxPrice.addEventListener("change", SetPriceValueToRange);	
	
	toggleMin.addEventListener("mousedown", function(event) {
	  event.preventDefault();
	  flagMin = true;
	});
	
	toggleMax.addEventListener("mousedown", function(event) {
	  event.preventDefault();
	  flagMax = true;
	});	
	
	document.addEventListener("mouseup", function(event) {
  		flagMin = false;
		flagMax = false;
	});
	
	filterArea.addEventListener("mousemove", function (event) {
		var res = event.pageX - this.offsetLeft;
		if (flagMin) {
			if (res >= minLeft && res <= maxLeft && res <= currentMaxPos){
				toggleMin.style.left = res + "px";
				currentMinPos = res;
				var left = (res - minLeft) * 100 / allWidth;
				bar.style.marginLeft = left + "%";
				SetPriceValueToInput(inputMinPrice, res);
				var width = (currentMaxPos - currentMinPos) * 100 / allWidth;
				bar.style.width = Math.round(width) + "%";
			}
		}
		if (flagMax) {
			if (res >= minLeft && res <= maxLeft && res >= currentMinPos){
				toggleMax.style.left = res + "px";
				currentMaxPos = res;
				var width = (currentMaxPos - currentMinPos) * 100 / allWidth;
				bar.style.width = Math.round(width) + "%";
				SetPriceValueToInput(inputMaxPrice, res);
			}
		}		
	});
}