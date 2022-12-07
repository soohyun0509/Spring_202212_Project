package LetterBox.controller;

import LetterBox.domain.dto.LetterboxDto;
import LetterBox.service.Letterboxservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/letterbox")
public class LetterboxController {

    @Autowired
    private Letterboxservice letterboxservice;

    // 편지 작성 완료 버튼
    @PostMapping("/sendletter")
    public boolean sendletter(@RequestBody LetterboxDto lDto){

        return letterboxservice.sendletter(lDto);
    }

    // 페이지에 편지 받은게 표시되게 해야되는데...
    // 설마하니 소켓을 써야되는건 아니겠지 제발...
    // 아냐 편지리스트를 출력시키는 메서드를 만들자
    @GetMapping("/letterList")
    public LetterboxDto letterList(@RequestParam int mno){
            // 게시판 주인 구별할 수 있게 받아오기!

        // 편지 개수만 받아와서 jsx에서 반복문 돌려가지고 뭘 하던가 하자
        return letterboxservice.letterList(mno);
    }






}
