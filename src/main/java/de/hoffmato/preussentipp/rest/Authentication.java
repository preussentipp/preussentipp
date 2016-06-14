package de.hoffmato.preussentipp.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authentication rest controller
 * Created by Michael DESIGAUD on 14/02/2016.
 */
@RestController
@RequestMapping(value = "/api")
public class Authentication {

//    @Autowired
//    private AuthenticationService authenticationService;
//
//    @RequestMapping(value = "/authenticate",method = RequestMethod.POST)
//    public UserDTO authenticate(@RequestBody LoginDTO loginDTO, HttpServletResponse response) throws Exception{
//        return authenticationService.authenticate(loginDTO,response);
//    }
//
//    @RequestMapping(value = "/logout",method = RequestMethod.GET)
//    public void logout(){
//        authenticationService.logout();
//    }
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public void logout() {
		
	}
}
