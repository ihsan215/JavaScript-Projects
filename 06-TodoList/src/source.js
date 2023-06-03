///////////////////////////////
// Parameter Definition

// Dom Parameter
let TextInputArea = document.querySelector("#List-Input");
let AddBtn = document.querySelector("#List-btn");
let TodoList = document.querySelector("#TodoList");
const AlertDom = document.querySelector("#alert");



// Parameter Definition
///////////////////////////////



///////////////////////////////
// Functions Definition


// Add Item to the list
function AddItem(text){

    // Create List Element
    let liDom = document.createElement('li');
    liDom.classList.add("list-group-item", "list-items", "text-white");
    liDom.innerHTML = `  ${ text } ` ;

    // Create chexbox in the list Item
    var chcxBx = document.createElement("input");
    chcxBx.setAttribute("type", "checkbox");
    chcxBx.classList.add("form-check-input" , "checkBox-item");

    // Append
    liDom.appendChild(chcxBx); 

    TodoList.append(liDom);
    TextInputArea.value = "";

    // Add event
    chcxBx.addEventListener("change", function(){
        
        this.parentElement.classList.add("list-item-sim");
        setTimeout(() => {
            this.parentElement.remove();
        }, 500);
     
    
    });
    
}

// Alert Messages
function setAlertMsg(title, msg, type = "warning"){

    AlertDom.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${title}</strong>${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}


// Events Functions
AddBtn.addEventListener("click",()=>{

    if(TextInputArea.value){
        AddItem(TextInputArea.value);
        setAlertMsg("To Do List  " , "  Item was added the list", "success");
    }
    else{
        setAlertMsg("To Do List  " , "  You tried to submit without writing anything.");
    }
})



// Functions Definition
///////////////////////////////
