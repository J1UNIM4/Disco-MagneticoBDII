const butonS = document.getElementById("searchB");
const butonI = document.getElementById("insertionB");
const buttonState = document.getElementById("statusB");
const buttonset = document.getElementById("informationB");

let discomagnetico = [[[[[]]]]]; // Disco inicializado
let discoC = 16; // Capacidad de discos
let superficieC = 2; // Capacidad de superficies
let pistaC = 2; // Capacidad de pistas
let bloqueC = 2; // Capacidad de bloques
let sectoresC = 32; // Capacidad de sectores
let totalbytesS = 0; // Bytes actuales en el sector

let informacion = [
  ['Integer(10)',4,1],['VARCHAR(40)',40,'Fruit of the loom'],['DECIMAL(10,2)',8,7.97],['DECIMAL(10,2)',8,0.6],['DECIMAL(10,2)',8,8.57],
  ['Integer(10)',4,2],['VARCHAR(40)',40,'Rawlings little Leager'],['DECIMAL(10,2)',8,2.97],['DECIMAL(10,2)',8,0.22],['DECIMAL(10,2)',8,,3.19],
  ['Integer(10)',4,3],['VARCHAR(40)',40,'Secret Antiperspirant'],['DECIMAL(10,2)',8,1.29],['DECIMAL(10,2)',8,0.1],['DECIMAL(10,2)',8,1.39],
  ['Integer(10)',4,4],['VARCHAR(40)',40,'Deadpool DVD'],['DECIMAL(10,2)',8,14.96],['DECIMAL(10,2)',8,1.12],['DECIMAL(10,2)',8,16.08],
  ['Integer(10)',4,5],['VARCHAR(40)',40,'Maxwell House Coffe'],['DECIMAL(10,2)',8,7.28],['DECIMAL(10,2)',8,0.55],['DECIMAL(10,2)',8,7.83],
  ['Integer(10)',4,6],['VARCHAR(40)',40,'Banana Boat Sunscr'],['DECIMAL(10,2)',8,6.68],['DECIMAL(10,2)',8,0.5],['DECIMAL(10,2)',8,7.18],
  ['Integer(10)',4,7],['VARCHAR(40)',40,'Wrench set,18 pieces'],['DECIMAL(10,2)',8,10],['DECIMAL(10,2)',8,0.75],['DECIMAL(10,2)',8,10.75],
  ['Integer(10)',4,8],['VARCHAR(40)',40,'M and M,42 oz'],['DECIMAL(10,2)',8,8.98],['DECIMAL(10,2)',8,0.67],['DECIMAL(10,2)',8,9.65],
  ['Integer(10)',4,9],['VARCHAR(40)',40,'Bertoli Alfredo Sauces'],['DECIMAL(10,2)',8,2.12],['DECIMAL(10,2)',8,0.16],['DECIMAL(10,2)',8,2.28],
  ['Integer(10)',4,10],['VARCHAR(40)',40,'Large paperclips'],['DECIMAL(10,2)',8,6.19],['DECIMAL(10,2)',8,0.46],['DECIMAL(10,2)',8,6.65]
];



function insert(t,bytes,v,insert){
  let indexs = discomagnetico.length - 1;
  let indexp = discomagnetico[indexs].length - 1;
  let indexb = discomagnetico[indexs][indexp].length - 1;
  let indexsect = discomagnetico[indexs][indexp][indexb].length - 1;

  if (totalbytesS + bytes >= sectoresC) {
    const rest = sectoresC - totalbytesS;
    discomagnetico[indexs][indexp][indexb][indexsect].push([
      t,
      rest,
      v,
    ]);
    if (insert) {
      informacion.push([t,rest,v]);
    }
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
        t,
        bytes - rest,
        v,
      ]);
      totalbytesS = bytes - rest;
    }else{
        totalbytesS = 0;
    }
  } else {
    discomagnetico[indexs][indexp][indexb][indexsect].push([
      t,
      bytes,
      v,
    ]);
    if (insert) {
      informacion.push([t,bytes,v]);
    }
    totalbytesS += bytes;
  }
}
function setInformation(){
  informacion.forEach((tupla,index)=>{
    insert(tupla[0],tupla[1],tupla[2],false);
  })
}

document.getElementById('sectC').addEventListener('click',()=>{
  capacity = document.getElementById('Sector');
  capacity.textContent = 'Sector capacidad '+ capacity.childNodes[1].value;
  const input = document.createElement("input");
  input.placeholder = 'New capacity';
  capacity.appendChild(input);
  sectoresC = parseInt(capacity.childNodes[1].value);
  discomagnetico = [[[[[]]]]];
  setInformation();
});
document.getElementById('BloqC').addEventListener('click',()=>{
  capacity = document.getElementById('Bloque');
  capacity.textContent = 'Bloque capacidad '+ capacity.childNodes[1].value;
  const input = document.createElement("input");
  input.placeholder = 'New capacity';
  capacity.appendChild(input);
  bloqueC = parseInt(capacity.childNodes[1].value);
  discomagnetico = [[[[[]]]]];
  setInformation();
});
document.getElementById('PistC').addEventListener('click',()=>{
  capacity = document.getElementById('Pista');
  capacity.textContent = 'Pista capacidad '+ capacity.childNodes[1].value;
  const input = document.createElement("input");
  input.placeholder = 'New capacity';
  capacity.appendChild(input);
  pistaC = parseInt(capacity.childNodes[1].value);
  discomagnetico = [[[[[]]]]];
  setInformation();
});
document.getElementById('superfC').addEventListener('click',()=>{
  capacity = document.getElementById('Superficie');
  capacity.textContent = 'Superfice capacidad '+ capacity.childNodes[1].value;
  const input = document.createElement("input");
  input.placeholder = 'New capacity';
  capacity.appendChild(input);
  superficieC = parseInt(capacity.childNodes[1].value);
  discomagnetico = [[[[[]]]]];
  setInformation();
});
buttonset.addEventListener('click',setInformation);





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
  insert(t.value,bytes,v.value,true);
  

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
            if (elemento[2] == val) {
              encontrado = true;
              // Mostrar información en el contenedor
              const resultItem = document.createElement("div");
              resultItem.textContent = `Encontrado en Superficie ${sIndex}, Pista ${pIndex}, Bloque ${bIndex}, Sector ${secIndex}: Type=${elemento[0]}, Bytes=${elemento[1]}, Value=${elemento[2]}`;
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