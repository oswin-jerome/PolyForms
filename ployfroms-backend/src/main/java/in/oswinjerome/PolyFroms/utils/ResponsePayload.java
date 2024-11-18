package in.oswinjerome.PolyFroms.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ResponsePayload {
    boolean isOk;
    Object data;
    String error;
    List<Map<String,Object>> errors;

    public ResponsePayload(boolean isOk, Object data, String error) {
        this.isOk = isOk;
        this.data = data;
        this.error = error;
    }

    public ResponsePayload(boolean isOk, Object data, String error, List<Map<String,Object>> errors) {
        this.isOk = isOk;
        this.data = data;
        this.error = error;
        this.errors = errors;
    }
}
