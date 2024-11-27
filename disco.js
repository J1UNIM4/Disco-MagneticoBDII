const butonS = document.getElementById("searchB");
const butonI = document.getElementById("insertionB");
const buttonState = document.getElementById("statusB");
const buttonset = document.getElementById("informationB");

let discomagnetico = [[[[[]]]]]; // Disco inicializado
let discoC = 16; // Capacidad de discos
let superficieC = 16384; // Capacidad de superficies
let pistaC = 32; // Capacidad de pistas
let bloqueC = 2; // Capacidad de bloques
let sectoresC = 4096; // Capacidad de sectores
let totalbytesS = 0; // Bytes actuales en el sector

let informacion = [
  [1,'Fruit of the loom',7.97,0.6,8.57],
  [2,'Rawlings little Leager',2.97,0.22,3.19],
  [3,'Secret Antiperspirant',1.29,0.1,1.39],
  [4,'Deadpool DVD',14.96,1.12,16.08],
  [5,'Maxwell House Coffe',7.28,0.55,7.83],
  [6,'Banana Boat Sunscr',6.68,0.5,7.18],
  [7,'Wrench set,18 pieces',10,0.75,10.75],
  [8,'M and M,42 oz',8.98,0.67,9.65],
  [9,'Bertoli Alfredo Sauces',2.12,0.16,2.28],
  [10,'Large paperclips',6.19,0.46,6.65]
];


function insert(type,bytes,value){
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
      alert('ENTRANDO AL BLOQUE');
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
      totalbytesS = bytes - rest;
    }else{
        totalbytesS = 0;
    }
  } else {
    discomagnetico[indexs][indexp][indexb][indexsect].push([
      false,
      t.value,
      bytes,
      v.value,
    ]);
    totalbytesS += bytes;
  }
}

buttonset.addEventListener('click',()=>{
  informacion.forEach((tupla,index)=>{
    tupla.forEach((elemento,index)=>{

    })
})
});






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
      alert('ENTRANDO AL BLOQUE');
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
      totalbytesS = bytes - rest;
    }else{
        totalbytesS = 0;
    }
  } else {
    discomagnetico[indexs][indexp][indexb][indexsect].push([
      false,
      t.value,
      bytes,
      v.value,
    ]);
    totalbytesS += bytes;
  }

  t.value = "";
  b.value = "";
  v.value = "";
});

// Manejo de búsqueda de datos
butonS.addEventListener("click", () => {
  const val = document.getElementById("searchT")?.value;
  const resultsDiv = document.getElementById("results");
  
  // Limpia el contenedor de resultados
  resultsDiv.innerHTML = "";

  if (!val) {
    resultsDiv.innerText = "Por favor ingresa un valor para buscar.";
    return;
  }

  let encontrado = false;
  discomagnetico.forEach((superficie, sIndex) => {
    superficie.forEach((pista, pIndex) => {
      pista.forEach((bloque, bIndex) => {
        bloque.forEach((sector, secIndex) => {
          sector.forEach((elemento) => {
            if (elemento[3] === val) {
              encontrado = true;
              // Mostrar información en el contenedor
              const resultItem = document.createElement("div");
              resultItem.textContent = `Encontrado en Superficie ${sIndex}, Pista ${pIndex}, Bloque ${bIndex}, Sector ${secIndex}: Type=${elemento[1]}, Bytes=${elemento[2]}, Value=${elemento[3]}`;
              resultsDiv.appendChild(resultItem);
            }
          });
        });
      });
    });
  });

  if (!encontrado) {
    resultsDiv.innerText = "No se encontró el valor especificado.";
  }
});

// Manejo de estado del disco
buttonState.addEventListener("click", () => {
  console.log("Estado del disco:");
  console.log(JSON.stringify(discomagnetico, null, 2));
});