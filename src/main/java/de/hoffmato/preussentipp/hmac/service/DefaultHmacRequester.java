package de.hoffmato.preussentipp.hmac.service;

import org.springframework.stereotype.Service;

import de.hoffmato.preussentipp.hmac.configuration.security.hmac.HmacRequester;
import de.hoffmato.preussentipp.hmac.dto.UserDTO;
import de.hoffmato.preussentipp.hmac.mock.MockUsers;

import javax.servlet.http.HttpServletRequest;

/**
 * Hmac Requester service
 * Created by Michael DESIGAUD on 16/02/2016.
 */
@Service
public class DefaultHmacRequester implements HmacRequester{

    @Override
    public Boolean canVerify(HttpServletRequest request) {
        return request.getRequestURI().contains("/api") && !request.getRequestURI().contains("/api/authenticate");
    }

    @Override
    public String getSecret(String iss) {
        UserDTO userDTO = MockUsers.findById(Integer.valueOf(iss));
        if(userDTO != null){
            return userDTO.getSecretKey();
        }
        return null;
    }
}
