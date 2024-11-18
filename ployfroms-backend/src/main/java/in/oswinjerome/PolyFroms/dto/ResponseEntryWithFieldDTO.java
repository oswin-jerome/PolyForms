package in.oswinjerome.PolyFroms.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import in.oswinjerome.PolyFroms.models.Field;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@Setter
public class ResponseEntryWithFieldDTO {
    private String id;

    private String value;

    private List<String> values = new ArrayList<>();

    private Field field;

    public Field getField() {
        Field d = field;
        d.setResponseEntries(null);
        return d;
    }
}
