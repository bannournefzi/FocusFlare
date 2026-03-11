import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../services/employee.service';
import { ProjectService, Project } from '../services/project.service';

@Component({
  selector: 'app-employee-logs',
  templateUrl: './employee-logs.component.html',
  styleUrls: ['./employee-logs.component.css']
})
export class EmployeeLogsComponent implements OnInit {
  employees: Employee[] = [];
  projects: Project[] = []; 

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService // ✅ Ajouter le service des projets
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadProjects(); // ✅ Charger les projets au démarrage
  }

  // Charger les employés
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  //  Charger les projets
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe((data: Project[]) => {
      this.projects = data;
      console.log("✅ Projets chargés :", this.projects);
    }, (error) => {
      console.error("🚨 Erreur lors du chargement des projets :", error);
    });
  }

  // ✅ Modifier la fonction pour gérer `undefined`
  getProjectName(projectId: string | undefined): string {
    if (!projectId) return 'N/A'; // 🔹 Gérer le cas où projectId est `undefined`
    const project = this.projects.find((p: Project) => p.id === projectId);
    return project ? project.name : 'N/A';
  }
}
