package ahmed.example.gestionlivre.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ahmed.example.gestionlivre.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername (String username);

}
