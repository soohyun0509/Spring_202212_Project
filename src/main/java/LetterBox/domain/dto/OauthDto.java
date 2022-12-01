package LetterBox.domain.dto;

import lombok.*;

import java.util.Map;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@ToString   @Builder
public class OauthDto {

    private String memail;
    private String mname;
    private String registrationId; // 클라이언트명

    private Map<String ,Object> attributes; // 인증결과 - 인증된 유저의 정보갖고있음
    private String oauth2UserInfo; // 회원정보 키 - 클라이언트마다 변수명 덮고 있는 그거

    public static OauthDto of(String registrationId , String oauth2UserInfo , Map<String ,Object> attributes){
        if(registrationId.equals("kakao")){return ofKakao(registrationId, oauth2UserInfo,attributes);}

        // 회사 추가하기
        return null;

    }

    public static OauthDto ofKakao(String registrationId , String oauth2UserInfo , Map<String ,Object> attributes){
        Map<String, Object>kakao_account=(Map<String, Object>)attributes.get(oauth2UserInfo);
        Map<String, Object>profile=(Map<String, Object>)kakao_account.get("profile");
        return OauthDto.builder()
                .memail((String)kakao_account.get("email"))
                .mname((String)kakao_account.get("nickname"))
                .registrationId(registrationId)
                .oauth2UserInfo(oauth2UserInfo)
                .attributes(attributes)
                .build();

    }



}
