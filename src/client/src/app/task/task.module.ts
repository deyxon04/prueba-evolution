import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

/** Import any ng-zorro components as the module required except icon module */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TaskService } from '../shared/services/task.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableModule, NzFormModule, NzModalModule, NzDatePickerModule, NzInputModule, NzSelectModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ReactiveFormsModule } from '@angular/forms';

/** Assign all ng-zorro modules to this array*/
const antdModule = [NzButtonModule, NzTableModule, NzSpaceModule, NzFormModule,NzModalModule,NzDatePickerModule,NzInputModule, NzSelectModule];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ...antdModule,
  ],
  exports: [],
  declarations: [TaskComponent],
  providers: [TaskService, AuthenticationService, NzNotificationService],
})
export class TaskModule {}
