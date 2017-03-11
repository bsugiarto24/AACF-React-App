import * as firebase from './firebase';
import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from './actions/items'

import config from 'config'

const firebaseApp = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket
})

export const itemsRef = firebaseApp.database().ref('items')
const connectedRef = firebaseApp.database().ref('.info/connected')

export function syncFirebase(store) {
  itemsRef.on('child_added', (snapshot) => {
    store.dispatch(addItemSuccess(snapshot.val()))
  })

  itemsRef.on('child_removed', (snapshot) => {
    store.dispatch(removeItemSuccess(snapshot.val().id))
  })

  connectedRef.on('value', snap => {
    if (snap.val() === true) {
      store.dispatch(goOnline())
    } else {
      store.dispatch(goOffline())
    }
  })
}
