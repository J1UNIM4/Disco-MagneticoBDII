const butonS = document.getElementById("searchB");


let discomagnetico = [[[[[]]]]];
//CAPACIDADES
//disco
let discoC = 16;
//superficie;
let superficieC = 16384;
// pista
let pistaC = 32;
// bloque
let bloqueC = 2;
// sectores
let sectoresC = 4096;
let totalbytesS = 0;

//valores del elemento type-byte-v
let t;
let b;
let v;
const butonI = document.getElementById("insertionB");
butonI.addEventListener('click',()=>{
    t = document.getElementById('type');
    b = document.getElementById('bytes');
    v = document.getElementById('value');

    let indexs = discomagnetico.length-1;
    let indexp = discomagnetico[indexs].length-1;
    let indexb = discomagnetico[indexs][indexp].length-1;
    let indexsect = discomagnetico[indexs][indexp][indexb].length-1;

    //Verificamos si llenamos el sector
    if (totalbytesS + parseInt(b.value) >= sectoresC) {
        //sector lleno
        let rest = sectoresC - totalbytesS;
        discomagnetico[indexs][indexp][indexb][indexsect].push([(totalbytesS + b.value > sectoresC),t.value,rest,v.value]);
        indexsect++;
        //Aun tenemos espacio en el bloque?
        if (indexsect == bloqueC) {
            alert('entro al bloque');
            indexsect = 0;
            indexb++;
            //Aun tenemos espacio en la pista?
            if (discomagnetico[indexs][indexp].length == pistaC) {
                alert('entro a las pistas');
                indexp++;
                indexb = 0;
                //Aun tenemos espacio en la superficie?
                if (discomagnetico[indexs].length == superficieC) {
                    indexp = 0;
                    //Hay espacio aun en el disco?
                    if (discomagnetico.length == discoC) {
                        alert('error no hay mas espacio :c');
                    }
                    //anadimos una nueva superficie al disco
                    discomagnetico.push([]);
                    indexs++;
                }
                //anadimos nueva pista a la superficie
                discomagnetico[indexs].push([]);
            }
            //anadimos un nuevo bloque a la pista
            discomagnetico[indexs][indexp].push([]);            
        }

        //pusheamos nuevo sector
        discomagnetico[indexs][indexp][indexb].push([]);

        //pusheamos el resto del elemento  en el nuevo sector
        if (totalbytesS + parseInt(b.value) > sectoresC) {
            //pusheamos
            discomagnetico[indexs][indexp][indexb][indexsect].push([true,t.value,b.value-rest,v.value]);
        }
        
        //seteamos a 0 la nueva capacidad del sector
        totalbytesS = parseInt(b.value)-rest;
    }else{ 
        discomagnetico[indexs][indexp][indexb][indexsect].push([false,t.value,b.value,v.value]);
        totalbytesS += parseInt(b.value);
    }
    console.log(discomagnetico[indexs][indexp][indexb]);
    t.value = ' ';
    b.value = ' ';
    v.value = ' ';

    /*
   
    discomagnetico[indexs][indexp][indexb][indexsect].push([false,t.value,b.value,v.value]);
    
    
    discomagnetico[indexs][indexp][indexb].push([[]]);
    alert('len del disco ' + discomagnetico.length);
    alert('len de la superficie ' + discomagnetico[indexs].length);
    alert('len de la pista ' + discomagnetico[indexs][indexp].length);
    alert('len deel bloque ' + discomagnetico[indexs][indexp][indexb].length);
    alert('len del sector ' + discomagnetico[indexs][indexp][indexb][indexsect].length);  */

});

butonS.addEventListener('click',()=>{
    let indexs = discomagnetico.length-1;
    let indexp = discomagnetico[indexs].length-1;
    let indexb = discomagnetico[indexs][indexp].length-1;
    let indexsect = discomagnetico[indexs][indexp][indexb].length-1;
    let val = document.getElementById('searchT').value;
    if('jossein'==val){
        alert('empieza la busqueda de '+ val);
    }
    let bytes = 0;
    for (let i = 0; i <indexs+1; i++) {
        for (let j = 0; j < indexp + 1; j++) {
            for (let k = 0; k < indexb + 1; k++) {
                for (let s = 0; s <indexsect + 1; s++) {
                    for (let g = 0; g < discomagnetico[i][j][k][s].length; g++) {
                        if(discomagnetico[i][j][k][s][g][3] == val){
                            alert('encontrado ' + discomagnetico[i][j][k][s][g][3]);
                        }                        
                    }
                }
            }
        }
    }
});

const buttonState = document.getElementById('statusB');
buttonState.addEventListener('click',()=>{
    console.log("Estado del disco:");
    console.log(`Superficies usadas: ${this.lenDisk + 1}/${DiscoMagnetico.CAPACITY}`);
    for (let i = 0; i <= this.lenDisk; i++) {
        console.log(`Superficie ${i + 1}:`);
        console.log(`  Pistas usadas: ${this.disco[i].len}/${Superficie.CAPACITY}`);
        for (let j = 0; j < this.disco[i].len; j++) {
            console.log(`  Pista ${j + 1}:`);
            console.log(`    Sectores usados: ${this.disco[i].pistas[j].len}/${Pista.CAPACITY}`);
            for (let k = 0; k < this.disco[i].pistas[j].len; k++) {
                console.log(`    Sector ${k + 1}: ${this.disco[i].pistas[j].sectores[k].used}/${Sector.CAPACITY} bytes usados`);
            }
        }
    }
});