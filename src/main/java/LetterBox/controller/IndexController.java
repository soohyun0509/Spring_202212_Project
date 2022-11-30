package LetterBox.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

    // 메인 페이지 연결
    @GetMapping("/")
    public Resource Indexpage(){return new ClassPathResource("templates/index.html");
    }



}
