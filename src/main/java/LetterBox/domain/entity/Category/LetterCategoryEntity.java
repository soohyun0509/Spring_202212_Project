package LetterBox.domain.entity.Category;

import LetterBox.domain.entity.Letterbox.LetterboxEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lettercategory")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@ToString @Builder
public class LetterCategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cno;

    private String cname;

    @OneToMany(mappedBy = "letterCategoryEntity")
    @Builder.Default
    @ToString.Exclude
    private List<LetterboxEntity> letterboxEntityList=new ArrayList<>();

}
