package in.oswinjerome.PolyFroms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Submission {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private String id;

    private LocalDateTime submittedAt = LocalDateTime.now();

    @JsonIgnore
    @ManyToOne
    private Form form;

    @OneToMany(mappedBy = "submission")
    private List<ResponseEntry> responseEntries;

}
