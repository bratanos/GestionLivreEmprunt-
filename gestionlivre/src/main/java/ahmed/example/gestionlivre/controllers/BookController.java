package ahmed.example.gestionlivre.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ahmed.example.gestionlivre.models.Book;
import ahmed.example.gestionlivre.models.User;
import ahmed.example.gestionlivre.repositories.BookRepository;
import ahmed.example.gestionlivre.services.BookService;
import ahmed.example.gestionlivre.services.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {
	
	
	@Autowired
	private BookRepository bookRepository;
    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    // Endpoint to borrow a book
    @PutMapping("/borrow/{id}")
    public ResponseEntity<?> borrowBook(@PathVariable Long id, @RequestParam Long userId) {
        Optional<Book> bookOptional = bookService.findById(id);
        if (bookOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Book not found");
        }

        Book book = bookOptional.get();

        // Check if the book is already borrowed
        if (book.isBorrowed()) {
            return ResponseEntity.badRequest().body("Book is already borrowed");
        }

        // Find the user by ID
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOptional.get();

        // Mark the book as borrowed and associate it with the user
        book.setBorrowed(true);
        book.setBorrowedBy(user);
        bookService.saveBook(book);

        return ResponseEntity.ok(book);
    }

    // Endpoint to return a borrowed book
    @PutMapping("/return/{id}")
    public ResponseEntity<?> returnBook(@PathVariable Long id) {
        Optional<Book> bookOptional = bookService.findById(id);
        if (bookOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Book not found");
        }

        Book book = bookOptional.get();

        // Check if the book is currently borrowed
        if (!book.isBorrowed()) {
            return ResponseEntity.badRequest().body("Book is not currently borrowed");
        }

        // Mark the book as returned and disassociate it from the user
        book.setBorrowed(false);
        book.setBorrowedBy(null);
        bookService.saveBook(book);

        return ResponseEntity.ok(book);
    }

    // Endpoint to get all books
    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }
    @PutMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        // Check if the book already exists by title or other identifiers
        if (bookRepository.existsByTitle(book.getTitle())) {
            return ResponseEntity.badRequest().body("Book with the same title already exists");
        }

        // Save the new book to the database
        Book savedBook = bookService.saveBook(book);
        return ResponseEntity.ok(savedBook);  // Return the saved book
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        Optional<Book> bookOptional = bookService.findById(id);
        if (bookOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Book not found");
        }

        Book book = bookOptional.get();
        bookService.deleteBook(book);
        return ResponseEntity.ok("Book deleted successfully");
    }
    
    
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        Optional<Book> bookOptional = bookService.findById(id);
        if (bookOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Book not found");
        }

        Book book = bookOptional.get();
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());

        bookService.saveBook(book);
        return ResponseEntity.ok(book);
    }
    

    
    
}
