function solicitarMedioDePago(){
    let medioIngresado = prompt('Ingrese que medio de pago prefiere: 1-Tarjeta de Debito, 2-Tarjeta de Credito, 3-Mercado Pago');
    switch(medioIngresado){
        case '1':
            return alert('Tiene hasta 12 cuotas sin interes');
            break;
        case '2':
            return alert('Tiene 10% de descuento en un pago');
            break;
        case '3':
            return alert('Tiene hasta 6 cuatas sin interes');
            break;
        default:
            return alert('No a elegido una opcion valida');
            break;
    }
}
solicitarMedioDePago();
let cuotas = 0;
function calcularCuotas(monto, cuotas){
    alert (cuotas = Number(monto) / Number(cuotas));

}
calcularCuotas(prompt('Ingrese Monto'), prompt('Ingrese cuotas'));

