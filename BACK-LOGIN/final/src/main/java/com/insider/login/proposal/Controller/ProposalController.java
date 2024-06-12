package com.insider.login.proposal.Controller;

import com.insider.login.announce.dto.AnnounceDTO;
import com.insider.login.common.CommonController;
import com.insider.login.common.ResponseMessage;
import com.insider.login.proposal.Service.ProposalService;
import com.insider.login.proposal.dto.ProposalDTO;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;

    @PostMapping("/proposals")
    public ResponseEntity<ResponseMessage> insertProposal(@RequestBody ProposalDTO proposalDTO) {

        return ResponseEntity.ok().body(new ResponseMessage(200, "등록 성공", proposalService.insertProposal(proposalDTO)));

    }

    @GetMapping("/proposals")
    public ResponseEntity<ResponseMessage> selectProposalList(@RequestParam(value = "page", defaultValue = "0") int page,
                                                              @RequestParam(value = "size", defaultValue = "3") int size,
                                                              @RequestParam(value = "sort", defaultValue = "ancNo") String sort,
                                                              @RequestParam(value = "direction", defaultValue = "DESC") String direction) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Pageable pageable = CommonController.getPageable(page, size, sort, direction);

        Page<ProposalDTO> proposalList = proposalService.selectProposalList(pageable);

        if (proposalList.isEmpty()) {
            String errorMessage = "조회된 공지사항이 없습니다.";
            ResponseMessage responseMessage = new ResponseMessage(HttpStatus.NOT_FOUND.value(), errorMessage, null);
            return new ResponseEntity<>(responseMessage, headers, HttpStatus.NOT_FOUND);
        }

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("proposalList", proposalList.getContent());
        responseMap.put("currentPage", proposalList.getNumber());
        responseMap.put("totalItems", proposalList.getTotalElements());
        responseMap.put("totalPages", proposalList.getTotalPages());

        ResponseMessage responseMessage = new ResponseMessage(200, "조회 성공", responseMap);

        return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);
    }

}
