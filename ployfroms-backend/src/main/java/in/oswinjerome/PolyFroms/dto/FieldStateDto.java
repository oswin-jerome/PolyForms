package in.oswinjerome.PolyFroms.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class FieldStateDto {

    private Long id;
    private String value;
    private List<String> values = new ArrayList<>();

}
