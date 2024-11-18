package in.oswinjerome.PolyFroms.repos;

import in.oswinjerome.PolyFroms.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UsersRepo extends JpaRepository<User,Long> {
    Optional<User> findUserByEmail(String email);
}
