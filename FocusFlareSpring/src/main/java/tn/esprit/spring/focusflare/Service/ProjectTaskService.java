package tn.esprit.spring.focusflare.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.spring.focusflare.Model.ProjectTask;
import tn.esprit.spring.focusflare.Repository.ProjectTaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectTaskService {
  @Autowired
  private ProjectTaskRepository taskRepository;

  public List<ProjectTask> getAllTasks() {
    return taskRepository.findAll();
  }

  public List<ProjectTask> getTasksByProject(String projectId) {
    return taskRepository.findByProjectId(projectId);
  }

  public ProjectTask createTask(ProjectTask task) {
    return taskRepository.save(task);
  }

  public Optional<ProjectTask> getTaskById(String id) {
    return taskRepository.findById(id);
  }

  public ProjectTask updateTask(String id, ProjectTask taskDetails) {
    return taskRepository.findById(id).map(task -> {
      task.setTitle(taskDetails.getTitle());
      task.setDescription(taskDetails.getDescription());
      task.setPriority(taskDetails.getPriority());
      task.setDeadline(taskDetails.getDeadline());
      task.setCompleted(taskDetails.isCompleted());
      return taskRepository.save(task);
    }).orElse(null);
  }

  public void deleteTask(String id) {
    taskRepository.deleteById(id);
  }
}
