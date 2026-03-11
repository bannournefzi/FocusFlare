import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Project } from '../models/project.model';

declare var bootstrap: any; // Import de Bootstrap pour gérer la modal

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Output() edit = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<string>();

  selectedProject: Project | null = null; // ✅ Déclaration de `selectedProject`

  constructor() {}

  ngOnInit() {}

  onEdit() {
    this.edit.emit(this.project);
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this project?')) {
      this.delete.emit(this.project.id);
    }
  }

  // ✅ Méthode pour ouvrir la modal et afficher les détails du projet
  openDetailsModal(project: Project) {
    this.selectedProject = project;
    let modal = new bootstrap.Modal(document.getElementById('projectDetailsModal'));
    modal.show();
  }
}
