package in.oswinjerome.PolyFroms.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private String secret;

    JwtService() {
        secret = Base64.getEncoder().encodeToString("451b19819d58bcd46271c98a77d71ee10b4d303d84cfb178e3d5d85d8420c69b".getBytes());
    }

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder().claims().add(claims)
                .subject(email).issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .and().signWith(getSignKey()).compact();

    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims extractAllClaims(String token) {

        return Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();
    }


    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) throws JwtException {
        final Claims claims = extractAllClaims(token);

        return claimsTFunction.apply(claims);
    }

    public String extractUserName(String token) throws JwtException {

        return extractClaims(token, Claims::getSubject);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String uName = extractUserName(token);
        return uName.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {

        return extractClaims(token, Claims::getExpiration).before(new Date());
    }


}
