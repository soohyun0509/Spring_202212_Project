package LetterBox.controller;

import LetterBox.domain.dto.CustomerDto;
import LetterBox.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
