package tn.esprit.spring.focusflare.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Getter
@Setter
@Document(collection = "collaboration_tasks")
@AllArgsConstructor
@NoArgsConstructor
public class CollaborationTask {
  @Id
  private String id; // Change Long to String to align with MongoDB
  private String taskId; // Foreign key reference to Task
  private List<String> userIds; // List of user IDs collaborating
  private String role; // Example: "OWNER", "EDITOR", "VIEWER"
}
