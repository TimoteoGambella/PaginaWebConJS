// Variables a usar dentro del codigo
var numeroDeBurger = 0;
var pedidoActual = [];
var numerodePedido=0;
var numBurger=0;
var variableDivAbierto="no";
var burgerParaExtra = "";
var  variableBorrado = 0;


$("div div #precios li").mouseenter(function(){
    $(this).css("color","white")
})
$("div div #precios li").mouseleave(function(){
    $(this).css("color","#E3B237")
})

$(".menuD").mouseenter(function(){
    $(this).css("border","8px solid white")
})
$(".menuD").mouseleave(function(){
    $(this).css("border","10px solid #FFB908")
})

$(".menuI").mouseenter(function(){
    $(this).css("border","8px solid white")
})
$(".menuI").mouseleave(function(){
    $(this).css("border","10px solid #FFB908")
})



// Funcion para agregar productos al pedido
function agregarCarrito(burger,tipo,precio){

    // Chequeo si la variable marca si o no
    if(variableDivAbierto=="si"){
        return;
    }
    // Mostrar el div del carrito
    mostrarCarrito();

    // Creo elementos y le añado sus estilos y funciones
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let pExtra = document.createElement("p");
    let pX = document.createElement("p");

    p1.textContent=burger + " " + tipo;
    p2.textContent=precio;
    pExtra.textContent="+";
    pX.textContent="X";

    p1.className="nombreBurger";
    p1.id="nombreBurger";
    div2.className="nombreTipoBurger";
    p2.className="precioBurger";
    pX.className="signoPedidoCancelar";
    pX.onclick= function cancelarBurger(valor){
        _cancelarBurger(this);
    }
    pExtra.className="extrasBurger";
    pExtra.onclick= function a_ExtraDescripcion(valor){
        extraDescripcion(this);
    }
    div1.className="numeroDeBurger"+numeroDeBurger;
    div1.id=numBurger;
    numeroDeBurger=numeroDeBurger+1;

    // Armo la relacion entre los elementos
    div2.appendChild(pX);
    div2.appendChild(p1);
    div1.appendChild(div2);
    div1.appendChild(pExtra);
    div1.appendChild(p2);
    document.querySelector(".fil-1 li").appendChild(div1);
    // Cambio el valor total
    let precioFinal = document.getElementById("_fin");
    if (precioFinal.innerHTML === "---"){
        precioFinal = precio;
        document.getElementById("_fin").innerHTML=precio;
    }else{
        document.getElementById("_fin").innerHTML = parseInt(precioFinal.innerHTML) + precio;
        
    }
    //Creo la clase con los datos del producto y lo pusheo al pedidoActual 
    pedidoActual.push(new Burgers(burger+" "+tipo,precio,"-","-"));
    numBurger=numBurger+1;
}

// Funcion para mostrar el div del carrito
function mostrarCarrito(){

    // Saco el boton del carrito y muestro el carrito
    $("#botonCarrito").fadeOut(0700)
    $("#carritoDePedidos").fadeIn(0700)

    let menuDerecha = document.getElementsByName('menuDerecha');
    // Reorganizo la pagina
    for(let i = 0; i < menuDerecha.length; i++){
        menuDerecha[i].classList.remove("justify-self-end");
        menuDerecha[i].classList.remove("align-self-end");
        menuDerecha[i].classList.add("justify-self-start");
        menuDerecha[i].classList.add("align-self-start");
        menuDerecha[i].classList.remove("menuD");
        menuDerecha[i].classList.add("menuI");
    }
}

// Funcion para cerrar el carrito
function ocultarCarrito(){
    // Muestro el boton del carrito y saco el carrito
    $("#botonCarrito").fadeIn(0700)
    $("#carritoDePedidos").fadeOut(0700)

    let menuDerecha = document.getElementsByName('menuDerecha');
    // Reorganizo la pagina
    for(let i = 0; i < menuDerecha.length; i++){
        menuDerecha[i].classList.remove("justify-self-start");
        menuDerecha[i].classList.remove("align-self-start");
        menuDerecha[i].classList.add("justify-self-end");
        menuDerecha[i].classList.add("align-self-end");
        menuDerecha[i].classList.remove("menuI");
        menuDerecha[i].classList.add("menuD");
    }
}

