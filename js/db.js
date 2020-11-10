let dbPromised = idb.open("info-epl", 1, upgradeDb => {
  let teamsObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: "id"
  });
  teamsObjectStore.createIndex('name', 'name', {
    unique: false
  });
})

const saveForLater = team => {
  dbPromised
    .then(db => {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      console.log('Data tim berhasil disimpan');
    })
}

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        let tx = db.transaction('teams', 'readonly');
        let store = tx.objectStore('teams');
        return store.getAll();
      })
      .then(teams => {
        resolve(teams);
      })
  })
}

const getById = id => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        let tx = db.transaction('teams', 'readonly');
        let store = tx.objectStore('teams');
        return store.get(id);
      })
      .then(team => {
        resolve(team);
      })
  })
}

const deleteById = id => {
  dbPromised
    .then(db => {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      console.log('Tim Berhasil dihapus')
    })
}