import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HourstrackComponent } from './hourstrack/hourstrack.component';
import { TimelineComponent } from './timeline/timeline.component';
import { EmployeeLogsComponent } from './employee-logs/employee-logs.component';
import { ScreencastsComponent } from './screencasts/screencasts.component';
import { ProjectComponent } from './projet-list/projet-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { TaskComponent } from './task/task.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { CalandarComponent } from './calandar/calandar.component';
import { CommunicationComponent } from './communication/communication.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ProjectCardComponent,
    AppComponent,
    DashboardComponent,
    AttendanceComponent,
    HourstrackComponent,
    TimelineComponent,
    EmployeeLogsComponent,
    ScreencastsComponent,
    ProjectComponent,
    EmployeeComponent,
    TaskComponent,
    TicketComponent,
    TicketDetailComponent,
    TimesheetComponent,
    CalandarComponent,
    CommunicationComponent,
    ProfileComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

