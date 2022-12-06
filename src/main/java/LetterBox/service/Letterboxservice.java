package LetterBox.service;

import LetterBox.domain.dto.LetterboxDto;
import org.springframework.stereotype.Service;

@Service
public class Letterboxservice {

    // 편지 작성 완료 버튼
    public boolean sendletter(LetterboxDto lDto){
        return false;

    }

    // 편지 리스트 출력 메서드
    public LetterboxDto letterList(int mno){
        // mno을 받아서 연하장 게시판에 해당 mno에 맞는 편지만 출력시키기
        // 갯수만 뽑아서 가져와도 될듯! 일단은...
        // 어차피 당장 편지 열어볼 수 있게 할것도 아니니까


        return null;
    }



}
