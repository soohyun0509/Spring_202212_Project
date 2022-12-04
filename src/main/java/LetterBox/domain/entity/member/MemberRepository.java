package LetterBox.domain.entity.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {

   @Query(value = "select * from member where memail= :memail and mrole= :mrole" , nativeQuery = true)
   Optional<MemberEntity> findByMemailAndMrole(@Param("memail") String memail , @Param("mrole") String mrole);

}
