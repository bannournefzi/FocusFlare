package tn.esprit.spring.focusflare.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.spring.focusflare.Model.Employee;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {
  Optional<Employee> findByEmail(String email);
}
