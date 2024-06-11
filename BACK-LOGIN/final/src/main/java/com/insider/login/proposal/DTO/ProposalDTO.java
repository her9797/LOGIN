package com.insider.login.proposal.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProposalDTO {

    private int proposalId;

    private String proposalContent;

    private int memberId;

    private LocalDate proposalDate;

    private int receiverId;

    private String deleteYn;

    public ProposalDTO(String proposalContent, int memberId, LocalDate proposalDate) {
        this.proposalContent = proposalContent;
        this.memberId = memberId;
        this.proposalDate = proposalDate;
    }
    public int getId() {
        return this.proposalId;
    }


}
