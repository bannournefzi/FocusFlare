package tn.esprit.spring.focusflare.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.spring.focusflare.Model.CollaborationTask;
import tn.esprit.spring.focusflare.Repository.CollaborationTaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CollaborationTaskService {
  @Autowired
  private CollaborationTaskRepository collaborationTaskRepository;

  public List<CollaborationTask> getAllCollaborationTasks() {
    return collaborationTaskRepository.findAll();
  }

  public CollaborationTask createCollaborationTask(CollaborationTask task) {
    return collaborationTaskRepository.save(task);
  }

  public Optional<CollaborationTask> getCollaborationTaskByTaskId(String taskId) {
    return Optional.ofNullable(collaborationTaskRepository.findByTaskId(taskId));
  }

  public void deleteCollaborationTask(String id) { // Change Long to String
    collaborationTaskRepository.deleteById(id);
  }
}
