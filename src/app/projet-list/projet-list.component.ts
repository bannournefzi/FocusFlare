import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
declare var bootstrap: any;

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['../../assets/css/timetracker.style.min.css',
    '../../assets/plugin/light-gallery/css/lightgallery.css'
  ]
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup;
  projects: Project[] = [];
  startedProjects: Project[] = [];
  approvalProjects: Project[] = [];
  completedProjects: Project[] = [];
  selectedProjectId?: string;

  employees: Employee[] = []; // Liste des employés disponibles
  selectedEmployeeId?: string; // ID de l'employé sélectionné pour affectation

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProjects();
    this.loadEmployees(); // Charger les employés disponibles

    // 🔄 Met à jour toutes les 24 heures
    setInterval(() => {
      this.loadProjects();
    }, 86400000); // 24h en millisecondes
  }

  initForm() {
    this.projectForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required],
      priority: ['', Validators.required],
      description: [''],
      progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
      console.log("Projets chargés :", this.projects); // ✅ Vérifier si la liste est bien remplie
    }, error => {
      console.error("Erreur de chargement des projets :", error);
    });
  }
  openAddEmployeeModal() {
    this.loadProjects(); // Charger les projets avant d'ouvrir la modal
    setTimeout(() => {
      console.log("Projets au moment de l'affichage :", this.projects);
      const modal = new bootstrap.Modal(document.getElementById('addemp'));
      modal.show();
    }, 100);
  }



  addEmployeeToProject(employeeId: string) {
    if (this.selectedProjectId) {
      this.projectService.addEmployeeToProject(this.selectedProjectId, employeeId).subscribe(() => {
        this.loadProjects(); // Rafraîchir la liste des projets après ajout
      });
    } else {
      console.error("No project selected!");
    }
  }


  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  // ✅ Affecter un employé à un projet
  assignEmployeeToProject(projectId: string, employeeId: string) {
    if (projectId && employeeId) {
      this.projectService.addEmployeeToProject(projectId, employeeId).subscribe(() => {
        alert('Employé assigné avec succès !');
        this.loadProjects(); // Recharger les projets pour voir les changements
      });
    }
  }

  // 🧭 Filtrer les projets selon leur état
  filterProjects() {
    const today = new Date();

    this.startedProjects = this.projects.filter(
      (p) => new Date(p.startDate) <= today && new Date(p.endDate) >= today
    );

    this.approvalProjects = this.projects.filter(
      (p) => new Date(p.startDate) > today
    );

    this.completedProjects = this.projects.filter(
      (p) => new Date(p.endDate) < today
    );
  }

  // ✅ Créer ou éditer un projet
  onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      if (formValue.id) {
        this.projectService.updateProject(formValue.id, formValue).subscribe(() => {
          this.loadProjects();
          this.resetForm();
        });
      } else {
        this.projectService.createProject(formValue).subscribe(() => {
          this.loadProjects();
          this.resetForm();
        });
      }
    }
  }

  // 🎯 Éditer projet
  onEdit(project: Project) {
    this.selectedProjectId = project.id;
    this.projectForm.patchValue(project);
  }

  // 🗑️ Supprimer projet
  onDelete(id: string | undefined) {
    if (id && confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => this.loadProjects());
    }
  }

  // 🔄 Réinitialiser le formulaire
  resetForm() {
    this.projectForm.reset();
    this.selectedProjectId = undefined;
  }

  calculateDailyProgress(project: Project): number {
    const startDate = new Date(project.startDate).getTime();
    const endDate = new Date(project.endDate).getTime();
    const today = new Date().getTime();

    if (today < startDate) return 0;
    if (today > endDate) return 100;

    const totalDuration = endDate - startDate;
    const elapsedTime = today - startDate;
    const progressPercentage = (elapsedTime / totalDuration) * 100;

    return Math.min(Math.max(progressPercentage, 0), 100);
  }
}
