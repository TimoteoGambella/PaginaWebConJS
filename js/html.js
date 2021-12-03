var numeroDeBurger = 0
var pedidoActual = []
var numerodePedido=0
var numBurger=0
var variableDivAbierto="no"

function agregarCarrito(burger,tipo,precio){
    if(variableDivAbierto=="si"){
        return
    }
    mostrarCarrito()
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let p1 = document.createElement("p")
    let p2 = document.createElement("p")
    let pExtra = document.createElement("p")
    let pX = document.createElement("p")

    p1.textContent=burger + " " + tipo
    p2.textContent=precio
    pExtra.textContent="+"
    pX.textContent="X"
    
    p1.className="nombreBurger"
    p1.id="nombreBurger"
    div2.className="nombreTipoBurger"
    p2.className="precioBurger"
    pX.className="signoPedidoCancelar"
    pX.onclick= function cancelarBurger(valor){
        _cancelarBurger(this)
    }
    pExtra.className="extrasBurger"
    pExtra.onclick= function a_ExtraDescripcion(valor){
        extraDescripcion(this)
    }
    div1.className="numeroDeBurger"+numeroDeBurger
    div1.id=numBurger
    numeroDeBurger=numeroDeBurger+1

    div2.appendChild(pX)
    div2.appendChild(p1)
    div1.appendChild(div2)
    div1.appendChild(pExtra)
    div1.appendChild(p2)
    document.querySelector(".fil-1 li").appendChild(div1)
    
    let precioFinal = document.getElementById("_fin")
    if (precioFinal.innerHTML === "---"){
        precioFinal = precio
        document.getElementById("_fin").innerHTML=precio
    }else{
        document.getElementById("_fin").innerHTML = parseInt(precioFinal.innerHTML) + precio
        
    }
    pedidoActual.push(new Burgers(burger+" "+tipo,precio,"-","-"))
    numBurger=numBurger+1
}

function mostrarCarrito(){
    let divCarrito = document.getElementById("carritoDePedidos")
    divCarrito.classList.add("d-inline")
    let menuDerecha = document.getElementsByName('menuDerecha');
    for(let i = 0; i < menuDerecha.length; i++){
        menuDerecha[i].classList.remove("justify-self-end")
        menuDerecha[i].classList.remove("align-self-end")
        menuDerecha[i].classList.add("justify-self-start")
        menuDerecha[i].classList.add("align-self-start")
        menuDerecha[i].classList.remove("menuD")
        menuDerecha[i].classList.add("menuI")
    }
    let botonCarrito = document.getElementById("botonAbrir")
    botonCarrito.classList.remove("d-inline")
    botonCarrito.classList.add("d-none")
}

function ocultarCarrito(){
    let divCarrito = document.getElementById("carritoDePedidos")
    divCarrito.classList.remove("d-inline")
    divCarrito.classList.add("d-none")
    let menuDerecha = document.getElementsByName('menuDerecha');
    for(let i = 0; i < menuDerecha.length; i++){
        menuDerecha[i].classList.remove("justify-self-start")
        menuDerecha[i].classList.remove("align-self-start")
        menuDerecha[i].classList.add("justify-self-end")
        menuDerecha[i].classList.add("align-self-end")
        menuDerecha[i].classList.remove("menuI")
        menuDerecha[i].classList.add("menuD")
    }
    let botonCarrito = document.getElementById("botonAbrir")
    botonCarrito.classList.remove("d-none")
    botonCarrito.classList.add("d-inline")
}

function extraDescripcion(valor){
    variableDivAbierto="si"
    let pantallaNueva = document.getElementById("extraDesc")
    pantallaNueva.classList.remove("d-none")
    pantallaNueva.classList.add("extraDesc")
    let burger = valor.previousSibling
    let nombreBurger = burger.lastElementChild

    botonConfirmarPedido.onclick=function none2(){}
    let etiquetaNombre = document.getElementById("etiquetaNombreBurger")
    etiquetaNombre.innerHTML=nombreBurger.innerHTML
}

function cerrarExtraDesc(){
    let pantallaNueva = document.getElementById("extraDesc")
    pantallaNueva.classList.remove("extraDesc")
    pantallaNueva.classList.add("d-none")

    botonConfirmarPedido.onclick=function _confirm(){
        datos()
    }
    variableDivAbierto="no"
}

function _cancelarBurger(valor){
    let padre = valor.parentNode
    let padre2=padre.parentNode

    let precio=padre2.lastElementChild
    let precioFinal = document.getElementById("_fin")
    document.getElementById("_fin").innerHTML = parseInt(precioFinal.innerHTML) - parseInt(precio.innerHTML) 

    let claseNumeroDeBurger = padre2.id

    let numeroAEliminar=0
    for(producto of pedidoActual){
        let variableNumero = producto.numBurger
        if(claseNumeroDeBurger==variableNumero){
            pedidoActual.splice(numeroAEliminar,1)
        }
        numeroAEliminar=numeroAEliminar+1
    }
    padre2.remove()
}

function verCheckBox(valor){
    if(valor.value=="third_checkbox"){
        if(document.getElementById("cbox1").checked || document.getElementById("cbox2").checked){
            document.getElementById("cbox1").checked=false
            document.getElementById("cbox2").checked=false
        }
    }else{
        document.getElementById("cbox3").checked=false
    }
}

function confirmarPedido(nombre,direccion,pago){
    if(pedidoActual==""){
        return
    }else{
        let pedido = new Pedido(nombre.value,direccion.value,pago,pedidoActual)

        let localStoragePedido = localStorage.length
        numerodePedido=parseInt(localStoragePedido)
        let nombreDelPedido="Pedido"+numerodePedido
        localStorage.setItem(nombreDelPedido,JSON.stringify(pedido))
    
        numerodePedido=numerodePedido+1
        pedidoActual=[]
    
        let liPedidos = document.querySelector(".fil-1 li")
        while(liPedidos.firstChild){
            liPedidos.removeChild(liPedidos.firstChild)
        }
        document.getElementById("_fin").innerHTML="---"
    }
    document.getElementById("datoNombre").value=""
    document.getElementById("datoDireccion").value=""
    document.getElementById("efectivo").checked=true
    document.getElementById("pedidoConfirmar").style.display="none"
    numBurger=0
    variableDivAbierto="no"
}

function datos(){
    variableDivAbierto="si"
    document.getElementById("pedidoConfirmar").style.display="inline"
    document.getElementById("datoPrecio").innerHTML="TOTAL: "+(document.getElementById("_fin")).innerHTML
}

function cerrarDatos(){
    variableDivAbierto="no"
    document.getElementById("pedidoConfirmar").style.display="none"
}

function confirmarDatos(){
    let nombre = document.getElementById("datoNombre")
    let direccion = document.getElementById("datoDireccion")
    if(nombre.value==""){
        alert("Debe ingresar su nombre")
    }else if(direccion.value==""){
        alert("Debe ingresar su direccion")
    }else{
        let formaDePago = document.getElementById("efectivo").checked
        let pago = "EFECTIVO"
        if (!formaDePago){
            formaDePago=document.getElementById("transferencia").checked
            pago="TRANSFERENCIA"
            if(!formaDePago){
                formaDePago=document.getElementById("mp").checked
                pago="MERCADOPAGO"
            }
        }
        confirmarPedido(nombre,direccion,pago)   
    }
}
