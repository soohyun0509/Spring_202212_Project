package LetterBox.controller;

import LetterBox.domain.dto.CategoryDto;
import LetterBox.domain.dto.CustomerDto;
import LetterBox.domain.dto.PageDto;
import LetterBox.domain.entity.customer.CustomerEntity;
import LetterBox.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // 게시글 작성
    @PostMapping("/setCustomer")
    public boolean setCustomer(CustomerDto customerDto){
        System.out.println(customerDto.toString());
            return customerService.setCustomer(customerDto);
    }

    // 카테고리 가져오기
    @GetMapping("/getCategory")
    public List<CategoryDto> getCategory(){
        return customerService.getCategory();
    }

    // 글 목록 출력
    @PostMapping("/getBoardList")
    public PageDto getBoardList(@RequestBody PageDto pageDto){
        return customerService.getBoardList(pageDto);
    }

    // 개별 게시글 출력
    @GetMapping("/getViewSelect")
    public CustomerDto getViewSelect(@RequestParam("bno") int bno){
        return customerService.getViewSelect(bno);
    }

}
