package LetterBox.domain.entity.customer;

import LetterBox.domain.dto.CommentDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "comment")
@Builder    @ToString
@Getter @Setter @NoArgsConstructor  @AllArgsConstructor
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cno;

    private String comment;

    @ManyToOne
    @JoinColumn(name="bno")
    @ToString.Exclude
    private CustomerEntity customerEntity;


    public CommentDto toDto(){
        return CommentDto.builder()
                .cno(this.cno)
                .comment(this.comment)
                .bno(this.customerEntity.getBno())
                .build();
    }


}
