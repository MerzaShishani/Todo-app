import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any[] = [];

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.taskService.firestoreCollection.valueChanges({idField : 'id'})
    .subscribe(tasks => {
      this.tasks = tasks.sort( (a:any,b:any)=> a.isDone - b.isDone);
    })
  }

  addTask(task: HTMLInputElement){
    if(task.value){
      this.taskService.addTask(task.value);
      task.value = "";
    }
  }

  updateStatus(id: string, newStatus: boolean){
    this.taskService.updateStatus(id, newStatus);
  }

  onDelete(id: string){
    this.taskService.deleteTask(id);
  }

}
