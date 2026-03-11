package tn.esprit.spring.focusflare.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.spring.focusflare.Model.ProjectTask;
import tn.esprit.spring.focusflare.Service.ProjectTaskService;

import java.util.List;

@RestController
@RequestMapping("/api/project-tasks")
public class ProjectTaskController {

  @Autowired
  private ProjectTaskService taskService;

  @GetMapping
  public List<ProjectTask> getAllTasks() {
    return taskService.getAllTasks();
  }

  @GetMapping("/project/{projectId}")
  public List<ProjectTask> getTasksByProject(@PathVariable String projectId) {
    return taskService.getTasksByProject(projectId);
  }
  @PostMapping
  public ProjectTask createTask(@RequestBody ProjectTask task) {
    return taskService.createTask(task);
  }
  @GetMapping("/{id}")
  public ResponseEntity<ProjectTask> getTaskById(@PathVariable String id) {
    return taskService.getTaskById(id)
      .map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProjectTask> updateTask(@PathVariable String id, @RequestBody ProjectTask taskDetails) {
    ProjectTask updatedTask = taskService.updateTask(id, taskDetails);
    return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable String id) {
    taskService.deleteTask(id);
    return ResponseEntity.noContent().build();
  }
}
