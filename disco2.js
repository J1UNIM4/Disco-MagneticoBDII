const butonS = document.getElementById("searchB");
const butonI = document.getElementById("insertionB");
const buttonState = document.getElementById("statusB");

let discomagnetico = [[[[[]]]]]; // Disco inicializado
let discoC = 16; // Capacidad de discos
let superficieC = 16384; // Capacidad de superficies
let pistaC = 32; // Capacidad de pistas
let bloqueC = 2; // Capacidad de bloques
let sectoresC = 4096; // Capacidad de sectores
let totalbytesS = 0; // Bytes actuales en el sector

// Manejo de inserción de datos
butonI.addEventListener("click", () => {
  const t = document.getElementById("type");
  const b = document.getElementById("bytes");
  const v = document.getElementById("value");

  // Validación de entradas
  if (!t || !b || !v) {
    alert("Error: Falta uno o más elementos del formulario.");
    return;
  }
  if (!t.value || !b.value || !v.value) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Conversión de valores
  const bytes = parseInt(b.value);
  if (isNaN(bytes)) {
    alert("Error: Los bytes deben ser un número.");
    return;
  }

  let indexs = discomagnetico.length - 1;
  let indexp = discomagnetico[indexs].length - 1;
  let indexb = discomagnetico[indexs][indexp].length - 1;
  let indexsect = discomagnetico[indexs][indexp][indexb].length - 1;

  if (totalbytesS + bytes >= sectoresC) {
    const rest = sectoresC - totalbytesS;
    discomagnetico[indexs][indexp][indexb][indexsect].push([
      true,
      t.value,
      rest,
      v.value,
    ]);
    indexsect++;

    if (indexsect == bloqueC) {
      indexsect = 0;
      indexb++;
      if (discomagnetico[indexs][indexp].length == pistaC) {
        indexp++;
        indexb = 0;
        if (discomagnetico[indexs].length == superficieC) {
          indexp = 0;
          if (discomagnetico.length == discoC) {
            alert("Error: No hay más espacio en el disco.");
            return;
          }
          discomagnetico.push([]);
          indexs++;
        }
        discomagnetico[indexs].push([]);
      }
      discomagnetico[indexs][indexp].push([]);
    }
    discomagnetico[indexs][indexp][indexb].push([]);
    if (totalbytesS + bytes > sectoresC) {
      discomagnetico[indexs][indexp][indexb][indexsect].push([
        true,
        t.value,
        bytes - rest,
        v.value,
      ]);
    }
    totalbytesS = bytes - rest;
  } else {
    discomagnetico[indexs][indexp][indexb][indexsect].push([
      false,
      t.value,
      bytes,
      v.value,
    ]);
    totalbytesS += bytes;
  }

  console.log("Datos insertados:", discomagnetico[indexs][indexp][indexb]);

  t.value = "";
  b.value = "";
  v.value = "";
});

// Manejo de búsqueda de datos
butonS.addEventListener("click", () => {
  const val = document.getElementById("searchT")?.value;
  if (!val) {
    alert("Por favor ingresa un valor para buscar.");
    return;
  }

  let encontrado = false;
  discomagnetico.forEach((superficie) => {
    superficie.forEach((pista) => {
      pista.forEach((bloque) => {
        bloque.forEach((sector) => {
          sector.forEach((elemento) => {
            if (elemento[3] === val) {
              alert('Elemento encontrado '+ elemento[3]);
              encontrado = true;
            }
          });
        });
      });
    });
  });

  if (!encontrado) alert("No se encontró el valor especificado.");
});

// Manejo de estado del disco
buttonState.addEventListener("click", () => {
  console.log("Estado del disco:");
  console.log(JSON.stringify(discomagnetico, null, 2));
});