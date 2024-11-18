package in.oswinjerome.PolyFroms.services;

import in.oswinjerome.PolyFroms.models.User;
import in.oswinjerome.PolyFroms.repos.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return usersRepo.findUserByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
    }
}
