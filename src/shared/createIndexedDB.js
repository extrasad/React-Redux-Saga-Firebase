import idb from 'idb'

const createIndexedDB = () => {
  if (!('indexedDB' in window)) {return null;}
  return idb.open('burger-app', 1, function(upgradeDb) {
    ['orders', 'ingredients'].forEach(store => {
      if (!upgradeDb.objectStoreNames.contains(store)) {
        upgradeDb.createObjectStore(store, {keyPath: 'id'})
      }
    });
  });
}

export default createIndexedDB