package LetterBox.controller;

import LetterBox.domain.dto.LetterboxDto;
import LetterBox.service.Letterboxservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @GetMapping("/getLetterList")
    public List<LetterboxDto> getLetterList(@RequestParam int mno){
        return letterboxservice.getLetterList(mno);
    }


}
