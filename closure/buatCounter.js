/*
copntoh clousre buat counter


*/

//function luar ( Outer Function) menyimpan Variable  yang akan "di tutup "

function buatCounter() {
  let hitung = 0; //hitung variable private
  return {
    //method2 hitung ( increment dan decrement)
    tambah: () => ++hitung, //incremenet
    kurang: () => --hitung, //decremenet
    getHitung: () => hitung, //nilai hitung stlah increment atau decrement
  };
}

//sekarang buat vatiable utk invoke

const counter = buatCounter();
counter.tambah(); // hitung = 1
counter.tambah(); //hitung = 2 ( naik isi var hitung)

console.log(counter.getHitung()); //kita print isi hitung sekarang

//DISINI hitung sbgai variable tidak bisa diakses dia scope private
//variable hitung masih tetap hidup meski counter vriable slesai di keskusi
// `hitung` TIDAK bisa diakses langsung! Enkapsulasi terjaga.
