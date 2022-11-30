package LetterBox.domain.entity;

import lombok.Getter;
import lombok.Setter;
import net.bytebuddy.asm.Advice;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter @Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate // 데이터 생성날짜 자동주입
    @Column(updatable = false)
    private LocalDateTime cdate; // 작성 날짜

    @LastModifiedDate
    private LocalDateTime udate; // (혹시라도) 변경 날짜
}
