let tam = 4;
let variables = ['x', 'y', 'z', 'u'];
function generar() {
    $('.ecuacion').html('');
    for (let i = 0; i < tam; i++) {
        let cad = '';
        for (let j = 0; j < tam + 1; j++) {
            if (j == 0) {
                cad += `<label>E${i + 1}: </label>
                <input type="text" class="w-100 mx-2" placeholder="${variables[j]}${j + 1}">`
            } else if (j == tam) {
                cad += ` <label>=</label>
                <input type="text" class="w-100 mx-2" placeholder="r${i + 1}">`
            } else {
                cad += `<label>+</label>
               <input type="text" class="w-100 mx-2" placeholder="${variables[j]}${j + 1}"></input>`
            }
        }
        $('.ecuacion').append(`<div class="d-flex mt-3">${cad}</div>`);
    }

}
function aumentar(op) {
    if (op == '+') {
        if (tam + 1 <= 4) tam++;
        else alert('MAXIMO 4 VARIABLES');
    } else {
        if (tam - 1 >= 2) tam--;
        else alert('MINIMO 2 VARIABLES');
    }
    generar();
    $('.escondido').css('display', 'none');
    $('.resultado').html('');
}
function dibujar(matriz, _i, _j, x) {
    let n = matriz.length;
    $(`.tabla`).append(`<tr>
                        <td colspan="4">Paso ${x + 1}</td>
                        </tr>`);
    for (let i = 0; i < n; i++) {
        let cad = '';
        for (let j = 0; j < n + 1; j++) {
            let num = matriz[i][j].toFixed(2);
            if (j == n) {
                if (i == _i) {
                    cad += `<td class="celda text-success">${num}</td>`;
                } else if (i == _j) {
                    cad += `<td class="celda text-danger">${num}</td>`;
                } else {
                    cad += `<td class="celda fw-light">${num}</td>`;
                }
            } else {
                if (i == _i) {
                    cad += `<td class="text-success">${num}</td>`;
                } else if (i == _j) {
                    cad += `<td class="text-danger">${num}</td>`;
                } else {
                    cad += `<td class="fw-light">${num}</td>`;
                }
            }
        }
        $('.tabla').append(`<tr>${cad}</tr>`);
    }
}
function valido() {
    let arr = document.querySelectorAll('input');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value.trim() == "") return false;
    }
    return true;
}
function algoritmo() {
    $('.escondido').css('display', 'block');
    $('.resultado').html('');

    let arr = document.querySelectorAll('input');
    let matriz = new Array(tam);
    for (let i = 0; i < tam; i++) {
        matriz[i] = new Array(tam + 1);
    }
    let c = 0;
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam + 1; j++) {
            matriz[i][j] = parseInt(arr[c].value);
            c++;
        }
    }
    //let matriz = [[3, -2, -1, -1, -6], [-2, -1, 2, 1, 17], [5, -2, -2, -1, -14], [1, 1, 2, 5, 12]];
    //let matriz = [[-2, 3, -1, 2, 2], [3, -1, 3, -1, 2], [-1, 2, 5, -2, 11], [6, -3, 1, 1, -4]];
    let n = tam * tam - tam;
    let pasos = new Array(n);
    for (let i = 0; i < n; i++) {
        pasos[i] = new Array(2);
    }
    let cont = 0;
    for (let i = 1; i < tam; i++) {
        for (let j = tam - 1; j >= i; j--) {
            pasos[cont][0] = j;
            pasos[cont][1] = i - 1;
            cont++;
        }
    }
    for (let i = tam - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            pasos[cont][0] = j;
            pasos[cont][1] = i;
            cont++;
        }
    }
    $('.tabla').html('');
    for (let x = 0; x < n; x++) {
        let i = pasos[x][0];
        let j = pasos[x][1];
        let aux = matriz[j][j] / matriz[i][j];
        for (let k = 0; k < tam + 1; k++) {
            matriz[i][k] = (matriz[i][k] * aux * -1) + matriz[j][k];
        }
        dibujar(matriz, i, j, x);
    }

    for (let i = 0; i < tam; i++) {
        let r = matriz[i][tam] / matriz[i][i];
        $(`.resultado`).append(`<span>x${i + 1}: ${r.toFixed(2)}</span><br>`);
    }

}
function resultado() {
    if (valido()) {
        algoritmo();
    } else {
        alert('DEBE LLENAR TODOS LOS CAMPOS');
    }
}
generar();
