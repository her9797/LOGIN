package com.insider.login.proposal.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProposalDTO {

    private int proposalId;               // 건의 아이디

    private String proposalContent;        // 건의 내용

    private int memberId;          // 작성자 사번

    private LocalDate proposalDate;  // 건의 등록일자

    public ProposalDTO(String proposalContent, int memberId, LocalDate proposalDate) {
        this.proposalContent = proposalContent;
        this.memberId = memberId;
        this.proposalDate = proposalDate;
    }
    public int getId() {
        return this.proposalId;
    }


}
