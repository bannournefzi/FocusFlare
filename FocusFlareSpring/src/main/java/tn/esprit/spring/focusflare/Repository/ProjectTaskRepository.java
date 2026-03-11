package tn.esprit.spring.focusflare.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.spring.focusflare.Model.ProjectTask;
import java.util.List;


public interface ProjectTaskRepository extends MongoRepository<ProjectTask, String> {
  List<ProjectTask> findByProjectId(String projectId);

}
