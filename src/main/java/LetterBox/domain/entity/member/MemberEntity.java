package LetterBox.domain.entity.member;

import LetterBox.domain.dto.OauthDto;
import LetterBox.domain.entity.BaseEntity;
import LetterBox.domain.entity.Letterbox.LetterboxEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@ToString   @Builder
public class MemberEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mno;
    private String mname; // 닉네임 저장
    private String memail; // 아이디 저장
    private String mrole; // 권한

    @OneToMany(mappedBy = "memberEntity")
    @Builder.Default
    @ToString.Exclude
    private List<LetterboxEntity> letterboxEntityList= new ArrayList<>();


    public OauthDto toDto(){
        return OauthDto.builder()
                .mno(this.mno)
                .mname(this.mname)
                .memail(this.memail)
                .build();
    }

}
