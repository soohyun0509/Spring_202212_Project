package LetterBox.domain.dto;

import LetterBox.domain.entity.Letterbox.LetterboxEntity;
import lombok.*;

import java.sql.Clob;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class LetterboxDto {

    private int lno;
    private String sendp;
    private String sendt;
    private int sno;
    private String bdate;
    private int mno;
    private int cno;

    public LetterboxEntity toEntity(){
        return LetterboxEntity.builder()
                .lno(this.lno)
                .sendp(this.sendp)
                .sendt(this.sendt)
                .sno(this.sno)
                .build();
    }


}