package in.oswinjerome.PolyFroms.exceptions;

import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ResponseEntity<Object> tokenExpired(JwtException ex) {
        return new ResponseEntity<>(new ResponsePayload(false,null,"Invalid token"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ResponseEntity<Object> invalidCredentials(BadCredentialsException ex) {
        return new ResponseEntity<>(new ResponsePayload(false,null,"Invalid credentials"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public ResponseEntity<Object> requestValidation(MethodArgumentNotValidException ex) {

        List<Map<String, Object>> sanitizedErrors = ex.getFieldErrors().stream()
                .map(fieldError -> {
                    Map<String, Object> errorDetails = new HashMap<>();
                    errorDetails.put("field", fieldError.getField());
                    errorDetails.put("errorMessage", fieldError.getDefaultMessage());
                    return errorDetails;
                })
                .toList();

        return new ResponseEntity<>(
                new ResponsePayload(false,null,"Invalid fields, Please check the values", sanitizedErrors),
                HttpStatus.UNPROCESSABLE_ENTITY);
    }


    @ExceptionHandler(RestrictedAccessException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ResponseEntity<Object> restrictedAccess(RestrictedAccessException ex) {
        return new ResponseEntity<>(new ResponsePayload(false,null,ex.getMessage()), HttpStatus.UNPROCESSABLE_ENTITY);
    }


}
