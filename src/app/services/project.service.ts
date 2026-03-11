import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.service';


// Interface du modèle Project
export interface Project {
  id?: string;
  name: string;
  category: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  priority: string;
  description?: string;
  progress: number;
  employees: Employee[];


}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'http://localhost:8080/api/projects'; // Endpoint de ton backend

  constructor(private http: HttpClient) {}

  // 🔄 Récupérer tous les projets (READ)
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }


  // 📝 Créer un nouveau projet (CREATE)
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  // 🖋️ Mettre à jour un projet existant (UPDATE)
  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, project);
  }

  // ❌ Supprimer un projet (DELETE)
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // 🔎 Récupérer un projet par son ID (READ spécifique)
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  // ✅ Méthode pour affecter un employé à un projet
addEmployeeToProject(projectId: string, employeeId: string): Observable<Project> {
  return this.http.post<Project>(`${this.baseUrl}/${projectId}/addEmployee/${employeeId}`, {});
}

}
