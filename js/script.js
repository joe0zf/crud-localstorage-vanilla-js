const nombre = document.getElementById('nombre');
const celular = document.getElementById('celular');
const correo = document.getElementById('correo');
const lista = document.getElementById('lista');

const guardar_btn = document.getElementById('guardar-btn');

let personas = []

guardar_btn.addEventListener('click',()=>{
    let data = {
        nombre:nombre.value,
        celular:celular.value,
        correo:correo.value
    }

    personas.push(data)
    
    guardar()
    listar()
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
                        <img src="img/delete-icon.png" alt="delete" class="delete">
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
    if(event.target.matches('.delete'))
    {
        eliminar(event.target.previousElementSibling.lastElementChild.innerHTML)
    }
})

function eliminar(c)
{
    let indicePersona = personas.findIndex(e=>e.correo == c)
    let r =  personas.splice(indicePersona,1);
    guardar()
    listar();
}