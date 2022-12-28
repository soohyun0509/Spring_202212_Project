package LetterBox.controller;

import LetterBox.domain.dto.CategoryDto;
import LetterBox.domain.dto.CommentDto;
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

    // 댓글 등록
    @PostMapping("/setcomment")
    public boolean setcomment(@RequestBody CommentDto commentDto){
        return customerService.setcomment(commentDto);
    }

    // 댓글출력
    @GetMapping("/getcommentlist")
    public List<CommentDto> getcommentlist(@RequestParam("bno") int bno){
        return customerService.getcommentlist(bno);
    }

    // 게시글 삭제
    @DeleteMapping("/onDelete")
    public int onDelete(@RequestParam("bno") int bno ,@RequestParam("bpassword") String bpassword){
        return customerService.checkPW(0,bno, bpassword);
    }

    // 게시글 수정 비밀번호 확인
    @GetMapping("/onUpdate")
    public int onUpdate(@RequestParam("type") int type, @RequestParam("bno") int bno, @RequestParam("bpassword") String bpassword){
        return customerService.checkPW(type, bno, bpassword);
    }

    // 게시글 수정
    @PutMapping("/upBoard")
    public boolean upBoard(CustomerDto customerDto){
        System.out.println("컨트롤러 dto : " +customerDto);
        return customerService.upBoard(customerDto);
    }



}
