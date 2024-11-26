const butonS = document.getElementById("searchB");

let searchv;
butonS.addEventListener('click',()=>{
    searchv = document.getElementById('searchT').value;
    alert(searchv);
    console.log(searchv);
});

let discomagnetico = [[[[[]]]]];
//CAPACIDADES
//disco
let discoC = 16;
//superficie;
let superficieC = 16384;
// pista
let pistaC = 32;
// bloque
let bloqueC = 4;
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

    let indexd = discomagnetico.length-1;
    let indexS = discomagnetico[indexd].length-1;
    let indexp = discomagnetico[indexd][indexS].length-1;
    let indexb = discomagnetico[indexd][indexS][indexp].length-1;

    /*//Verificamos si llenamos el sector
    if (totalbytesS + b.value >= sectoresC) {
        //sector lleno
        let rest = sectoresC - totalbytesS;
        discomagnetico[indexd][indexS][indexp][indexb].push([(totalbytesS + b.value > sectoresC),t.value,rest,v.value]);

        //Aun tenemos espacio en el bloque?
        if (discomagnetico[indexd][indexS][indexp].length == bloqueC) {

            //Aun tenemos espacio en la pista?
            if (discomagnetico[indexd][indexS].length == pistaC) {

                //Aun tenemos espacio en la superficie?
                if (discomagnetico[indexd].length == superficieC) {
                    
                    //Hay espacio aun en el disco?
                    if (discomagnetico.length == discoC) {
                        alert('error no hay mas espacio :c');
                    }
                    //anadimos una nueva superficie al disco
                    discomagnetico.push([[[[]]]]);
                    //seteamos a 0 la capacidad de la superficie
                    superficieC = 0;
                    indexd = discomagnetico.length-1;
                }
                //anadimos nueva pista a la superficie
                discomagnetico[indexd].push([[[]]]);
                //seteamos a 0 la capacidad de la pista
                pistaC = 0;
                indexS = discomagnetico[indexd].length-1;
            }
            //anadimos un nuevo bloque a la pista
            discomagnetico[indexd][indexS].push([[]]);
            //seteamos a 0 la capacidad del bloque
            bloqueC = 0;
            //colocamos el indice en la posicion que le corresponde
            indexp = discomagnetico[indexd][indexS].length-1;
        }

        //pusheamos un nuevo sector
        discomagnetico[indexd][indexS][indexp].push([]);
        //seteamos a 0 la nueva capacidad del sector
        totalbytesS = 0;

        //pusheamos el resto del elemento  en el nuevo sector
        if (totalbytesS + b.value > sectoresC) {
            //colocamos el indice en la posicion que le corresponde
            indexb = discomagnetico[indexd][indexS][indexp].length-1;
            alert(indexb);
            //pusheamos
            discomagnetico[indexd][indexS][indexp][indexb].push([true,t.value,b-rest,v.value]);
        }
    }else{ 
        discomagnetico[indexd][indexS][indexp][indexb].push([false,t.value,b.value,v.value]);
    }
    */
    discomagnetico[indexd][indexS][indexp][indexb].push([false,t.value,b.value,v.value]);
    console.log(discomagnetico[0][0][0][0]);
    t.value = ' ';
    b.value = ' ';
    v.value = ' ';
    //alert('len del disco ' + discomagnetico.length);
    //alert('len de la superficie ' + discomagnetico[0].length);
    //alert('len de la pista ' + discomagnetico[0][0].length);
    //alert('len deel bloque ' + discomagnetico[0][0][0].length);
    //alert('len del sector ' + discomagnetico[0][0][0][0].length);
});