// Funcion para agregar Extras o Aclaraciones
function extraDescripcion(valor){

    // Cambio el valor de la variable y muestro el div de extras
    variableDivAbierto="si";

    $(".extraDesc").fadeIn(0700)

    // Busco los valores del producto para insertarlos en el nuevo div y le saco la funcion al boton de confirmar el pedido
    let burger = valor.previousSibling;
    let nombreBurger = burger.lastElementChild;

    // Si tiene extras o aclaraciones ya cargadas, las agrego al div
    let array = burger.parentNode
    idDeBurger = array.id

    for(producto of pedidoActual){
        let variableNumero = producto.numBurger;

        if(idDeBurger==variableNumero){
            if(pedidoActual.length!=1){
                if (variableBorrado!=0){
                    idDeBurger=idDeBurger-variableBorrado;
                }
            }
            if(pedidoActual[idDeBurger].descripcion != "-"){
                document.getElementById("comentario").value=pedidoActual[idDeBurger].descripcion
            }
            if(pedidoActual[idDeBurger].extras=="Ext. cheddar"){
                document.getElementById("cbox1").checked=true
            }else if(pedidoActual[idDeBurger].extras=="Ext. bacon"){
                document.getElementById("cbox2").checked=true
            }else if(pedidoActual[idDeBurger].extras=="Ext. chd/bac"){
                document.getElementById("cbox3").checked=true
            }
        }
    }

    botonConfirmarPedido.onclick=function none2(){}
    let etiquetaNombre = document.getElementById("etiquetaNombreBurger");
    etiquetaNombre.innerHTML=nombreBurger.innerHTML;
    burgerParaExtra=valor;
}

// Funcion para cerrar el div de Extras y Aclaraciones
function cerrarExtraDesc(){

    $(".extraDesc").fadeOut(0700)

    // Agrego la funcion al boton de confirmar pedido
    botonConfirmarPedido.onclick=function _confirm(){
        datos();
    }
    // Cambio la variable
    variableDivAbierto="no";
    burgerParaExtra="";
}

