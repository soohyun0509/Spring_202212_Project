package LetterBox.service;

import LetterBox.domain.dto.LetterboxDto;
import LetterBox.domain.entity.Letterbox.LetterboxEntity;
import LetterBox.domain.entity.Letterbox.LetterboxRepository;
import LetterBox.domain.entity.member.MemberEntity;
import LetterBox.domain.entity.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class Letterboxservice {

    @Autowired
    private LetterboxRepository letterboxRepository;
    @Autowired
    private MemberRepository memberRepository;

    // 편지 작성 완료 버튼
    @Transactional
    public boolean sendletter(LetterboxDto lDto){

        // mno이 존재하면 저장하게
        Optional<MemberEntity> optional=memberRepository.findById(lDto.getMno());
        if(optional.isPresent()){
            MemberEntity mEntity=optional.get();
            LetterboxEntity lEntity=letterboxRepository.save(lDto.toEntity());
            if(lEntity.getLno()!=0){ // 0아니면 성공

                // 회원-편지함 연관관계
                lEntity.setMemberEntity(mEntity);
                mEntity.getLetterboxEntityList().add(lEntity);

                return true;

            }

        }
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
