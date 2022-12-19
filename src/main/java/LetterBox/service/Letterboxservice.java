package LetterBox.service;

import LetterBox.domain.dto.LetterboxDto;
import LetterBox.domain.entity.Letterbox.LetterboxEntity;
import LetterBox.domain.entity.Letterbox.LetterboxRepository;
import LetterBox.domain.entity.member.MemberEntity;
import LetterBox.domain.entity.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
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
        System.out.println("lDto : " + lDto.toString());
        // mno이 존재하면 저장하게
        Optional<MemberEntity> optional=memberRepository.findById(lDto.getMno());
        if(optional.isPresent()){
            MemberEntity mEntity=optional.get();
            LetterboxEntity lEntity=letterboxRepository.save(lDto.toEntity());
            if(lEntity.getLno()!=0){ // 0아니면 성공

                // 보내는 사람익명이면 넣어주기
                if(lEntity.getSendp()==""){lEntity.setSendp("익명🤐");}
                if(lEntity.getSendt()==""){lEntity.setSendt("편지 내용이 비어있네요. 글로는 표현이 다 안되나봐요🥰");}
                // 여기서 비속어 필터링해서 저장하기
                // 반환값 null아니면 메시지 set으로 바꿔서 db에 저장하기
                String cleanmsg=filterWord(lDto.getSendt());
                if(cleanmsg!=null){
                    lEntity.setSendt(cleanmsg);
                    System.out.println(cleanmsg);
                }
                // 회원-편지함 연관관계
                lEntity.setMemberEntity(mEntity);
                mEntity.getLetterboxEntityList().add(lEntity);
                return true;
            }
        }
        return false;
    }

    // 비속어 필터링 - 저장할때 한번만 해야되나 아니면 적을떄마다 계속해야되나...
    public String filterWord(String msg) {
        FileInputStream fis;
        InputStreamReader isr;
        BufferedReader breader;
        try {
            fis = new FileInputStream("C:\\fword_list.txt");
            isr = new InputStreamReader(fis, "UTF-8");
            breader = new BufferedReader(isr);
            // 파일에서 한줄씩 읽어와서 words에 저장
            String words = breader.readLine();
            // 띄어쓰기로 구분해서 한줄씩 저장
            String[] warr = words.split(",");

            for(int i=0; i<warr.length; i++){
                // 비속어 배열과 텍스트 비교해서
                if(msg.contains(warr[i])){
                    // 해당 단어의 길이 저장해서 글자 바꿔주기
                    String findtext=warr[i];
                    String cleantext=""; // 바꾼 문자열 저장할 변수
                    for(int j=0; j<findtext.length(); j++){
                        cleantext+="❤"; // 문자열 길이만큼  추가해주기
                    }
                    msg=msg.replaceAll(findtext,cleantext);
                    return msg;
                }
            }
        } catch (Exception e) {
            System.out.println(e + "필터링 에러");
        }
        return null;
    }

    // mno에 해당하는 편지리스트 출력시키기
    public List<LetterboxDto> getLetterList(int mno){
        List<LetterboxEntity> lentityList= letterboxRepository.findByMno(mno);
        List<LetterboxDto> ldtoList=new ArrayList<>();

        // 하나씩 뽑아서 dto로 담자
        for(LetterboxEntity lentity : lentityList){
            ldtoList.add(lentity.toDto());
        }
        System.out.println(ldtoList.toString());
        return ldtoList;

    }




}
