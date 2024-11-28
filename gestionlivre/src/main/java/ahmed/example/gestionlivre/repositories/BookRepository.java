package ahmed.example.gestionlivre.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ahmed.example.gestionlivre.models.Book;
import ahmed.example.gestionlivre.models.User;

public interface BookRepository extends JpaRepository<Book, Long> {
	 boolean existsByTitle(String title);

	List<Book> findByBorrowedBy(User user);
}
