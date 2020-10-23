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
    personas = []
    personas = JSON.parse(localStorage.getItem('contactos'))
    lista.innerHTML = ''
    for(item of personas)
    {
        lista.insertAdjacentHTML('beforeend',`
                <div class="container-person">
                <img src="img/daciel.jpg" alt="avatar">
                <div class="container-data">
                    <div>
                        <div>${item.nombre}</div>
                        <div>${item.celular}</div>
                        <div>${item.correo}</div>
                    </div>
                    <img src="img/delete-icon.png" alt="delete">
                </div>
            </div>
        `)
    }
}
listar()