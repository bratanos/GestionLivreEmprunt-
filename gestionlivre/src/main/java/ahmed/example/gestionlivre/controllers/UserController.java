package ahmed.example.gestionlivre.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ahmed.example.gestionlivre.models.Book;
import ahmed.example.gestionlivre.models.User;
import ahmed.example.gestionlivre.models.UserDTO;
import ahmed.example.gestionlivre.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Sign up endpoint to create a new user
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        // Check if the username is already taken
        if (userService.isUsernameTaken(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        // Set the default role for the user
        user.setRole("USER");

        // Create and save the user
        return ResponseEntity.ok(userService.createUser(user));
    }

    // Login endpoint to validate user login
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        // Validate login using the provided username and password
        User loggedInUser = userService.validateLogin(user.getUsername(), user.getPassword());

        if (loggedInUser == null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        // Check the role of the logged-in user
        if ("ADMIN".equals(loggedInUser.getRole())) {
            // Redirect admin to the admin dashboard
            return ResponseEntity.ok("admin");
        } else {
        	user.setRole("user");
        	user.setId((Long) user.getId());
            // Redirect user to their user dashboard
            return ResponseEntity.ok(loggedInUser);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }
    

    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        // Fetch the existing user by ID
        User existingUser = userService.findById(id).orElse(null);
        
        if (existingUser == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Update the user fields
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword());  // Ensure this is hashed if necessary
        existingUser.setRole(updatedUser.getRole());

        // Save the updated user
        User savedUser = userService.createUser(existingUser); // Reuse createUser to save the updated user

        return ResponseEntity.ok(savedUser);
    }
    
    // Endpoint to delete a user (accessible only to admins)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // Fetch the user by ID
        User user = userService.findById(id).orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Delete the user
        userService.deleteUser(id);
        
        return ResponseEntity.ok("User deleted successfully");
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{userId}/borrowed-books")
    public ResponseEntity<?> getBorrowedBooks(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOptional.get();
        return ResponseEntity.ok(user.getBorrowedBooks()); // Returns the borrowed books list
    }
}
