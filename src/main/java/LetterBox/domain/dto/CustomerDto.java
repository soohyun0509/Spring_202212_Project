package LetterBox.domain.dto;

import LetterBox.domain.entity.customer.CustomerEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Builder  @ToString
public class CustomerDto {

    private int bno;
    private String btitle;
    private String bcontent;
    private String bwriter;

    // 첨부파일 리스트
    private List<MultipartFile> filelist; // 객체
    private List<String> bfilename; // 첨부파일 호출용

    private String bpassword;
    private int bview;
    private int bcno;

    public CustomerEntity toEntity(){
        return CustomerEntity.builder()
                .bno(this.bno)
                .btitle(this.btitle)
                .bcontent(this.bcontent)
                .bwriter(this.bwriter)
                .bpassword(this.bpassword)
                .bview(this.bview)
                .build();
    }

}
