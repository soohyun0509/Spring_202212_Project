package LetterBox.domain.dto;

import LetterBox.domain.entity.member.MemberEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;
import java.util.Set;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@ToString   @Builder
public class OauthDto implements OAuth2User {

    private int mno;
    private String memail;
    private String mname;
    private String registrationId; // 클라이언트명

    // 인증 권한
    private Set<GrantedAuthority> authorities;
    private Map<String ,Object> attributes; // SNS인증결과 - 인증된 유저의 정보갖고있음
    private String oauth2UserInfo; // 회원정보 키 - 클라이언트마다 변수명 덮고 있는 그거

    //------------------  OAuth2User ----------------------//
    @Override
    public String getName() {
        return this.memail;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    ///////////////////////////////////////////////////////
    public static OauthDto of(String registrationId , String oauth2UserInfo , Map<String ,Object> attributes){
        if(registrationId.equals("kakao")){return ofKakao(registrationId, oauth2UserInfo,attributes);}
        else if(registrationId.equals("naver")){return ofNaver(registrationId,oauth2UserInfo,attributes);}
        else if(registrationId.equals("google")){return ofGoogle(registrationId,oauth2UserInfo,attributes);}
        else if(registrationId.equals("github")){return ofGithub(registrationId,oauth2UserInfo,attributes);}

        // 회사 추가하기
        return null;

    }

    public static OauthDto ofKakao(String registrationId , String oauth2UserInfo , Map<String ,Object> attributes){
        Map<String, Object>kakao_account=(Map<String, Object>)attributes.get(oauth2UserInfo);
        Map<String, Object>profile=(Map<String, Object>)kakao_account.get("profile");
        return OauthDto.builder()
                .memail((String)kakao_account.get("email"))
                .mname((String)profile.get("nickname"))
                .registrationId(registrationId)
                .oauth2UserInfo(oauth2UserInfo)
                .attributes(attributes)
                .build();

    }

    public static OauthDto ofNaver(String registrationId , String oauth2UserInfo , Map<String ,Object> attributes){
        Map<String, Object> response=(Map<String, Object>)attributes.get(oauth2UserInfo);
        return OauthDto.builder()
                .memail((String)response.get("email"))
                .mname((String)response.get("name"))
                .registrationId(registrationId)
                .oauth2UserInfo(oauth2UserInfo)
                .attributes(attributes)
                .build();
    }
    public static OauthDto ofGoogle(String registrationId , String oauth2UserInfo , Map<String ,Object> attributes){
        return OauthDto.builder()
                .memail((String)attributes.get("login"))
                .mname((String)attributes.get("name"))
                .registrationId(registrationId)
                .oauth2UserInfo(oauth2UserInfo)
                .attributes(attributes)
                .build();
    }
    public static OauthDto ofGithub(String registrationId , String oauth2UserInfo , Map<String ,Object> attributes){
        System.out.println("github attributes : " + attributes);
        return OauthDto.builder()
                .memail((String)attributes.get("email"))
                .mname((String)attributes.get("name"))
                .registrationId(registrationId)
                .oauth2UserInfo(oauth2UserInfo)
                .attributes(attributes)
                .build();
    }

    public MemberEntity toEntity(){
        return MemberEntity.builder()
                .mno(this.mno)
                .memail(this.memail)
                .mname(this.mname)
                .mrole(this.registrationId)
                .build();
    }



}
