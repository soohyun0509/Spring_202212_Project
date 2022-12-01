package LetterBox.domain.entity.member;

import LetterBox.domain.dto.MemberDto;
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

    private String mname;
    private String memail;
   // private String mpassword;

    @OneToMany(mappedBy = "memberEntity")
    @Builder.Default
    @ToString.Exclude
    private List<LetterboxEntity> letterboxEntityList= new ArrayList<>();


    public MemberDto toDto(){
        return MemberDto.builder()
                .mno(this.mno)
                .mname(this.mname)
                .memail(this.memail)
                .build();
    }

}
