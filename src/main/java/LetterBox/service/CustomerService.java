package LetterBox.service;

import LetterBox.domain.dto.CategoryDto;
import LetterBox.domain.dto.CustomerDto;
import LetterBox.domain.entity.customer.CategoryEntity;
import LetterBox.domain.entity.customer.CategoryRepository;
import LetterBox.domain.entity.customer.CustomerEntity;
import LetterBox.domain.entity.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    //  링크 변경하기!!!!!!!
    String path="C:\\Users\\user\\Desktop\\lettetbox\\src\\main\\resources\\static";

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
    public List<CustomerDto> getBoardList(){
        List<CustomerEntity> customerEntities=customerRepository.findAll();

        System.out.println(customerEntities.toString());

        List<CustomerDto>customerDtos=new ArrayList<>();
        for(CustomerEntity entity : customerEntities){
            System.out.println(entity.toString());
            System.out.println("ddddd"+entity.toDto());
            CustomerDto customerDto=entity.toDto();
            customerDtos.add(customerDto);
        }
        System.out.println(customerDtos.toString());
        return customerDtos;
    }






}
