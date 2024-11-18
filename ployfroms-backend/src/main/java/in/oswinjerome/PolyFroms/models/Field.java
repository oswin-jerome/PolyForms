package in.oswinjerome.PolyFroms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import in.oswinjerome.PolyFroms.enums.FieldType;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    String title;
    @Nullable
    private int orderNo = 0;
    @Nullable
    private Boolean required = false;

    @Enumerated(EnumType.STRING)
    FieldType fieldType = FieldType.TEXT;

    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    private List<String> options = new ArrayList<>();

    @JsonIgnore
    @ManyToOne()
    Form form;

//    @JsonIgnore
    @OneToMany(mappedBy = "field")
    private List<ResponseEntry> responseEntries;



}
