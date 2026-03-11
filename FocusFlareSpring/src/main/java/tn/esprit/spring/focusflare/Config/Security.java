package tn.esprit.spring.focusflare.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // ✅ Add this to make it a Spring configuration
public class Security { // ✅ Rename to a more conventional name

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable()) //  CSRF protection disabled (only do this if necessary)
      .authorizeHttpRequests(auth -> auth
        // ✅ Allow Swagger UI access without authentication
        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**").permitAll()

        // ✅ Allow access to the specific API endpoints
        .requestMatchers("/api/project-tasks/**").permitAll()
        .requestMatchers("/**").permitAll()


        .requestMatchers("/").permitAll()

        // ❌ Any other requests require authentication
        .anyRequest().authenticated()
      );

    return http.build();
  }
}
