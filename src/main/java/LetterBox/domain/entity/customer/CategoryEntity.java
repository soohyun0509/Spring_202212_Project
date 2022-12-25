package LetterBox.domain.entity.customer;

import LetterBox.domain.dto.CategoryDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="category")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bcno;
    private String bctitle;


    @OneToMany(mappedBy = "categoryEntity")
    @Builder.Default
    @ToString.Exclude
    private List<CustomerEntity> customerEntityList=new ArrayList<>();


    public CategoryDto toDto(){
        return CategoryDto.builder()
                .bcno(this.bcno)
                .bctitle(this.bctitle)
                .build();
    }



}
