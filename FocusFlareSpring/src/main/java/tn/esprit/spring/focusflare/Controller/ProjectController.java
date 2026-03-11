package tn.esprit.spring.focusflare.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.spring.focusflare.Model.Project;
import tn.esprit.spring.focusflare.Service.ProjectService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/projects") // 👉 Correspond au frontend
public class ProjectController {

  @Autowired
  private ProjectService projectService;

  @GetMapping
  public List<Project> getAllProjects() {
    return projectService.getAllProjects();
  }

  @PostMapping
  public Project createProject(@RequestBody Project project) {
    return projectService.createProject(project);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Project> getProjectById(@PathVariable String id) {
    return projectService.getProjectById(id)
      .map(project -> {
        if (project.getEmployees() == null) {
          project.setEmployees(new ArrayList<>()); // ✅ Empêche le null côté frontend
        }
        return ResponseEntity.ok(project);
      })
      .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project projectDetails) {
    Project updatedProject = projectService.updateProject(id, projectDetails);
    return updatedProject != null ? ResponseEntity.ok(updatedProject) : ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProject(@PathVariable String id) {
    projectService.deleteProject(id);
    return ResponseEntity.noContent().build();
  }

  // ✅ Endpoint pour affecter un employé existant à un projet
  @PostMapping("/{projectId}/addEmployee/{employeeId}")
  public ResponseEntity<Project> addEmployeeToProject(@PathVariable String projectId, @PathVariable String employeeId) {
    Project updatedProject = projectService.addEmployeeToProject(projectId, employeeId);
    return updatedProject != null ? ResponseEntity.ok(updatedProject) : ResponseEntity.notFound().build();
  }

}
