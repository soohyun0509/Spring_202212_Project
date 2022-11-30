package LetterBox.domain.entity.Letterbox;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LetterboxRepository extends JpaRepository<LetterboxEntity, Integer> {
}
