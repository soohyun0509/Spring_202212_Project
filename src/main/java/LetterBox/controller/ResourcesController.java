package LetterBox.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class ResourcesController {

    // 메인 페이지 연결
    @GetMapping("/index")
    public Resource Indexpage(){return new ClassPathResource("templates/index.html");}

    // 로그인 페이지 연결
    @GetMapping("/login")
    public Resource loginpage(){return new ClassPathResource("templates/login.html");}

    // 우체통 페이지 연결
    @GetMapping("/letterbox")
    public Resource letterboxpage(){return new ClassPathResource("templates/letterbox.html");}

    // diary 페이지 연결
    @GetMapping("/diary")
    public Resource diaryxpage(){return new ClassPathResource("templates/diary.html");}

    // 로그아웃

}
