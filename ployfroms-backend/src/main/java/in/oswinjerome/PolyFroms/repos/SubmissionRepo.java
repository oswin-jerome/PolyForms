package in.oswinjerome.PolyFroms.repos;

import in.oswinjerome.PolyFroms.models.Form;
import in.oswinjerome.PolyFroms.models.Submission;
import jakarta.persistence.criteria.From;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepo extends JpaRepository<Submission,String> {
    Page<Submission> findAllByForm(Form form, Pageable pageable);
}
