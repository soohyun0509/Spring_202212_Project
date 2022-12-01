package LetterBox.service;

import LetterBox.domain.dto.MemberDto;
import LetterBox.domain.dto.OauthDto;
import LetterBox.domain.entity.member.MemberEntity;
import LetterBox.domain.entity.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {


    //---------------- 전역변수 -------------------------------//
    @Autowired
    private MemberRepository memberRepository;


    // 로그인 메소드 [SNS 인증]
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // 인증결과 빼오기
        OAuth2UserService oAuth2UserService=new DefaultOAuth2UserService();
        OAuth2User oAuth2User=oAuth2UserService.loadUser(userRequest);
        System.out.println("인증 결과 : " + oAuth2User.getAttributes());

        // 클라이언트명 가져오기
        String registrationId=userRequest.getClientRegistration().getRegistrationId();

        // 유저정보 담을 객체키 만들기
        // 지금 유저정보가 담겨있는게 아니라 여기에 담을거임!!
        // 여기엔 각 회사마다 다르게 설정된 kakao_account , response 등이 담겨있음!
        String oauth2UserInfo=userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        //Dto
        OauthDto oauthDto=OauthDto.of(registrationId,oauth2UserInfo,oAuth2User.getAttributes());

        // Db 처리

        Set<GrantedAuthority> authorities=new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("kakaouser"));

        MemberDto memberDto=new MemberDto();
        memberDto.setMemail(oauthDto.getMemail());
        memberDto.setMname(oauthDto.getMname());
        memberDto.setAuthorities(authorities);
        memberDto.setAttributes(oauthDto.getAttributes());
        // mname은 왜 안주지...
        System.out.println("memberDto : "+memberDto.toString());
        return memberDto;
    }




}
