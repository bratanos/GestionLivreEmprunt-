package ahmed.example.gestionlivre.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ahmed.example.gestionlivre.models.Book;
import ahmed.example.gestionlivre.models.User;
import ahmed.example.gestionlivre.repositories.BookRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;

    // Method to borrow a book
    public Book borrowBook(Long id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent() && !book.get().isBorrowed()) {
            Book b = book.get();
            b.setBorrowed(true);
            return bookRepository.save(b);
        }
        return null;
    }
    
    public List<Book> findBooksByUser(User user) {
        return bookRepository.findByBorrowedBy(user);
    }

    // Method to return a borrowed book
    public Book returnBook(Long id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent() && book.get().isBorrowed()) {
            Book b = book.get();
            b.setBorrowed(false);
            return bookRepository.save(b);
        }
        return null;
    }

    // New method to fetch all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
    
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }
    public void deleteBook(Book book) {
        bookRepository.delete(book);  // Delete book from the repository
    }
    
    public boolean existsByTitle(String title) {
        return bookRepository.existsByTitle(title);  // Check if a book exists by title
    }
}