// Boton para confirmar los extras y las aclaraciones
function confirmarExtras(){
    // Busco valores para obtener el producto
    let padre = burgerParaExtra.parentNode;
    let id = padre.id;
    let precio = padre.lastElementChild.innerHTML;
    
    let numeroAEliminar=0;

    // Recorro un for of para pasar por los productos, cuando coincida con el indicado, entra en el if
    for(producto of pedidoActual){
        let variableNumero = producto.numBurger;

        // Lee todas las opciones de checkboxs y textbox para agregar o cambiar extras y aclaraciones
        if(id==variableNumero){
            if(pedidoActual.length!=1){
                if (variableBorrado!=0){
                    id=id-variableBorrado;
                }
            }
            if(document.getElementById("cbox1").checked){
                if(pedidoActual[id].extras=="Ext. cheddar"){
                    alert("Ya añadio extra cheddar");
                }else if(pedidoActual[id].extras=="Ext. bacon"){
                    pedidoActual[id].extras="Ext. cheddar";
                }else if(pedidoActual[id].extras=="Ext. chd/bac"){
                    pedidoActual[id].extras="Ext. cheddar";
                    padre.lastElementChild.innerHTML=parseInt(precio)-50;
                    pedidoActual[id].precio-=50;
                    document.getElementById("_fin").innerHTML=parseInt(document.getElementById("_fin").innerHTML) - 50;
                }else{
                    padre.lastElementChild.innerHTML=parseInt(precio)+100;
                    pedidoActual[id].extras="Ext. cheddar";
                    pedidoActual[id].precio+=100;
                    document.getElementById("_fin").innerHTML=parseInt(document.getElementById("_fin").innerHTML) + 100;
                }
            }else if(document.getElementById("cbox2").checked){
                if(pedidoActual[id].extras=="Ext. bacon"){
                    alert("Ya añadio extra bacon");
                }else if(pedidoActual[id].extras=="Ext. cheddar"){
                    pedidoActual[id].extras="Ext. bacon";
                }else if(pedidoActual[id].extras=="Ext. chd/bac"){
                    pedidoActual[id].extras="Ext. bacon";
                    padre.lastElementChild.innerHTML=parseInt(precio)-50;
                    pedidoActual[id].precio-=50;
                    document.getElementById("_fin").innerHTML=parseInt(document.getElementById("_fin").innerHTML) - 50;
                }else{
                    padre.lastElementChild.innerHTML=parseInt(precio)+100;
                    pedidoActual[id].extras="Ext. bacon";
                    pedidoActual[id].precio+=100;
                    document.getElementById("_fin").innerHTML=parseInt(document.getElementById("_fin").innerHTML) + 100;
                }
            }else if(document.getElementById("cbox3").checked){
                if(pedidoActual[id].extras=="Ext. chd/bac"){
                    alert("Ya añadio extra chd/bac");
                }else if(pedidoActual[id].extras=="Ext. cheddar"){
                    pedidoActual[id].extras="Ext. chd/bac";
                    padre.lastElementChild.innerHTML=parseInt(precio)+50;
                    pedidoActual[id].precio+=50;
                    document.getElementById("_fin").innerHTML=parseInt(document.getElementById("_fin").innerHTML) + 50;
                }else if(pedidoActual[id].extras=="Ext. bacon"){
                    pedidoActual[id].extras="Ext. chd/bac";
                    padre.lastElementChild.innerHTML=parseInt(precio)+50;
                    pedidoActual[id].precio+=50;
                    document.getElementById("_fin").innerHTML=parseInt(document.getElementById("_fin").innerHTML) + 50;
                }else{
                    padre.lastElementChild.innerHTML=parseInt(precio)+150;
                    pedidoActual[id].extras="Ext. chd/bac";
                    pedidoActual[id].precio+=150;
                    document.getElementById("_fin").innerHTML=parseInt(document.getElementById("_fin").innerHTML) + 150;
                }
            }
            if(document.getElementById("comentario")!=""){
                pedidoActual[id].descripcion=document.getElementById("comentario").value;
            }
        }
        numeroAEliminar=numeroAEliminar+1;
    }
    // Si se agrega algun extra o aclaracion se muestra un * para indicar que productos tienen los mismos
    if(document.getElementById("cbox1").checked!=false || document.getElementById("cbox2").checked!=false || document.getElementById("cbox3").checked!=false || document.getElementById("comentario").value!=""){
        if(((padre.lastElementChild).previousSibling.innerHTML)[1]!="*"){
            (padre.lastElementChild).previousSibling.innerHTML=(padre.lastElementChild).previousSibling.innerHTML+"*";
        }
    }

    // Limpio el div de extras y aclaraciones
    document.getElementById("cbox1").checked=false;
    document.getElementById("cbox2").checked=false;
    document.getElementById("cbox3").checked=false;

    document.getElementById("comentario").value="";

    // Cierro el div de extras y aclaraciones
    $(".extraDesc").hide()

    // Le doy la funcion al boton de confirmar pedido
    botonConfirmarPedido.onclick=function _confirm(){
        datos();
    }
    // Cambio la variable
    variableDivAbierto="no";
}

