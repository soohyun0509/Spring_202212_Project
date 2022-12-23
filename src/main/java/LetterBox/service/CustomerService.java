package LetterBox.service;

import LetterBox.domain.dto.CustomerDto;
import LetterBox.domain.entity.customer.CategoryEntity;
import LetterBox.domain.entity.customer.CategoryRepository;
import LetterBox.domain.entity.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    // 게시물 등록
    @Transactional
    public boolean setCustomer(CustomerDto customerDto){

        // 카테고리 존재하는지 확인하고 등록하기

        customerRepository.save(customerDto.toEntity());




        return false;
    }


}
