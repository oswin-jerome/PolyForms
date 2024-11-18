package in.oswinjerome.PolyFroms.controllers;

import in.oswinjerome.PolyFroms.dto.AccessTokenDTO;
import in.oswinjerome.PolyFroms.models.User;
import in.oswinjerome.PolyFroms.services.AuthService;
import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService service;

    @PostMapping("register")
    public ResponseEntity<ResponsePayload> register(@RequestBody @Valid User user) {

        return service.register(user);
    }

    @PostMapping("login")
    public ResponseEntity<ResponsePayload> login(@RequestBody User user) {

        return service.login(user);
    }

    @PostMapping("github")
    public ResponseEntity<ResponsePayload> github(@RequestBody AccessTokenDTO accessTokenDTO) {

        return service.github(accessTokenDTO);
    }

}
