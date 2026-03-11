package tn.esprit.spring.focusflare.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.spring.focusflare.Model.CollaborationTask;
import tn.esprit.spring.focusflare.Service.CollaborationTaskService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/collaboration-tasks")
public class CollaborationTaskController {
  @Autowired
  private CollaborationTaskService collaborationTaskService;

  // Get all collaboration tasks
  @GetMapping
  public List<CollaborationTask> getAllCollaborationTasks() {
    return collaborationTaskService.getAllCollaborationTasks();
  }

  // Get a collaboration task by taskId
  @GetMapping("/task/{taskId}")
  public ResponseEntity<CollaborationTask> getCollaborationTaskByTaskId(@PathVariable String taskId) {
    Optional<CollaborationTask> task = collaborationTaskService.getCollaborationTaskByTaskId(taskId);
    return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  // Create a new collaboration task
  @PostMapping
  public CollaborationTask createCollaborationTask(@RequestBody CollaborationTask task) {
    return collaborationTaskService.createCollaborationTask(task);
  }

  // Delete a collaboration task
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCollaborationTask(@PathVariable String id) { // Change Long to String
    collaborationTaskService.deleteCollaborationTask(id);
    return ResponseEntity.noContent().build();
  }
}
