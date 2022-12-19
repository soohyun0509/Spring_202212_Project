package LetterBox.domain.entity.Letterbox;

import LetterBox.domain.dto.LetterboxDto;
import LetterBox.domain.entity.BaseEntity;
import LetterBox.domain.entity.member.MemberEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Clob;


@Entity
@Table(name = "letterbox")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@ToString @Builder
public class LetterboxEntity extends BaseEntity { // 시간상속

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lno;
    private String sendp; // 보낸 사람
    @Lob
    private String sendt; // 보낸 메시지

    private int sno; // 편지지 이미지 번호
    // 연관관계
    // mno -> 받는 사람이 들어감!!!
    @ManyToOne
    @JoinColumn(name = "mno")
    @ToString.Exclude
    private MemberEntity memberEntity;


    public LetterboxDto toDto(){
        return LetterboxDto.builder()
                .lno(this.lno)
                .sendp(this.sendp)
                .sendt(this.sendt)
                .sno(this.sno)
                .mno(memberEntity.getMno())
                .bdate(this.getCdate().toLocalDate().toString())
                .build();
    }


}
