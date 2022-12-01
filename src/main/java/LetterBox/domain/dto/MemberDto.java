package LetterBox.domain.dto;


import LetterBox.domain.entity.member.MemberEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@ToString   @Builder
public class MemberDto implements UserDetails , OAuth2User {

    private int mno;
    private String mname;
    private String memail; // username
    // 패스워드 해야돼 말아야돼

    // 인증 권한
    private Set<GrantedAuthority> authorities;
    // sns 인증결과
    private Map<String, Object> attributes;

    public MemberEntity toEntity(){
        return MemberEntity.builder()
                .mno(this.mno)
                .memail(this.memail)
                .mname(this.mname)
                .build();
    }

    //------------------  OAuth2User ----------------------//
    @Override
    public String getName() {
        return this.memail;
    }



    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    //------------------  OAuth2User ----------------------//


    public void setAuthorities(Set<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    // 메소드 자체를 없애면 오류떠서 일단 null
    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.memail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }







}
