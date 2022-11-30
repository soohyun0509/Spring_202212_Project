package LetterBox.domain.entity.Letterbox;

import LetterBox.domain.entity.BaseEntity;
import LetterBox.domain.entity.Category.LetterCategoryEntity;
import LetterBox.domain.entity.member.MemberEntity;
import lombok.*;

import javax.persistence.*;

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
    private String sendt; // 보낸 메시지



    // 연관관계
    // mno -> 받는 사람이 들어감!!!
    @ManyToOne
    @JoinColumn(name = "mno")
    @ToString.Exclude
    private MemberEntity memberEntity;

    // cno -> 편지함 종류
    @ManyToOne
    @JoinColumn(name = "cno")
    @ToString.Exclude
    private LetterCategoryEntity letterCategoryEntity;

}
