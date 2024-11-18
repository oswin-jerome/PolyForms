package in.oswinjerome.PolyFroms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.validator.constraints.UUID;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Form {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.AUTO)
   private String id;

    private  String title;
    private String description;
    private LocalDateTime lastOpenedAt = LocalDateTime.now();
    private Boolean allowResponse = true;
    private Integer responseLimit = 0;

    @JsonIgnore
    @ManyToOne()
    private  User user;

    @OneToMany(mappedBy = "form")
    private  List<Field> fields;

    @JsonIgnore
    @OneToMany(mappedBy = "form")
    private  List<Submission> submissions;



}
