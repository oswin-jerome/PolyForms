package in.oswinjerome.PolyFroms.repos;

import in.oswinjerome.PolyFroms.models.Form;
import in.oswinjerome.PolyFroms.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormsRepo extends JpaRepository<Form, String> {


    List<Form> findFormsByUser(User user);

}
