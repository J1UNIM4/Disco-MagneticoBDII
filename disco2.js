const butonS = document.getElementById("searchB");
const buttonState = document.getElementById("statusB");
const buttonset = document.getElementById("informationB");

let discomagnetico = [[[[[]]]]]; // Disco inicializado
let discoC = 16; // Capacidad de discos
let superficieC = 2; // Capacidad de superficies
let pistaC = 2; // Capacidad de pistas
let bloqueC = 2; // Capacidad de bloques
let sectoresC = 32; // Capacidad de sectores
let totalbytesS = 0; // Bytes actuales en el sector

const excel_input= document.getElementById("excel-file");

let information;

excel_input.addEventListener('change',async function(){
  information =await readXlsxFile(excel_input.files[0]);
  console.log(information);
  setInformation();
  print();
});

function print(){
  // Obtener el contenedor donde se insertará la tabla
  const tablaContainer = document.getElementById('miTabla');

  // Crear la tabla y el cuerpo
  const tabla = document.createElement('table');
  const tbody = document.createElement('tbody');

  // Crear las filas y celdas
  information.forEach(filaDatos => {
    const tr = document.createElement('tr');
    filaDatos.forEach(dato => {
      const td = document.createElement('td');
      td.textContent = dato;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  // Agregar el cuerpo a la tabla y la tabla al contenedor
  tabla.appendChild(tbody);
  tablaContainer.appendChild(tabla);
}


function insert(t,bytes,v){
  let indexs = discomagnetico.length - 1;
  let indexp = discomagnetico[indexs].length - 1;
  let indexb = discomagnetico[indexs][indexp].length - 1;
  let indexsect = discomagnetico[indexs][indexp][indexb].length - 1;


  if (totalbytesS + bytes >= sectoresC) {
    if(totalbytesS + bytes > sectoresC){
      discomagnetico[indexs][indexp][indexb][indexsect].push(["puntero a " + t]);
    }else{
      discomagnetico[indexs][indexp][indexb][indexsect].push([
        t,
        bytes,
        v,
      ]);
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
        bytes,
        v,
      ]);
      totalbytesS = bytes;
    }else{
      totalbytesS = 0;
    }
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
  information.forEach((tupla,index)=>{
    if(index!=0){
      const min_priority = [
        {type:'Integer(10)', len: 4, val: tupla[0]},
        {type:'VARCHAR(40)', len: tupla[1].length, val: tupla[1]},
        {type:'DECIMAL(10,2)', len: 8, val: tupla[2]},
        {type:'DECIMAL(10,2)', len: 8, val: tupla[3]},
        {type:'DECIMAL(10,2)', len: 8, val: tupla[4]}
      ];
      min_priority.sort((a,b)=> a.len - b.len);
      min_priority.forEach((e)=>{
        insert(e.type,e.len,e.val);
      });
    }
  });

}



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
              const resultBlock = document.createElement("div");
              resultBlock.style.backgroundColor = "lightblue";

              resultBlock.textContent += `Bloque ${bIndex} : `
              bloque.forEach((sector, secIndex) => {
                resultBlock.textContent +=` - Sector ${secIndex}: `
                sector.forEach((elemento) => {
                  if(elemento.length<2){
                    resultBlock.textContent += `Type= pointer, Bytes= 4, Value=${elemento[0]} >>`;
                  }else{
                    resultBlock.textContent += `Type=${elemento[0]}, Bytes=${elemento[1]}, Value=${elemento[2]} >>`;
                  }
                });
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

// Manejo de estado del disco
buttonState.addEventListener("click", () => {
  console.log("Estado del disco:");
  console.log(JSON.stringify(discomagnetico, null, 2));
});