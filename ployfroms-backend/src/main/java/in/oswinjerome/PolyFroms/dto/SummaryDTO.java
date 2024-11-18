package in.oswinjerome.PolyFroms.dto;

import in.oswinjerome.PolyFroms.models.Field;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SummaryDTO {

    private Field field;
    List<Map<String,Object>> values = new ArrayList<>();
}
