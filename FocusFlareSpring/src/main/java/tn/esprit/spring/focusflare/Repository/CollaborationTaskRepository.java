package tn.esprit.spring.focusflare.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.spring.focusflare.Model.CollaborationTask;

public interface CollaborationTaskRepository extends MongoRepository<CollaborationTask, String> { // Change Long to String
  CollaborationTask findByTaskId(String taskId);
}
