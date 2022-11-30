package LetterBox.domain.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LetterCategoryRepository extends JpaRepository<LetterCategoryEntity, Integer> {

}
