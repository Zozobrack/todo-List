async function fetchToDo(){
    const r = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    
    if(r.ok === true){
        const data =  await r.json()
        return data
    }else{
        throw new Error("Erreur serveur")
    }

    throw new Error("le serveur na pas pu etre contacter")
}

function formatElement(element){
    const ul = document.querySelector("ul")
    const li = document.createElement("li")
    const input = document.createElement("input")
    const labelUno = document.createElement("label")
    const labelDos = document.createElement("label")
    const i = document.createElement("i")
    
    li.append(input,labelUno,labelDos)
    labelDos.append(i)
    labelUno.append(element.title)
    
    li.classList.add("todo","list-group-item","d-flex","align-items-center")
    input.classList.add("form-check-input")
    labelUno.classList.add("ms-2","form-check-label")
    labelDos.classList.add("ms-auto","btn","btn-danger","btn-sm")
    i.classList.add("bi-trash")

    input.setAttribute("type","checkbox")
    input.setAttribute("id",`todo-${element.id}`)
    labelUno.setAttribute("for",`todo-${element.id}`)
    li.setAttribute("hidden","")

    formatLabel(labelDos)

    ul.appendChild(li)

}

function ajouter(value){
    const ul = document.querySelector("ul")
    const li = document.createElement("li")
    const input = document.createElement("input")
    const labelUno = document.createElement("label")
    const labelDos = document.createElement("label")
    const i = document.createElement("i")
    
    li.append(input,labelUno,labelDos)
    labelDos.append(i)
    labelUno.append(value)//changer juste ça
    
    li.classList.add("todo","list-group-item","d-flex","align-items-center")
    input.classList.add("form-check-input")
    labelUno.classList.add("ms-2","form-check-label")
    labelDos.classList.add("ms-auto","btn","btn-danger","btn-sm")
    i.classList.add("bi-trash")

    input.setAttribute("type","checkbox")
    input.setAttribute("id",`todo-${ul.childElementCount+1}`)
    labelUno.setAttribute("for",`todo-${ul.childElementCount+1}`)
    li.setAttribute("hidden","")

    formatLabel(labelDos)

    ul.appendChild(li)

}

function formatLabel(l){
    l.addEventListener("click",(e)=>{
        e.currentTarget.parentElement.remove()
    })
}

fetchToDo()
    .then((d)=>{
        d.forEach((element)=>{
            formatElement(element)
        })
    })
        .catch((e)=>{
            console.log(e.message)
        })

document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    let data = f.values()
    
    for(let value of data){
        ajouter(value)
    }

},{
    capture:true
})


const btnAll = document.getElementById("all")
const btnTodo = document.getElementById("todo")
const btnDone = document.getElementById("done")

btnDone.addEventListener("click",(e)=>{
   const checkBox =  document.querySelectorAll(".form-check-input")

   checkBox.forEach((cb)=>{
    cb.parentElement.classList.add("todo","list-group-item","d-flex","align-items-center")
    if(cb.checked===false){
        cb.parentElement.removeAttribute("class")
    }        
   })

})

btnAll.addEventListener("click",(e)=>{
   const checkBox =  document.querySelectorAll(".form-check-input")

   checkBox.forEach((cb)=>{
        cb.parentElement.classList.add("todo","list-group-item","d-flex","align-items-center")
   })

})

btnTodo.addEventListener("click",(e)=>{
   const checkBox =  document.querySelectorAll(".form-check-input")

   checkBox.forEach((cb)=>{
    cb.parentElement.classList.add("todo","list-group-item","d-flex","align-items-center")
    if(cb.checked===true){
        cb.parentElement.removeAttribute("class")
    }        
   })

})
