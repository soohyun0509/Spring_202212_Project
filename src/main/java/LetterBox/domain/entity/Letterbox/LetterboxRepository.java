package LetterBox.domain.entity.Letterbox;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LetterboxRepository extends JpaRepository<LetterboxEntity, Integer> {

    @Query(value="select * from letterbox where mno= :mno" , nativeQuery = true)
    List<LetterboxEntity> findByMno(int mno);

}
