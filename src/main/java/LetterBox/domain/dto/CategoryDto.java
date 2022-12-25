package LetterBox.domain.dto;

import LetterBox.domain.entity.customer.CategoryEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class CategoryDto {

    private int bcno;
    private String bctitle;

    public CategoryEntity toEntity(){
        return CategoryEntity.builder()
                .bcno(this.bcno)
                .bctitle(this.bctitle)
                .build();
    }



}

