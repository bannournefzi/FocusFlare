import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from './../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any; // Pour gérer les modals en TypeScript
import { ProjectService, Project } from './../services/project.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  employees: Employee[] = [];
  projects: Project[] = [];
  newEmployee: Employee = {
    employeeName: '',
    employeeCompany: '',
    joiningDate: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    description: '',
    permissions: [],


  };
  editing: boolean = false;
  selectedEmployeeId: string | null = null;
  showModal: boolean = false;
  filteredEmployees: Employee[] = [];
  searchTerm: string = ''; // Terme de recherche
  itemsPerPage: number = 10; // Par défaut, afficher 10 éléments

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private projectService: ProjectService
) {}

ngOnInit() {
  this.initForm();
  this.loadEmployees();
  this.loadProjects();
}

initForm() {
  this.employeeForm = this.fb.group({
    employeeName: ['', Validators.required],
    employeeCompany: ['', Validators.required],
    joiningDate: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    department: [''],
    designation: [''],
    description: [''],
    project: ['', Validators.required],  // Assurez-vous qu'il y a des projets disponibles avant de valider ce champ
    permissions: [[]]
  });
  console.log("🟢 Formulaire initialisé :", this.employeeForm.value);


    this.openModal();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data; // Initialise la liste filtrée

    });

  }

  addEmployee() {
    console.log("ℹ️ Validation Formulaire :", this.employeeForm.valid);
    console.log("📌 Valeurs du formulaire :", this.employeeForm.value);

    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (response) => {
          console.log("✅ Employé ajouté :", response);
          this.loadEmployees(); // Recharge la liste après l'ajout
          this.closeModal('addemp');
          this.employeeForm.reset(); // Réinitialise le formulaire après ajout
        },
        error: (err) => {
          console.error("❌ Erreur lors de l'ajout :", err);
          alert("Erreur lors de l'ajout de l'employé !");
        }
      });
    } else {
      console.warn("⚠️ Formulaire invalide, vérifiez les champs obligatoires !");
    }
  }



   editEmployee(employee: Employee) {
    this.selectedEmployeeId = employee.id!;
    this.employeeForm.patchValue(employee);

    let modal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
    modal.show();
  }

  updateEmployee() {
    if (this.selectedEmployeeId && this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.selectedEmployeeId, this.employeeForm.value).subscribe(() => {
        this.loadEmployees();
        this.closeModal('editEmployeeModal');
      });
    } else {
      alert('Erreur : formulaire invalide.');
    }
  }
  loadProjects() {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log("✅ Projets chargés :", this.projects);
      },
      (error) => {
        console.error("🚨 Erreur lors du chargement des projets :", error);
      }
    );
  }


  openAddEmployeeModal() {
  this.loadProjects();

  setTimeout(() => {
    console.log("📢 Projets disponibles :", this.projects);
    if (this.projects.length === 0) {
      console.warn("⚠️ Aucun projet trouvé !");
    }

    // Réinitialiser le formulaire AVANT d'afficher la modal
    this.employeeForm.reset({
      employeeName: '',
      employeeCompany: '',
      joiningDate: '',
      username: 'default_user',
      password: '123456',
      email: '',
      phone: '',
      department: '',
      designation: '',
      description: '',
      project: '',  // Projet obligatoire
      permissions: []
    });

    const modalElement = document.getElementById('addemp');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("🚨 Impossible de trouver la modal 'addemp'");
    }
  }, 200);
}








  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }
  filterEmployees() {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.project?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetForm() {
    this.newEmployee = {
      employeeName: '',
      employeeCompany: '',
      joiningDate: '',
      username: 'default_user',
      password: '123456',
      email: '',
      phone: '',
      department: '',
      designation: '',
      description: '',
      permissions: []
    };
    this.editing = false;
    this.selectedEmployeeId = null;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal(modalId: string) {
    let modalElement = document.getElementById(modalId);
    if (modalElement) {
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }
  updatePagination() {
    this.filteredEmployees = this.employees.slice(0, this.itemsPerPage);
  }
}
