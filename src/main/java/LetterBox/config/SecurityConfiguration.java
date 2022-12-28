package LetterBox.config;

import LetterBox.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

    @Autowired
    private MemberService memberService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // super.configure(http);
        http
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
/*              .and()
                .exceptionHandling() // 오류페이지에 대한 핸들링
                .accessDeniedPage("/")// 해당 URL 이동  */
                .and()
                .csrf()
                .ignoringAntMatchers("/letterbox/sendletter")
                .ignoringAntMatchers("/customer/setCustomer")
                .ignoringAntMatchers("/customer/getBoardList")
                .ignoringAntMatchers("/customer/setcomment")
                .ignoringAntMatchers("/customer/onDelete")
                .ignoringAntMatchers("/customer/upBoard")
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/") // 로그인 성공시 이동 페이지
                .userInfoEndpoint()
                .userService(memberService);



    }
}
