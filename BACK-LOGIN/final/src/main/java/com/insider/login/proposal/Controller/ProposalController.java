package com.insider.login.proposal.Controller;

import com.insider.login.common.CommonController;
import com.insider.login.common.ResponseMessage;
import com.insider.login.proposal.Service.ProposalService;
import com.insider.login.proposal.dto.ProposalDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;

    @PostMapping("/proposals")
    public ResponseEntity<ResponseMessage> insertProposal(@RequestBody ProposalDTO proposalDTO) {

        proposalDTO.setProposalDate(LocalDate.now());

        return ResponseEntity.ok().body(new ResponseMessage(200, "등록 성공", proposalService.insertProposal(proposalDTO)));

    }

}
