const butonS = document.getElementById("searchB");

let searchv;
butonS.addEventListener('click',()=>{
    searchv = document.getElementById('searchT').value;
    alert(searchv);
    console.log(searchv);
});

let discomagnetico = [[[[]]],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

let t;
let b;
let v;
const butonI = document.getElementById("insertionB");
butonI.addEventListener('click',()=>{
    t = document.getElementById('type');
    b = document.getElementById('bytes');
    v = document.getElementById('value');

    discomagnetico[0][0][0].push(t.value,b.value,v.value);
    console.log(discomagnetico[0][0][0]);
    t.value = ' ';
    b.value = ' ';
    v.value = ' ';
});