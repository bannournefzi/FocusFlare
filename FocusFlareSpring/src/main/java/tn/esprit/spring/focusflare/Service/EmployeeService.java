package tn.esprit.spring.focusflare.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.spring.focusflare.Model.Employee;
import tn.esprit.spring.focusflare.Repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

  private final EmployeeRepository employeeRepository;

  public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
  }

  public Optional<Employee> getEmployeeById(String id) {
    return employeeRepository.findById(id);
  }

  public Employee createEmployee(Employee employee) {
    return employeeRepository.save(employee);
  }

  public Employee updateEmployee(String id, Employee updatedEmployee) {
    return employeeRepository.findById(id).map(employee -> {
      employee.setEmployeeName(updatedEmployee.getEmployeeName());
      employee.setEmployeeCompany(updatedEmployee.getEmployeeCompany());
      employee.setJoiningDate(updatedEmployee.getJoiningDate());
      employee.setUsername(updatedEmployee.getUsername());
      employee.setPassword(updatedEmployee.getPassword());
      employee.setEmail(updatedEmployee.getEmail());
      employee.setPhone(updatedEmployee.getPhone());
      employee.setDepartment(updatedEmployee.getDepartment());
      employee.setDesignation(updatedEmployee.getDesignation());
      employee.setDescription(updatedEmployee.getDescription());
      employee.setPermissions(updatedEmployee.getPermissions());
      return employeeRepository.save(employee);
    }).orElseThrow(() -> new RuntimeException("Employee not found"));
  }

  public void deleteEmployee(String id) {
    employeeRepository.deleteById(id);
  }
}
