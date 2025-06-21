let siteNameInput = document.getElementById("siteName")
let siteUrlInput = document.getElementById("siteUrl")

let overlayClose = document.getElementById("overlay")

let siteList = []
if(localStorage.getItem("siteContainer") !== null){
    siteList = JSON.parse(localStorage.getItem("siteContainer"))
    display()
}
btnSubmit.addEventListener("click" , function addSite(){
    if(validationName() && validationUrl()){
      let sites = {
        siteName : siteNameInput.value,
        siteUrl : siteUrlInput.value
    }
    siteList.push(sites)
    localStorage.setItem("siteContainer" , JSON.stringify(siteList))

    display()
    clearForm()
    }
    else{
      overlayClose.classList.remove("d-none")
    }
})
function display(){
    let box = ""
    for(let i=0 ; i < siteList.length;i++){
        box += creatTable(i)
    }
    document.getElementById("row").innerHTML = box
}
function creatTable(i){
    return `<tr>
              <td>${i+1}</td>
              <td>${siteList[i].siteName}</td>
              <td>
                <button class="btn-visit rounded-1">
                  <a target= "blank" class="d-flex justify-content-center" href="${siteList[i].siteUrl}">Visit</a>
                </button>
              </td>
              <tD>
                <button onclick ="deleteSite(${i})" class="btn-delete rounded-1">
                  Delete
                </button>
              </tD>
            </tr>`
}
function clearForm(){
    siteNameInput.value = null
    siteUrlInput.value = null
}
function deleteSite(index){
    siteList.splice(index,1)
    localStorage.setItem("siteContainer" , JSON.stringify(siteList))
    display()
}
function validationName(element){
    let regex = /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/;
    let text = siteNameInput.value
    if(regex.test(text)){
      siteNameInput.classList.remove("is-invalid")
      siteNameInput.classList.add("is-valid")
      return true
    }
    else{
      siteNameInput.classList.remove("is-valid")
      siteNameInput.classList.add("is-invalid")
      return false
    }  
  }
function validationUrl(){
    let regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    let text = siteUrlInput.value
    if(regex.test(text)){
      siteUrlInput.classList.remove("is-invalid")
      siteUrlInput.classList.add("is-valid")
      return true
    }
    else{
      siteUrlInput.classList.remove("is-valid")
      siteUrlInput.classList.add("is-invalid")
      return false
    }  
}
function closeCard(){
  overlayClose.classList.add("d-none")
}
