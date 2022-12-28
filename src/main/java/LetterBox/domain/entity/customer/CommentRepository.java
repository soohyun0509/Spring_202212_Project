package LetterBox.domain.entity.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Query(value = "select * from comment where bno=:bno", nativeQuery = true)
    List<CommentEntity> findByBno(@Param("bno") int bno);

}
