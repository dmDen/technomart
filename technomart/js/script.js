var writeUsBtn = document.querySelector(".write-us-btn");
var writeUsForm = document.querySelector(".write-us-form");
var btnsCloseForm = document.querySelectorAll(".btn-close-form");

writeUsBtn.addEventListener("click", function(event){
	event.preventDefault();	
	writeUsForm.classList.add("modal-show");
});

for (var i = 0; i < btnsCloseForm.length; i++) {
    btnsCloseForm[i].addEventListener("click", function(event) {
        event.preventDefault();
		event.target.parentElement.classList.remove("modal-show");
    });
}