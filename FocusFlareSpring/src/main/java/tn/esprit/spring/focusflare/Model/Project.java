package tn.esprit.spring.focusflare.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@Document(collection = "projects")
@AllArgsConstructor
@NoArgsConstructor

public class Project {
  @Id
  private String id;
  private String name;
  private String category;
  private Date startDate;
  private Date endDate;
  private double budget;
  private String priority;
  private String description;
  private int progress;
  private List<Employee> employees = new ArrayList<>(); // ✅ Assure que la liste est toujours initialisée

  public List<Employee> getEmployees() {
    if (employees == null) {
      employees = new ArrayList<>(); // ✅ Empêche tout NullPointerException
    }
    return employees;
  }

  public void setEmployees(List<Employee> employees) {
    this.employees = (employees != null) ? employees : new ArrayList<>();
  }
}
