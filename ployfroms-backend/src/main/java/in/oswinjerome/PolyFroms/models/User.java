package in.oswinjerome.PolyFroms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotBlank
    private String name;

    @Email(message = "Invalid Email")
    @Column(unique = true)
    private String email;

//    TODO: move validation to a dto
//    @NotBlank(message = "Password can't be blank")
//    @Min(value = 8,message = "Password should be min 8 characters")
    private String password;


    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnore
    List<Form> forms;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }


}
