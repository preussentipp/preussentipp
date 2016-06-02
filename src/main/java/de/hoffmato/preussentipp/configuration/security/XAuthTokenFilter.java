package de.hoffmato.preussentipp.configuration.security;

import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

import de.hoffmato.preussentipp.configuration.security.hmac.HmacException;
import de.hoffmato.preussentipp.configuration.security.hmac.HmacSigner;
import de.hoffmato.preussentipp.configuration.security.hmac.HmacUtils;
import de.hoffmato.preussentipp.dto.UserDTO;
import de.hoffmato.preussentipp.mock.MockUsers;
import de.hoffmato.preussentipp.service.AuthenticationService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Auth token filter
 * Created by Michael DESIGAUD on 14/02/2016.
 */
public class XAuthTokenFilter extends GenericFilterBean{

    private AuthenticationService authenticationService;

    public XAuthTokenFilter(AuthenticationService authenticationService){
       this.authenticationService = authenticationService;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (!request.getRequestURI().contains("/api") || request.getRequestURI().contains("/api/authenticate")){
            filterChain.doFilter(request, response);
        } else {

            try {
                String jwtHeader = request.getHeader(HmacUtils.AUTHENTICATION);
                String userId = HmacSigner.getJwtIss(jwtHeader);

                //Retrieve user in cache
                UserDTO userDTO = MockUsers.findById(Integer.valueOf(userId));
                Assert.notNull(userDTO,"No user found with id: "+userId);
                this.authenticationService.tokenAuthentication(userDTO.getLogin());
                filterChain.doFilter(request,response);
            } catch (HmacException e) {
                e.printStackTrace();
            }
        }

    }
}
