package LetterBox.domain.dto;

import LetterBox.domain.entity.customer.CommentEntity;
import lombok.*;

@NoArgsConstructor  @AllArgsConstructor
@ToString   @Builder    @Getter @Setter
public class CommentDto {

    private int cno;
    private String comment;
    private int bno;


    public CommentEntity toEntity(){
        return CommentEntity.builder()
                .cno(this.cno)
                .comment(this.comment)
                .build();
    }


}


