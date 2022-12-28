package LetterBox.domain.entity.customer;

import LetterBox.domain.dto.CustomerDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer> {

    @Query(value = "select * from customer where bcno=:bcno" , nativeQuery = true)
    List<CustomerEntity> findByBcno(@Param("bcno") int bcno);

                                                // bcno이 0이면 카테고리 일치여부없이 전부다 가져오겠다구
    @Query(value = "select * from customer where if(:bcno=0, bcno like'%%' ,bcno=:bcno) " +
            "and if(:key='', true, if(:key='btitle' , btitle like %:keyword% , bcontent like %:keyword%))",nativeQuery = true)
    Page<CustomerEntity> findBySelect(@Param("bcno") int bcno, @Param("key") String key, @Param("keyword") String keyword, Pageable pageable);

    @Query(value = "select * from customer where bno=:bno and bpassword=:bpassword", nativeQuery = true)
    Optional<CustomerEntity> findByBpassword(@Param("bno") int bno , @Param("bpassword") String bpassword);



}
