package LetterBox.domain.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PageDto {

    private int bcno;
    private int page;
    private String key;
    private String keyword;

    @Builder.Default
    private List<CustomerDto> list=new ArrayList<>();

    private Long totalBoards;


}
