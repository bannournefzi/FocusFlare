package tn.esprit.spring.focusflare.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.spring.focusflare.Model.Employee;
import tn.esprit.spring.focusflare.Model.Project;
import tn.esprit.spring.focusflare.Repository.EmployeeRepository;
import tn.esprit.spring.focusflare.Repository.ProjectRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

  @Autowired
  private EmployeeRepository employeeRepository;
  @Autowired
  private ProjectRepository projectRepository;

  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  public Project createProject(Project project) {
    return projectRepository.save(project);
  }

  public Optional<Project> getProjectById(String id) {
    return projectRepository.findById(id);
  }

  public Project updateProject(String id, Project projectDetails) {
    return projectRepository.findById(id)
      .map(project -> {
        project.setName(projectDetails.getName());
        project.setCategory(projectDetails.getCategory());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        project.setBudget(projectDetails.getBudget());
        project.setPriority(projectDetails.getPriority());
        project.setDescription(projectDetails.getDescription());
        return projectRepository.save(project);
      })
      .orElse(null);
  }

  public void deleteProject(String id) {
    projectRepository.deleteById(id);
  }
  public Project addEmployeeToProject(String projectId, String employeeId) {
    Optional<Project> optionalProject = projectRepository.findById(projectId);
    Optional<Employee> optionalEmployee = employeeRepository.findById(employeeId);

    if (optionalProject.isPresent() && optionalEmployee.isPresent()) {
      Project project = optionalProject.get();
      Employee employee = optionalEmployee.get();

      // ✅ Vérifier si la liste `employees` est null et l'initialiser
      if (project.getEmployees() == null) {
        project.setEmployees(new ArrayList<>());
      }

      // ✅ Vérifier si l'employé est déjà assigné au projet
      if (!project.getEmployees().contains(employee)) {
        project.getEmployees().add(employee);
        return projectRepository.save(project);
      } else {
        throw new RuntimeException("Employee already assigned to this project.");
      }
    } else {
      throw new RuntimeException("Project or Employee not found.");
    }
  }
}
