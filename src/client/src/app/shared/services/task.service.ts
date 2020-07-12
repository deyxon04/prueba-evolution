import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

const USER_AUTH_API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _authService: AuthenticationService
  ) {
    this.headers = new HttpHeaders({
      Authorization: this._authService.currentToken,
    });
  }

  getTask() {
    return this.http.get(USER_AUTH_API_URL + 'task', { headers: this.headers });
  }

  deleteTask(id) {
    return this.http.delete(USER_AUTH_API_URL + 'task/' + id, {
      headers: this.headers,
    });
  }

  createTask(task) {
    return this.http.post(USER_AUTH_API_URL + 'task', task, {
      headers: this.headers,
    });
  }

  updateTask(task, id) {
    return this.http.put(USER_AUTH_API_URL + 'task/' + id, task, {
      headers: this.headers,
    });
  }

  getTaskNotifications() {
    return this.http.get(USER_AUTH_API_URL + 'task/notifications', {
      headers: this.headers,
    });
  }
}
