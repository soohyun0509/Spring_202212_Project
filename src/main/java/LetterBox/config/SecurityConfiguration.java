package LetterBox.config;

import LetterBox.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

    @Autowired
    private MemberService memberService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // super.configure(http);
        http
                .oauth2Login()
                .userInfoEndpoint()
                .userService(memberService);

    }
}
