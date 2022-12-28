package LetterBox.service;

import LetterBox.domain.dto.CategoryDto;
import LetterBox.domain.dto.CommentDto;
import LetterBox.domain.dto.CustomerDto;
import LetterBox.domain.dto.PageDto;
import LetterBox.domain.entity.customer.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CommentRepository commentRepository;
    // 카테고리 가져오기
    public List<CategoryDto> getCategory(){
        List<CategoryEntity> categoryEntities=categoryRepository.findAll();

        List<CategoryDto> categoryDtos=new ArrayList<>();
        for(CategoryEntity c : categoryEntities){
            CategoryDto categoryDto=c.toDto();
            categoryDtos.add(categoryDto);
        }
        return categoryDtos;

    }

    // 첨부파일 저장 경로

    //  링크 변경하기!!!!!!!
    String path="C:\\upload\\";


/*
    public boolean fileUpload(CustomerDto customerDto){
        if(!customerDto.getBfile())
    }
*/



    // 게시물 등록
    @Transactional
    public boolean setCustomer(CustomerDto customerDto){
        // 카테고리 존재하는지 확인하고 등록하기
        Optional<CategoryEntity> optional=categoryRepository.findById(customerDto.getBcno());
        if(optional.isPresent()){
            CustomerEntity customerEntity=customerRepository.save(customerDto.toEntity());
            customerEntity.setCategoryEntity(optional.get());
            optional.get().getCustomerEntityList().add(customerEntity);

            if(!customerDto.getBfile().getOriginalFilename().equals("")){

                String bfilename=customerDto.getBfile().getOriginalFilename();

            }

            return true;
        }
        return false;
    }

    // 게시물 출력
    public PageDto getBoardList(PageDto pageDto){
        Pageable pageable= PageRequest.of(pageDto.getPage()-1 , 5, Sort.by(Sort.Direction.DESC, "bno"));

        Page<CustomerEntity> entityPage =
                customerRepository.findBySelect(pageDto.getBcno(), pageDto.getKey(), pageDto.getKeyword() , pageable);

        int btncount=5;
        int startbtn=(pageDto.getPage()/btncount) * btncount+1;
        int endbtn=startbtn+btncount-1;

        if(endbtn > entityPage.getTotalPages()){
            endbtn=entityPage.getTotalPages();
        }


        List<CustomerDto>customerDtos=new ArrayList<>();
        for(CustomerEntity entity : entityPage){
            customerDtos.add(entity.toDto());
        }

        pageDto.setList(customerDtos);
        pageDto.setTotalBoards(entityPage.getTotalElements());

        System.out.println("엔티티들 : " +entityPage);
        System.out.println("총엔티티수 : " +entityPage.getTotalElements());
        System.out.println("총페이지수 : " +entityPage.getTotalPages());
        System.out.println("현재페이지수 : " +entityPage.getNumber());
        System.out.println("현재엔티티들 객체정보 : " +entityPage.getContent());
        System.out.println("현재 페이지의 게시물수 : " +entityPage.getNumberOfElements());
        System.out.println("현재 페이지가 첫페이지인지 여부확인 : " +entityPage.isFirst());
        System.out.println("현재 페이지가 마지막페이지인지 여부확인 : " +entityPage.isLast());

        return pageDto;
    }

    // 개별글 출력
    @Transactional
    public CustomerDto getViewSelect(int bno){
        Optional<CustomerEntity> optional= customerRepository.findById(bno);
        if(optional.isPresent()){
            CustomerEntity entity=optional.get();
            return entity.toDto();
        }
        return null;
    }

    // 댓글 등록
    @Transactional
    public boolean setcomment(CommentDto commentDto){
        Optional<CustomerEntity> optional=customerRepository.findById(commentDto.getBno());
        if(optional.isPresent()){
            CustomerEntity customerEntity=optional.get();

            CommentEntity commentEntity = commentRepository.save(commentDto.toEntity());
            if (!commentEntity.equals("")){
                commentEntity.setCustomerEntity(customerEntity);
                return true;
            }
        }
        return false;
    }

    // 댓글 출력
    public List<CommentDto> getcommentlist(int bno){
        System.out.println("bno" + bno);
        Optional<CustomerEntity> optional=customerRepository.findById(bno);
        if(optional.isPresent()){
            List<CommentEntity> commentEntities=commentRepository.findByBno(bno);

            List<CommentDto> commentDtos=new ArrayList<>();
            for (CommentEntity e : commentEntities){
                commentDtos.add(e.toDto());
            }
            return commentDtos;


        }

        return null;
    }


    // 게시글 삭제
    public int checkPW(int type, int bno, String bpassword){
        Optional<CustomerEntity> optional=customerRepository.findById(bno);
        if(optional.isPresent()) {
            // 비밀번호 일치 여부 판단
            Optional<CustomerEntity> optional2= customerRepository.findByBpassword(bno, bpassword);
            if(optional2.isPresent()){
                // 수정 메소드 이동
                if(type==1){ return 4;  }
                CustomerEntity customerEntity = optional2.get();
                customerRepository.delete(customerEntity);
                return 1; // 게시물 삭제 완료
            }
            return 2; // 비밀번호 틀림

        }
        return 3; // 게시물 없음
    }

    // 게시글 수정
    @Transactional
    public boolean upBoard(CustomerDto customerDto){
        Optional<CustomerEntity> optional=customerRepository.findById(customerDto.getBno());
        if(optional.isPresent()){
            CustomerEntity customerEntity=optional.get();
            customerEntity.setBtitle(customerDto.getBtitle());
            customerEntity.setBcontent(customerDto.getBcontent());
            return true;
        }
        return false;
    }

}
