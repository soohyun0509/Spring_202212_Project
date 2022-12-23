package LetterBox.domain.entity.customer;

import LetterBox.domain.dto.CustomerDto;
import LetterBox.domain.entity.BaseEntity;
import LetterBox.domain.entity.member.MemberEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="customer")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class CustomerEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bno;

    private String btitle;
    private String bcontent;
    private String bwriter;
    private String bfilename;
    private String bpassword;
    private int bview;



    @ManyToOne
    @JoinColumn(name = "bcno")
    @ToString.Exclude
    private CategoryEntity categoryEntity; // bcno 연관관계


    public CustomerDto toDto(){
        return CustomerDto.builder()
                .bno(this.bno)
                .btitle(this.btitle)
                .bcontent(this.bcontent)
                .bwriter(this.bwriter)
             /*   .bfilename(this.bfilename)*/
                .bpassword(this.bpassword)
                .bview(this.bview)
                .bcno(this.categoryEntity.getBcno())
                .build();
    }



}
