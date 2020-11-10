// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(() => {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", () => {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get('saved');

  let btnFav = document.getElementById('save');
  let btnDel = document.getElementById('delete');
  let item = getTeamsById();

  if(isFromSaved){
    btnFav.style.display = 'none';
    getSavedTeamById();
  }
  else{
    btnDel.style.display = 'none';
    item = getTeamsById();
  }
  
  btnFav.onclick = () =>{
    console.log("Berhasil di klik");
    item.then(team=>{
      saveForLater(team);
      alert('Berhasil menambahkan ke daftar tim favorit!');
      window.location.href = "index.html#savedTeams";
    })
  }


  btnDel.onclick = () => {
    console.log('Tombol hapus berhasil di klik');
    item.then(team => {
      if(confirm("Anda yakin ingin menghapusnya ?")){
        deleteById(team.id);
        alert('Berhasil menghapus dari daftar tim favorit!');
        window.location.href = "index.html#savedTeams";
      }
    })
  }
});