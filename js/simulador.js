function operacion(){
    let operacion = confirm("¿Desea ingresar al supermercado?")
    if (operacion!=true){
        alert("Hasta luego!")
        operacion()
    }else{
        misProductos()
    }
}

var total = 0
var listaPedido=[]

function misProductos(){
    let producto = parseInt(prompt("Ingrese el numero del producto que quiere agregar: \n1-AGUA   $100\n2-HARINA   $150\n3-TOMATE   $20\n4-AZUCAR   $120\n5-SAL   $80\n6-CHOCOLATE   $90\n7-HAMBURGUESA   $160\n8-MAYONESA   $110\n9-PAN   $60\n10-DULCE DE LECHE   $240\n11-LAVANDINA   $450\n12-REMERA   $570\n13-COCA COLA   $230\n14-SILLA   $750\n15-LECHUGA   $40"))
    if (producto>15 || producto<1 || isNaN(producto)){
        alert("No ha introducido un numero correctamente")
        misProductos()
    }else{
        switch(producto){
            
            case 1:
                alert("Usted ha ingresado AGUA")
                total = total + 100
                listaPedido.push('AGUA')
                pregunta(total,listaPedido)
                break
            case 2:
                alert("Usted ha ingresado HARINA")
                total = total + 150
                listaPedido.push('HARINA')
                pregunta(total,listaPedido)
                break
            case 3:
                alert("Usted ha ingresado TOMATE")
                total = total + 20
                listaPedido.push('TOMATE')
                pregunta(total,listaPedido)
                break
            case 4:
                alert("Usted ha ingresado AZUCAR")
                total = total + 120
                listaPedido.push('AZUCAR')
                pregunta(total,listaPedido)
                break
            case 5:
                alert("Usted ha ingresado SAL")
                total = total + 80
                listaPedido.push('SAL')
                pregunta(total,listaPedido)
                break
            case 6:
                alert("Usted ha ingresado CHOCOLATE")
                total = total + 90
                listaPedido.push('CHOCOLATE')
                pregunta(total,listaPedido)
                break
            case 7:
                alert("Usted ha ingresado HAMBURGUESA")
                total = total + 160
                listaPedido.push('HAMBURGUESA')
                pregunta(total,listaPedido)
                break
            case 8:
                alert("Usted ha ingresado MAYONESA")
                total = total + 110
                listaPedido.push('MAYONESA')
                pregunta(total,listaPedido)
                break
            case 9:
                alert("Usted ha ingresado PAN")
                total = total + 60
                listaPedido.push('PAN')
                pregunta(total,listaPedido)
                break
            case 10:
                alert("Usted ha ingresado DULCE DE LECHE")
                total = total + 240
                listaPedido.push('DULCE DE LECHE')
                pregunta(total,listaPedido)
                break
            case 11:
                alert("Usted ha ingresado LAVANDINA")
                total = total + 450
                pregunta(total)
                break
            case 12:
                alert("Usted ha ingresado REMERA")
                total = total + 570
                listaPedido.push('REMERA')
                pregunta(total,listaPedido)
                break
            case 13:
                alert("Usted ha ingresado COCA COLA")
                total = total + 230
                listaPedido.push('COCA COLA')
                pregunta(total,listaPedido)
                break
            case 14:
                alert("Usted ha ingresado SILLA")
                total = total + 750
                listaPedido.push('SILLA')
                pregunta(total,listaPedido)
                break
            case 15:
                alert("Usted ha ingresado LECHUGA")
                total = total + 40
                listaPedido.push('LECHUGA')
                pregunta(total,listaPedido)
                break
        }
    }
}

var listaFinalPedidos="LISTA DE PRODUCTOS:\n"


function final(valorTotal,listaPedido){
    listaFinalPedidos = listaFinalPedidos + listaPedido.join("\n")
    // for (let i in listaPedido){
    //     listaFinalPedidos = listaFinalPedidos + `${listaPedido[i]}\n`
    // }
    alert(`${listaFinalPedidos}\nEl valor total de su pedido es de: $${valorTotal}`)
    metodoPago(valorTotal)
}
function pregunta(total,listaPedido){
    let respuesta = confirm("¿Desea agregar otro producto a la lista?")
    if (respuesta!=true){
        final(total,listaPedido)
    }else{
        misProductos()
    }
}

class Tarjeta{
    constructor(tarjeta,numero,codigoV){
        this.tarjeta = tarjeta
        this.numero = numero
        this.codigo = codigoV
    }
    toString(){
        alert(`Tarjeta: ${this.tarjeta}\nNumero: ${this.numero}\nCodigo: ${this.codigo}`)
    }
}

var tarjetaDePago = []

function metodoPago(valorTotal){
    let metodo = parseInt(prompt("¿Qué metodo de pago quiere utilizar?\n1- Efectivo\n2-Tarjeta"))
    if (metodo!=1 && metodo!=2){
        alert("No ha ingresado una forma de pago correcta. Vuelva a intentarlo")
        metodoPago()
    }
    if (metodo==1){
        alert("Pase por la caja. Muchas gracias!")
    }else{
        alert("Usted eligió pagar con tarjeta. A continuación tendra que cargar sus datos.")

        let tarjeta = prompt("Ingrese el banco(Santander,Visa,BBVA,Nacion)")
        while(tarjeta.toUpperCase()!="SANTANDER" && tarjeta.toUpperCase()!="VISA" && tarjeta.toUpperCase()!="BBVA" && tarjeta.toUpperCase()!="NACION"){
            alert("No ingreso un banco correcto")
            tarjeta = prompt("Ingrese el banco(Santander,Visa,BBVA,Nacion)")
        }
        let numero = prompt("Ingrese su numero de tarjeta (10 caracteres):")
        while(numero.length!=10){
            alert("No ingreso la cantidad de numeros correctos")
            numero = prompt("Ingrese su numero de tarjeta (10 caracteres):")
        }

        let codigoV = prompt("Ingrese los 3 numeros del Codigo de seguridad:")
        while(codigoV.length!=3){
            alert("No ingreso la cantidad de numeros correctos")
            codigoV = prompt("Ingrese los 3 numeros del Codigo de seguridad:")
        }
        tarjetaDePago.push(new Tarjeta(tarjeta,numero,codigoV))
        tarjetaDePago.toString()
        let confirmar = confirm("¿Desea realizar el pago?")
        if (confirmar==true){
            cuotasTotales(valorTotal)
        }else{
            metodoPago(valorTotal)
        }
    }
}

function cuotasTotales(valorTotal){
    let cuotas = parseInt(prompt("Elija en cuantas cuotas quiere pagar: 3 - 6 - 9"))
    if (cuotas===3){
        let cuentaFinal = valorTotal / 3
        alert(`El pago sera de 3 cuotas de $${cuentaFinal} cada una.\nGracias por su compra!`)
    }else if(cuotas===6){
        let cuentaFinal = valorTotal / 6
        alert(`El pago sera de 6 cuotas de $${cuentaFinal} cada una.\nGracias por su compra!`)
    }else if(cuotas===9){
        let cuentaFinal = valorTotal / 9
        alert(`El pago sera de 9 cuotas de $${cuentaFinal} cada una.\nGracias por su compra!`)
    }else{
        cuotasTotales()
    }
}

// setTimeout(function(){operacion()},2500)