package in.oswinjerome.PolyFroms.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ResponseEntry {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private String id;

    private String value;

    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    private List<String> values = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    private Field field;

    @JsonIgnore
    @ManyToOne()
    Submission submission;
}
