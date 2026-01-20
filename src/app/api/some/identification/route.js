import { NextResponse } from "next/server";

export async function POST(request){

    const data = await request.json();

    if (!/^\d{10}$/.test(data.cedula)) return false;

    const provincia = parseInt(data.cedula.substring(0, 2), 10);
    const tercerDigito = parseInt(data.cedula[2], 10);

    // Provincias válidas
    if (provincia < 1 || provincia > 24) return false;

    // Persona natural
    if (tercerDigito < 0 || tercerDigito > 5) return false;

    const coeficientes = [2,1,2,1,2,1,2,1,2];
    const digitoVerificador = parseInt(data.cedula[9], 10);

    let suma = 0;

    for (let i = 0; i < 9; i++) {
        let valor = parseInt(data.cedula[i], 10) * coeficientes[i];
        if (valor >= 10) valor -= 9;
        suma += valor;
    }

    const decenaSuperior = Math.ceil(suma / 10) * 10;
    const resultado = decenaSuperior - suma;

    const digitoCalculado = resultado === 10 ? 0 : resultado;
    
    return NextResponse.json(digitoCalculado === digitoVerificador)
}