package LetterBox.controller;

import LetterBox.domain.dto.CategoryDto;
import LetterBox.domain.dto.CustomerDto;
import LetterBox.domain.entity.customer.CustomerEntity;
import LetterBox.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/setCustomer")
    public boolean setCustomer(CustomerDto customerDto){
        System.out.println(customerDto.toString());
            return customerService.setCustomer(customerDto);
    }

    @GetMapping("/getCategory")
    public List<CategoryDto> getCategory(){
        return customerService.getCategory();
    }

    @GetMapping("/getBoardList")
    public List<CustomerDto> getBoardList(){
        return customerService.getBoardList();
    }

}
