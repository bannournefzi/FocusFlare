import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HourstrackComponent } from './hourstrack/hourstrack.component';
import { TimelineComponent } from './timeline/timeline.component';
import { EmployeeLogsComponent } from './employee-logs/employee-logs.component';
import { ScreencastsComponent } from './screencasts/screencasts.component';
import { ProjectComponent} from './projet-list/projet-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { TaskComponent } from './task/task.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { CalandarComponent } from './calandar/calandar.component';

import { CommunicationComponent } from './communication/communication.component';
import { ProfileComponent } from './profile/profile.component';

// Définir les routes
const routes: Routes = [
  { path: '', component: DashboardComponent }, // La route pour la page Dashboard (par défaut)
  { path: 'attendance', component: AttendanceComponent },
  { path: 'hourstrack', component: HourstrackComponent },
  { path: 'timeline', component: TimelineComponent },
  {path : 'employee-logs',component: EmployeeLogsComponent},
  {path: 'screencasts',component:ScreencastsComponent},
  {path: 'projet-list',component:ProjectComponent },
  {path:'employee',component:EmployeeComponent},
  {path:'task',component:TaskComponent},
  {path:'ticket',component:TicketComponent},
  {path:'ticket-detail',component:TicketDetailComponent},
  {path:'timesheet',component:TimesheetComponent},
  {path:'Calandar',component:CalandarComponent},
  {path:'chat',component:CommunicationComponent},
  {path:'profile',component:ProfileComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Charger les routes dans le module
  exports: [RouterModule] // Exporter les routes pour les utiliser dans l'application
})
export class AppRoutingModule { }
