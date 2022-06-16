function log(message) {
    console.log('>'+message)
}
/* APP*/
const cards=document.querySelectorAll('.card');
const dropzones=document.querySelectorAll('.dropzone');

// OUT CARD => PEGA
cards.forEach(card => {
    card.addEventListener("dragstart", dragstart)
    card.addEventListener("drag", drag)
    card.addEventListener("dragend",dragend)
})

function dragstart(event){
    // log('star CARD');
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'));
    event.target.classList.add('is-dragging');

}
function drag(){
    // log('DRAGGIN CARD');
    
}
function dragend(){
    // log('Stop CARD');
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));
    this.classList.remove('is-dragging')
}

// LOCAL AONDE SOLTA OS CARTÔES
dropzones.forEach(dropzone => {
    dropzone.addEventListener("dragenter", dragenter)
    dropzone.addEventListener("dragover", dragover)
    dropzone.addEventListener("dragleave", dragleave)
    dropzone.addEventListener("drop", drop)

})
function dragenter(){
    // log('DROP ZONE ENTER');

    
}
function dragover(){
    // log('DROP ZONE OVER');
    this.classList.add('over');
    const cardBeingDragged = document.querySelector('.is-dragging');

     this.appendChild(cardBeingDragged);

}
function dragleave(){
    // log('DROP ZONE LEAVE');
    this.classList.remove('over');


}
function drop(){
    // log('DROP ZONE DROPER');
    this.classList.remove('over');


}
/*open modaql code */
const modal = document.querySelector('.modal-container');
function openmodal(){
    modal.classList.add('active');
}
function exit(){
    modal.classList.remove('active');
}

/* POPULAR E ADD TAREFA */

let bdTarefas = [
    {
        'texto':'Do video!','color':'green'
    },
    {
        'texto':'Do video 2!','color':'red'
    }
]
/*-- <div class="card" draggable="true">
<div class="status green" ></div>
<div class="content">Do video!</div>
</div> -*/
const criarCard = (texto,color,indice)=>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable='true';
    card.innerHTML = `
        <div class="status ${color}" ></div>
        <div class="content">${texto}</div>
        <label value="X" class="delet" id="delet" data-index = ${indice}>X</label>

        
    `
    document.getElementById('todo').appendChild(card);
}
const limparTela = ()=>{
    const todo = document.getElementById('todo');
    while(todo.firstChild){
        todo.removeChild(todo.lastChild);
    }
}
const renderTela = () =>{
    limparTela();
    bdTarefas.forEach((item,indice) => criarCard(item.texto,item.color,indice));
}
function addNewTask(){
    const textInput = document.getElementById('newItem');
    const values = textInput.value;
    bdTarefas.push({'texto':values,'color':'green'});
    renderTela();
    textInput.value='';
    exit();


}
const addItem = (evento)=>{
    const tecla = evento.key;
    const textos=evento.target.value;
    if (tecla === 'Enter') {
        bdTarefas.push({'texto':textos,'color':'green'});
        renderTela();
        evento.target.value='';

    } 
}
const clickBtn = (evento) =>{
    const elemento = evento.target;
    const index = elemento.dataset.index;
    console.log(index);
    removerItem(index)
}


document.getElementById('newItem').addEventListener('keypress',addItem);
// document.getElementById('delet').l  ('click',clickBtn);




renderTela();
