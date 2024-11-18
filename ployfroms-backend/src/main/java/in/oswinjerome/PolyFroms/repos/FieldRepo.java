package in.oswinjerome.PolyFroms.repos;

import in.oswinjerome.PolyFroms.models.Field;
import in.oswinjerome.PolyFroms.models.Form;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FieldRepo extends JpaRepository<Field, Long> {

    List<Field> findFieldsByFormOrderByOrderNo(Form form);
}
