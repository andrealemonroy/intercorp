import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {

    
  }

  getUser(userKey){
    return this.db.collection('items').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('items').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('items').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('items').valueChanges();
  }

  createUser(value, nac){
    return this.db.collection('items').add({
      nombre: value.name,
      apellido: value.surname,
      edad: value.age,
      age: nac
    });
  }
}