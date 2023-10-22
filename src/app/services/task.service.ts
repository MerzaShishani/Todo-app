import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) { 
    this.firestoreCollection = firestore.collection('tasks');
  }

  addTask(task: string){
    this.firestoreCollection.add({
      task: task,
      isDone: false
    })
  }

  updateStatus(id: string, newStatus: boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus});
  }

  deleteTask(id:string){
    this.firestoreCollection.doc(id).delete();
  }
}
