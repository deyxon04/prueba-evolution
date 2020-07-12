import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  public task: any[] = [];
  public tasknotifications: any[] = [];

  public taskCreateForm: FormGroup;
  public taskToEdit: any;
  public isVisible: boolean = false;

  constructor(
    private TaskService: TaskService,
    private _notificationService: NzNotificationService,
    private fb: FormBuilder,
    private _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.createForm();
  }

  private getTasks() {
    this.TaskService.getTask().subscribe(
      (resp: any) => {
        this.task = resp['tasks'];
      },
      (err) => {
        this._notificationService.error('Lo sentimos', err.error['message']);
      }
    );

    this.TaskService.getTaskNotifications().subscribe(
      (resp: any) => {
        this.tasknotifications = resp['tasks'];
        console.log(this.tasknotifications);
      },
      (err) => {
        this._notificationService.error('Lo sentimos', err.error['message']);
      }
    );
  }

  private createForm() {
    this.taskCreateForm = this.fb.group({
      name: [, [Validators.required]],
      priority: [null, [Validators.required]],
      expiration_date: [null, [Validators.required]],
    });
  }

  showModalCreateOrEdit() {
    this.isVisible = true;
  }

  onDeletetask(id: string) {
    this.TaskService.deleteTask(id).subscribe(
      (resp: any) => {
        this.getTasks();
        this._notificationService.success(
          'Excelente',
          'Tarea eliminada correctamente'
        );
      },
      (err) => {
        this._notificationService.error('Lo sentimos', err.error['message']);
      }
    );
  }

  handleCancel() {
    this.isVisible = false;
    this.getTasks();
  }

  onShowEditTask(task) {
    this.isVisible = true;
    this.taskToEdit = task;
    this.taskCreateForm.get('name').setValue(task['name']);
    this.taskCreateForm
      .get('expiration_date')
      .setValue(task['expiration_date']);
    this.taskCreateForm.get('priority').setValue(task['priority']);
  }

  handleOk(): void {
    if (this.taskToEdit) {
      this.TaskService.updateTask(
        this.taskCreateForm.value,
        this.taskToEdit._id
      ).subscribe(
        (resp) => {
          this.getTasks();
          this._notificationService.success(
            'Excelente',
            'Tarea editada correctamente'
          );
          this.taskCreateForm.reset();
          this.isVisible = false;
        },
        (err) => {
          this._notificationService.error('Lo sentimos', err.error['message']);
        }
      );
    } else {
      this.TaskService.createTask(this.taskCreateForm.value).subscribe(
        (resp) => {
          this.getTasks();
          this._notificationService.success(
            'Excelente',
            'Tarea creada correctamente'
          );
          this.taskCreateForm.reset();
          this.isVisible = false;
        },
        (err) => {
          this._notificationService.error('Lo sentimos', err.error['message']);
        }
      );
    }
  }
}
