package LetterBox.controller;

import LetterBox.domain.dto.OauthDto;
import LetterBox.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // 로그인 정보 가져오기
    @GetMapping("/getmemberMno")
    public OauthDto getmemberMno(){
        return memberService.getmemberMno();
    }

    // 해당 링크에 주인이 누구인지도 가지고 와야돼

    // 로그아웃


}
