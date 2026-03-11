package tn.esprit.spring.focusflare.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@Data
@Getter
@Setter
@Document(collection = "project_tasks")
@AllArgsConstructor
@NoArgsConstructor
public class ProjectTask {
  @Id
  private String id;
  private String title;
  private String description;
  private int priority;
  private Date deadline;
  private boolean completed;
  private String projectId;
}
