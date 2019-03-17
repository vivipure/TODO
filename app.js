// select element
const clear = document.querySelector('.clear')
const dateEle = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('input')
const skin = document.querySelector('.skin')

// classes name
const checked = 'fa-check-circle'
const unchecked = 'fa-circle-thin'
const line_through = 'lineThrough'

// list , id

let img = [
    './assets/bg/bg.jpg',
    './assets/bg/bg.png',
    './assets/bg/bg2.jpg',
    './assets/bg/bg3.jpg'
]
let id,LIST
let log = console.log.bind(console)
//localstorage
let data = localStorage.getItem('todo')
if(data) {
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
}else{
    LIST = []
    id = 0
}



// 日期参数配置
const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
}
const today = new Date()
dateEle.innerHTML = today.toLocaleDateString('zh-CN',options)





//function

function loadList(arr) {
    arr.forEach(function(item){
        addTodo(item.name, item.id, item.done, item.trash)
    })
}


function addTodo(todo, id, done, trash) {
    if(trash) {return}
    //是否选择
    const Done = done ? checked : unchecked
    const Line = done ? line_through : ''
    const item = `<li class='item'>
								<i class="fa ${Done} co" job='complete' id="${id}"></i>
								<p class="text ${Line}">${todo}</p>
								<i class="fa fa-trash-o de" job='delete' id="${id}"></i>
								</li>
	`
    const position = 'beforeend'
    list.insertAdjacentHTML(position ,item)
}
document.addEventListener('keyup', function(e){
    if (e.keyCode == 13) {
        const todo = input.value
        if(todo) {
            addTodo(todo, id, false, false)
            LIST.push({
                name: todo,
                id: id,
                done: false,
                trash: false,
            })
            id++
        }
        localStorage.setItem('todo', JSON.stringify(LIST))
        input.value = ''
    }
})

// complete
function completeTodo(element) {
    element.classList.toggle(checked)
    element.classList.toggle(unchecked)
    element.parentNode.querySelector('.text').classList.toggle(line_through)

    LIST[element.id].done = !LIST[element.id].done
}

//remove
function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true
}

//
list.addEventListener('click',function(e) {
    const element = e.target
    if(element.attributes.job){
        const elementjob = element.attributes.job.value
        if(elementjob == 'complete') {
            completeTodo(element)
        }else if(elementjob == 'delete') {
            removeTodo(element)
        }
    }
    localStorage.setItem('todo', JSON.stringify(LIST))
})

//clear
clear.addEventListener('click', function(){
    localStorage.clear()
    location.reload()
})
skin.addEventListener('click', function(){
    let header = document.querySelector('.header')
    header.style.backgroundImage = "url('"+img[Math.floor(Math.random()*img.length)]+"')"
})
