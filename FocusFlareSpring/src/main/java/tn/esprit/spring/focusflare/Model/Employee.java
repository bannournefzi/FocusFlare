package tn.esprit.spring.focusflare.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "employees") // Déclare la collection MongoDB
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Employee {

  @Id
  private String id;
  private String employeeName;
  private String employeeCompany;
  private LocalDate joiningDate;
  private String username;
  private String password;
  private String email;
  private String phone;
  private String department;
  private String designation;
  private String description;
  private List<String> permissions;
  private String project;

}
