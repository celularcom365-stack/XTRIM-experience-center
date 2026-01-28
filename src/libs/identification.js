export function verify(identification) {

    // 10 (cédula) o 13 (RUC)
    if (!/^\d{10}(\d{3})?$/.test(identification)) return false;

    const isRuc = identification.length === 13;

    // RUC persona natural debe terminar en 001
    if (isRuc && identification.slice(10) !== "001") return false;

    const cedula = identification.slice(0, 10);

    const provincia = parseInt(cedula.substring(0, 2), 10);
    const tercerDigito = parseInt(cedula[2], 10);

    if (provincia < 1 || provincia > 24) return false;
    if (tercerDigito < 0 || tercerDigito > 5) return false;

    const coeficientes = [2,1,2,1,2,1,2,1,2];
    const digitoVerificador = parseInt(cedula[9], 10);

    let suma = 0;

    for (let i = 0; i < 9; i++) {
        let valor = parseInt(cedula[i], 10) * coeficientes[i];
        if (valor >= 10) valor -= 9;
        suma += valor;
    }

    const decenaSuperior = Math.ceil(suma / 10) * 10;
    const resultado = decenaSuperior - suma;
    const digitoCalculado = resultado === 10 ? 0 : resultado;

    return digitoCalculado === digitoVerificador;
}