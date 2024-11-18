package in.oswinjerome.PolyFroms.services;

import in.oswinjerome.PolyFroms.dto.AccessTokenDTO;
import in.oswinjerome.PolyFroms.models.User;
import in.oswinjerome.PolyFroms.repos.UsersRepo;
import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    UsersRepo usersRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authManager;


    public ResponseEntity<ResponsePayload> register(User user) {

        if(usersRepo.findUserByEmail(user.getEmail()).isPresent()){
            return new ResponseEntity<>(new ResponsePayload(false,null,"User already exists"), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User u = usersRepo.save(user);

        return new ResponseEntity<>(new ResponsePayload(true,u,"OK"), HttpStatus.CREATED);

    }

    public ResponseEntity<ResponsePayload> login(User user) {
//        TODO: Check if user has a password set.
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        String token = null;
        if(auth.isAuthenticated()){
           token =   jwtService.generateToken(user.getEmail());
        }

        return new ResponseEntity<>(new ResponsePayload(true,token,"OK"), HttpStatus.OK);
    }

    public User getCurrentUser(){

        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


    public boolean isAuthenticated(){

        return SecurityContextHolder.getContext().getAuthentication() != null;
    }


    public ResponseEntity<ResponsePayload> github(AccessTokenDTO accessTokenDTO) {

        RestTemplate restTemplate = new RestTemplate();

        String userInfoEndpoint = "https://api.github.com/user";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessTokenDTO.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, entity, Map.class);

        if(!response.getStatusCode().is2xxSuccessful()){
            return new ResponseEntity<>(new ResponsePayload(false,null,"Invalid Access token"), HttpStatus.UNAUTHORIZED);
        }

        Map map = response.getBody();
        String email = map.get("email").toString();
        String name = map.get("name").toString();

        Optional<User> user = usersRepo.findUserByEmail(email);
        User loginUser = null;
        if(user.isEmpty()){
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            loginUser = usersRepo.save(newUser);
            System.out.println("Profile created");
        }else{
            loginUser = user.get();
        }


        Authentication auth =  new UsernamePasswordAuthenticationToken(loginUser.getEmail(),loginUser.getPassword());
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = jwtService.generateToken(loginUser.getEmail());
            return new ResponseEntity<>(new ResponsePayload(true,token,"OK"), HttpStatus.OK);



    }
}
