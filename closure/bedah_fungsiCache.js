function contohCache() {
  const cache = {};

  return function (n) {
    if (n in cache) {
      console.log(` jalankan inner function ,Cach hitung utk ${n}`);

      return cache[n];
    }
    console.log(` kalang luar menghitung utk n = ${n} `);
    const hasil = n * 2; //kalkucalis expnesive func
    cache[n] = hasil; // jadi nilai n adalah key , dan hasil adalah isinya
    //jadi dalam cache  akan jadj {n:hasil,...n-1 :hasil-1, dst..}
    console.log(`isi cache =`, cache);
    return hasil;
  };
}

const fungsiCache = contohCache();

console.log("saat kasih 8 maka =", fungsiCache(8)); //menghitung 10
console.log("saat kasih 8 yg berikutnya maka =", fungsiCache(8)); //menghitung 10
console.log("saat kasih 8 yg berikutnya ke 3 maka =", fungsiCache(8)); //menghitung 10
console.log("\n");
console.log("saat kasih 12 maka", fungsiCache(12));
console.log("saat kasih 12 yg berikutnya maka ", fungsiCache(12));

/*
hasik oada saat dijalankan :
[indra@indra-Aspire-A515-58M:closure ] $ node bedah_fungsiCache.js
 kalang luar menghitung utk n = 8 
isi cache = { '8': 16 }
saat kasih 8 maka = 16
 jalankan inner function ,Cach hitung utk 8
saat kasih 8 yg berikutnya maka = 16
 jalankan inner function ,Cach hitung utk 8
saat kasih 8 yg berikutnya ke 3 maka = 16




*/
