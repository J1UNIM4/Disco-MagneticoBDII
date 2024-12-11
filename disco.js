let discomagnetico = [[[[[]]]]]; // Disco inicializado
let discoC = 16; // Capacidad de discos
let superficieC = 2; // Capacidad de superficies
let pistaC = 2; // Capacidad de pistas
let bloqueC = 2; // Capacidad de bloques
let sectoresC = 32; // Capacidad de sectores
let totalbytesS = 0; // Bytes actuales en el sector

let information = [];

function crearTabla(data) {
  const todasFilas = data.split(/\r?\n|\r/);
  let tabla = '<table class="table table-bordered">';
  for (let fila = 0; fila < todasFilas.length; fila++) {
    if (fila === 0) {
      tabla += '<thead>';
      tabla += '<tr>';
    } else {
      tabla += '<tr>';
      // Create a new empty array for the current row
      information.push([]);
    }
    const celdasFila = todasFilas[fila].split(';');
    for (let rowCell = 0; rowCell < celdasFila.length; rowCell++) {
      if (fila === 0) {
        tabla += '<th>';
        tabla += celdasFila[rowCell];
        tabla += '</th>';
      } else {
        tabla += '<td>';
        tabla += celdasFila[rowCell];
        tabla += '</td>';
        // Add the cell value to the current row array in information
        information[fila - 1].push(celdasFila[rowCell]);
      }
    }
    if (fila === 0) {
      tabla += '</tr>';
      tabla += '</thead>';
      tabla += '<tbody>';
    } else {
      tabla += '</tr>';
    }
  }
  tabla += '</tbody>';
  tabla += '</table>';
  document.querySelector('#miTabla').innerHTML = tabla;
  setInformation();
}

function leerArchivo2(evt) {
  let file = evt.target.files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    crearTabla(e.target.result);
  };
  reader.readAsText(file);
}
document.querySelector('#csvFile')
  .addEventListener('change', leerArchivo2, false);



function insert(t,bytes,v){
  let indexs = discomagnetico.length - 1;
  let indexp = discomagnetico[indexs].length - 1;
  let indexb = discomagnetico[indexs][indexp].length - 1;
  let indexsect = discomagnetico[indexs][indexp][indexb].length - 1;


  if (totalbytesS + bytes >= sectoresC) {
    if(totalbytesS + bytes > sectoresC){
      discomagnetico[indexs][indexp][indexb][indexsect].push(["pointer",4,"puntero a " + t,v]);
      totalbytesS++;
    }else{
      discomagnetico[indexs][indexp][indexb][indexsect].push([
        t,
        bytes,
        v,
      ]);
    }
    
    //puntero a sector
    let indicess = [indexs,indexp,indexb,indexsect];

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
        bytes,
        v,
      ]);
      totalbytesS = bytes;
    }else{
      totalbytesS = 0;
    }
    //push puntero next sect
    discomagnetico[indicess[0]][indicess[1]][indicess[2]][indicess[3]].push([
      "Puntero sector",
      1,
      `Superficie  ${indexs}, Pista ${indexp}, Bloque ${indexb}, Sector ${indexsect}`,
      `discomagnetico[${indexs}][${indexp}][${indexb}][${indexs}]`
    ])

  } else {
    discomagnetico[indexs][indexp][indexb][indexsect].push([
      t,
      bytes,
      v,
    ]);
    totalbytesS += bytes;
  }
}
function setInformation(){
  console.log(information);
  information.forEach((tupla,index)=>{  
    const min_priority = [
      {type:'Integer(10)', len: 4, val: parseInt(tupla[0])},
      {type:'VARCHAR(40)', len: tupla[1].length, val: tupla[1]},
      {type:'DECIMAL(10,2)', len: 8, val: parseFloat(tupla[2])},
      {type:'DECIMAL(10,2)', len: 8, val: parseFloat(tupla[3])},
      {type:'DECIMAL(10,2)', len: 8, val: parseFloat(tupla[4])}
    ];
    min_priority.sort((a,b)=> a.len - b.len);
    min_priority.forEach((e)=>{
      insert(e.type,e.len,e.val);
    });
  });
  console.log("Estado del disco:");
  console.log(JSON.stringify(discomagnetico, null, 2));
}

document.getElementById('setc').addEventListener('click', () => {
  const sectorLabel = document.querySelector('.sect label');
  const blocLabel = document.querySelector('.bloc label');
  const trackLabel = document.querySelector('.track label');
  const surfLabel = document.querySelector('.surf label');

  const inputsec = document.getElementById('sector-capacity');
  const inputblo = document.getElementById('block-capacity');
  const inputtra = document.getElementById('track-capacity');
  const inputsurf = document.getElementById('surface-capacity');

  if (isNaN(inputsec.value)||isNaN(inputblo.value)||isNaN(inputtra.value)||isNaN(inputsurf.value)) {
    alert("Error: La capacidad debe ser un número.");
    return;
  }

  if(inputsec.value){
    sectoresC = parseInt(inputsec.value);
    sectorLabel.textContent = 'Sector Capacidad ' + sectoresC + ' :';
    inputsec.value = "";
  }
  if(inputblo.value){
    bloqueC = parseInt(inputblo.value);
    blocLabel.textContent = 'Bloque Capacidad ' + bloqueC + ' :';
    inputblo.value = "";
  }
  if(inputtra.value){
    pistaC = parseInt(inputtra.value);
    trackLabel.textContent = 'Pista Capacidad ' + pistaC + ' :';
    inputtra.value = "";
  }
  if(inputsurf.value){
    superficieC = parseInt(inputsurf.value);
    surfLabel.textContent = 'Superficie Capacidad ' + superficieC + ' :';
    inputsurf.value = "";
  }
  discomagnetico = [[[[[]]]]];
  setInformation();
  return;
});


// Manejo de búsqueda de datos
document.getElementById('searchB').addEventListener("click", () => {
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

              const resultBlock = document.createElement("div");
              
              resultBlock.textContent = `Bloque ${bIndex} : `;

              bloque.forEach((sector, secIndex) => {
                const sect = document.createElement('div');
                sect.textContent = `Sector ${secIndex}: `

                sector.forEach((elemento) => {
                  const e = document.createElement('button');
                  e.textContent = `${elemento[2]} `;
                  if(elemento.length == 4){
                    e.onclick = ()=>{
                      alert(`Type = ${elemento[0]}, \nBytes = ${elemento[1]},\nValue = ${elemento[2]} \nReference = ${elemento[3]}`);
                    };
                    e.classList.add('pointer');
                  }else{
                    e.onclick = ()=>{
                        alert(`Type=${elemento[0]}, \nBytes=${elemento[1]},\nValue=${elemento[2]} `)
                    };
                  }
                  sect.appendChild(e);
                });
                resultBlock.appendChild(sect);
              });
              resultsDiv.appendChild(resultBlock);
            }
          });
        });
      });
    });
  });
  if (!encontrado) {
    resultsDiv.innerText = "No se encontró el valor especificado.";
    return;
  }
});

