package tn.esprit.spring.focusflare.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.spring.focusflare.Model.Project;

public interface ProjectRepository extends MongoRepository<Project, String> {
}
