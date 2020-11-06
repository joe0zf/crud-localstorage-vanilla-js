const nombre = document.getElementById('nombre');
const celular = document.getElementById('celular');
const correo = document.getElementById('correo');
const lista = document.getElementById('lista');

const guardar_btn = document.getElementById('guardar-btn');

let personas = []

guardar_btn.addEventListener('click',()=>{
    if(nombre.value!=""&&celular.value!=""&&correo.value!="")
    {
        let data = {
            nombre:nombre.value,
            celular:celular.value,
            correo:correo.value
        }
    
        personas.push(data)
        
        guardar()
        listar()
    }
    else{
        alert("complete todos los campos")
    }
    
})

function guardar(){
    localStorage.setItem('contactos',JSON.stringify(personas))
    nombre.value = ''
    celular.value = ''
    correo.value = ''
}

function  listar(){
    try{
        
        if(!!JSON.parse(localStorage.getItem('contactos')))
        {
            personas = JSON.parse(localStorage.getItem('contactos'))
        }
        else{
            personas = []
        }
        
        personas.sort(function (a,b){
            if(a.nombre > b.nombre)
            {
                return 1;
            }
            else if(a.nombre < b.nombre)
            {
                return -1;
            }
            else{
                return 0;
            }
        });
        lista.innerHTML = ''
        for(item of personas)
        {
            lista.insertAdjacentHTML('beforeend',`
                    <div class="container-person">
                    <img src="img/avatar.png" alt="avatar">
                    <div class="container-data">
                        <div class="datos">
                            <div>${item.nombre}</div>
                            <div>${item.celular}</div>
                            <div>${item.correo}</div>
                        </div>
                        <div>
                            <span class="mdi mdi-pencil" id="openModal"></span>
                            <span class="mdi mdi-delete" id="delete"></span>
                        </div>
                    </div>
                </div>
            `)
        }
    }
    catch(e){
        console.log(e)
    }
    
}
listar()

/*Eliminar elemento */

lista.addEventListener('click',(event)=>{
    if(event.target.matches('#delete'))
    {
        //console.log(event.target.parentNode.previousElementSibling.lastElementChild.innerHTML)
        eliminar(event.target.parentNode.previousElementSibling.lastElementChild.innerHTML)
    }
    else if(event.target.matches('#openModal'))
    {
        editar(event.target.parentNode.previousElementSibling.lastElementChild.innerHTML)
    }
})

function eliminar(c)
{
    let indicePersona = personas.findIndex(e=>e.correo == c)
    let r =  personas.splice(indicePersona,1);
    guardar()
    listar();
}

function editar(c)
{
    let persona = personas.find(e=>e.correo==c)
    let modal = document.getElementById('editForm');
    let close_modal = document.getElementById('close-dialog')
    modal.showModal();

    let nom_edit = document.getElementById('nombre-edit');
    let cel_edit = document.getElementById('celular-edit');
    let correo_edit = document.getElementById('correo-edit');

    nom_edit.value = persona.nombre;
    cel_edit.value = persona.celular;
    correo_edit.value = persona.correo;

    close_modal.addEventListener('click',()=>{
            modal.close();
        })

    let guardar_edit = document.getElementById('guardar-edit-btn')

    guardar_edit.addEventListener('click',()=>{
        persona.nombre = nom_edit.value
        persona.celular = cel_edit.value

        guardar();
        listar();
        modal.close();
    })
}






