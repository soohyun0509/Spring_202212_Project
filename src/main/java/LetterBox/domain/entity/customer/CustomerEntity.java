package LetterBox.domain.entity.customer;

import LetterBox.domain.dto.CustomerDto;
import LetterBox.domain.entity.BaseEntity;
import LetterBox.domain.entity.member.MemberEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "customerEntity" , cascade = CascadeType.REMOVE)
    @ToString.Exclude
    @Builder.Default
    private List<CommentEntity> commentEntityList=new ArrayList<>();


    public CustomerDto toDto(){
        return CustomerDto.builder()
                .bno(this.bno)
                .btitle(this.btitle)
                .bcontent(this.bcontent)
                .bwriter(this.bwriter)
                .bpassword(this.bpassword)
                .bview(this.bview)
                .bcno(this.categoryEntity.getBcno())
                .bdate(
                        this.getCdate().toString().equals(LocalDateTime.now().toLocalDate().toString()) ?
                        this.getCdate().toLocalTime().format(DateTimeFormatter.ofPattern("HH : mm : ss")) :
                        this.getCdate().toLocalDate().toString()
                )
                .build();
    }



}
