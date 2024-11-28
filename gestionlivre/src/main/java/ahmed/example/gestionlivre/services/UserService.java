package ahmed.example.gestionlivre.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ahmed.example.gestionlivre.models.UserDTO;
import ahmed.example.gestionlivre.models.User;
import ahmed.example.gestionlivre.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    // BCryptPasswordEncoder to hash the password
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Method to create a new user
    public User createUser(User user) {
        // Hash the password before saving the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Method to find user by username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Method to check if username is already taken
    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username) != null;
    }

    // Method to validate login and return the user if valid
    public User validateLogin(String username, String password) {
        User user = findByUsername(username); // Find the user by username
        
        if (user == null) {
            return null; // User doesn't exist
        }

        // Compare the provided password with the stored hashed password
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user; // Return the user object if passwords match
        }

        return null; // Return null if password is incorrect
    }
    // Method to get all users
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> new UserDTO(user.getId(), user.getUsername(), user.getRole())).collect(Collectors.toList());
        }
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
 // Method to delete a user by ID
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
