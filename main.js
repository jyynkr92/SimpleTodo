"use strict"

var doubleCheck = true;
var todoId = 0;

function getTodoList(mode, content, colorType, oldId) {
    var target = "";

    if (mode === "todo") {
        target = document.getElementById("todoList");
    } else {
        target = document.getElementById("doneList");
    }

    var trElement = document.createElement("tr");
    var thElement = document.createElement("th");
    var tdElement = document.createElement("td");
    var spanElement = document.createElement("span");

    spanElement.className = "circle";
    spanElement.style.backgroundColor = colorType;
    thElement.appendChild(spanElement);
    tdElement.textContent = content;

    if (mode === "todo") {
        trElement.id = "todo" + todoId;
        //function todoDone is only worked in todoList
        spanElement.addEventListener("click", todoDone);
        todoId++;
    } else{
        trElement.id = oldId;
    }

    trElement.appendChild(thElement);
    trElement.appendChild(tdElement);

    target.appendChild(trElement);
}

function setEvent() {
    document.getElementById("addBtn").addEventListener("click", addTodo);
    document.getElementById("colorType").addEventListener("click", openColorList);

    var colorList = document.getElementById("colorList").getElementsByClassName("circle");

    HTMLCollection.prototype.forEach = Array.prototype.forEach;

    colorList.forEach(function(item, index) {
        item.addEventListener("click", changeColor);
    });
}

function addTodo() {
    var content = document.getElementById("todoContent").value;
    content = content.trim();

    if (content == null || content === "") {
        alert("you did'nt write what you should do.");
        return;
    }
    var colorId = document.getElementById("colorType");
    var colorStyle = window.getComputedStyle(colorId);
    var colorType = colorStyle.backgroundColor;

    var data = {
        content : content,
        colorType : colorType
    }

    getTodoList("todo", content, colorType);
    
    document.getElementById("todoContent").value = "";
}

function setKeyEvent() {
    // Get the input field
    var input = document.getElementById("todoContent");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keypress", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            addTodo();
        }
    }, false);     
}

function openColorList() {
    var colorDisplay = document.getElementById("colorList").style.display;

    if (colorDisplay == "inline-block") {
        document.getElementById("colorList").style.display = "none";
    } else {
        document.getElementById("colorList").style.display = "inline-block";
    }
}

function changeColor() {
    var className = this.className;

    className = className.substring(7);

    document.getElementById("colorType").className = "color_type " + className;

    openColorList();
}

function todoDone() {
    var todoId = this.parentElement.parentElement.id;
    var todoElem = document.getElementById(todoId);
    var content = todoElem.querySelector("td").innerText;
    var colorType = window.getComputedStyle(this);
    colorType = colorType.backgroundColor;

    todoElem.parentElement.removeChild(todoElem);
    getTodoList("done", content, colorType, todoId);
}