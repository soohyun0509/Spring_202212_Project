package LetterBox.service;

import LetterBox.domain.dto.OauthDto;
import LetterBox.domain.entity.member.MemberEntity;
import LetterBox.domain.entity.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {


    //---------------- 전역변수 -------------------------------//
    @Autowired
    private MemberRepository memberRepository;


    // 로그인 메소드 [SNS 인증]
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // 인증결과 빼오기
        OAuth2UserService oAuth2UserService=new DefaultOAuth2UserService();
        OAuth2User oAuth2User=oAuth2UserService.loadUser(userRequest);
        System.out.println("인증 결과: " + oAuth2User.getAttributes());
        // 클라이언트명 가져오기
        String registrationId=userRequest.getClientRegistration().getRegistrationId();
        System.out.println("registrationId 인증 결과: " + registrationId);
        // 유저정보 담을 객체키 만들기
        // 지금 유저정보가 담겨있는게 아니라 여기에 담을거임!!
        // 여기엔 각 회사마다 다르게 설정된 kakao_account , response 등이 담겨있음!
        String oauth2UserInfo=userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        //Dto에 정보 담기
        OauthDto oauthDto=OauthDto.of(registrationId,oauth2UserInfo,oAuth2User.getAttributes());
        if(oauthDto.getMemail()==null && registrationId.equals("github")){oauthDto.setMemail("github");}
        // Db 처리
        Optional<MemberEntity> optional= memberRepository.findByMemailAndMrole(oauthDto.getMemail(),registrationId);

        MemberEntity memberEntity=null;
        if(optional.isPresent()){
                memberEntity=optional.get();

        }else{ // 아예 레코드에 존재하지 않으면 새로 등록
            memberEntity=memberRepository.save(oauthDto.toEntity());
        }
        oauthDto.setMno(memberEntity.getMno());
        Set<GrantedAuthority> authorities=new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(memberEntity.getMrole()));

        System.out.println("memberDto : "+oauthDto.toString());
        return oauthDto;
    }

    // 로그인 여부 가져오기
    public OauthDto getmemberMno(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();

        Object principal=authentication.getPrincipal();
        System.out.println("principal : " + principal);
        if(principal.equals("anonymousUser")){
            return null;
        }else{
            return (OauthDto) principal;
        }
    }

    // mno으로 편지지 주인 mname 가져오기
    public String getMname(int mno){
        Optional<MemberEntity> optional=memberRepository.findById(mno);
        System.out.println(optional + " : optional getMname");
        // mno에 해당하는 레코드가 있으면
        if(optional.isPresent()){
            MemberEntity memberEntity=optional.get(); // optional에서 정보뽑아가지고 넣어주기
            // dto로 변환해서 나가야함
            OauthDto oauthDto=memberEntity.toDto();
            return oauthDto.getMname();
        }
        return null;
    }

}