// Funcion para cancelar un producto
function _cancelarBurger(valor){
    // Busco los valores del producto a borrar
    let padre = valor.parentNode;
    let padre2=padre.parentNode;

    // Disminuyo el costo del producto en el precio total
    let precio=padre2.lastElementChild;
    let precioFinal = document.getElementById("_fin");
    document.getElementById("_fin").innerHTML = parseInt(precioFinal.innerHTML) - parseInt(precio.innerHTML) ;

    let claseNumeroDeBurger = padre2.id;

    // Recorro con un for of y elimino el producto del array pedidoActual (Se hace con un splice)
    let numeroAEliminar=0;
    for(producto of pedidoActual){
        let variableNumero = producto.numBurger;
        if(claseNumeroDeBurger==variableNumero){
            pedidoActual.splice(numeroAEliminar,1);
        }
        numeroAEliminar=numeroAEliminar+1;
    }
    variableBorrado+=1;
    padre2.remove();
}

// Funcion para los extras. Si se chequea el extra bacon y cheddar se cancelan los individuales
function verCheckBox(valor){
    if(valor.value=="third_checkbox"){
        if(document.getElementById("cbox1").checked || document.getElementById("cbox2").checked){
            document.getElementById("cbox1").checked=false;
            document.getElementById("cbox2").checked=false;
        }
    }else{
        document.getElementById("cbox3").checked=false;
    }
}

// Funcion para confirmar el pedido y los datos
function confirmarPedido(nombre,direccion,pago){
    // Chequeo que haya objetos en el array
    if(pedidoActual==""){
        return;
    }else{
        // Genero el objeto de la clase pedido
        let pedido = new Pedido(nombre.value,direccion.value,pago,pedidoActual);

        // Busco en el localStorage el ultimo numero de pedido y genero uno nuevo pasandole el stringify del array
        let localStoragePedido = localStorage.length;
        numerodePedido=parseInt(localStoragePedido);
        let nombreDelPedido="Pedido"+numerodePedido;
        localStorage.setItem(nombreDelPedido,JSON.stringify(pedido));
    
        // Limpio el array
        numerodePedido=numerodePedido+1;
        pedidoActual=[];
        
        // Limpio el div del carrito
        let liPedidos = document.querySelector(".fil-1 li");
        while(liPedidos.firstChild){
            liPedidos.removeChild(liPedidos.firstChild);
        }
        document.getElementById("_fin").innerHTML="---";
    }
    // Limpio el div de los datos
    document.getElementById("datoNombre").value="";
    document.getElementById("datoDireccion").value="";
    document.getElementById("efectivo").checked=true;
    document.getElementById("pedidoConfirmar").style.display="none";
    numBurger=0;
    // Cambio la variable
    variableDivAbierto="no";
}

// Funcion para ingresar al div de datos
function datos(){
    
    if(pedidoActual!=""){
        $("#pedidoConfirmar").fadeIn(0700)
        document.getElementById("datoPrecio").innerHTML="TOTAL: "+(document.getElementById("_fin")).innerHTML;
        variableDivAbierto="si";
    }else{
        alert("No agrego productos a su pedido");
    }
}

// Funcion para cerrar el div de los datos
function cerrarDatos(){
    variableDivAbierto="no";
    $("#pedidoConfirmar").fadeOut(0700);
}

// Funcion para confirmar los datos cargados
function confirmarDatos(){
    // Tomo los valores necesarios y chequeo si estan completos
    let nombre = document.getElementById("datoNombre");
    let direccion = document.getElementById("datoDireccion");
    if(nombre.value==""){
        alert("Debe ingresar su nombre");
    }else if(direccion.value==""){
        alert("Debe ingresar su direccion");
    }else{
        let formaDePago = document.getElementById("efectivo").checked;
        let pago = "EFECTIVO";
        if (!formaDePago){
            formaDePago=document.getElementById("transferencia").checked;
            pago="TRANSFERENCIA";
            if(!formaDePago){
                formaDePago=document.getElementById("mp").checked;
                pago="MERCADOPAGO";
            }
        }
        // LLamo a la funcion confirmarPedido
        confirmarPedido(nombre,direccion,pago);
        alert("Su pedido fue realizado");
    }
}