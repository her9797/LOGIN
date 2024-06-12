package com.insider.login.proposal.dto;

import jakarta.persistence.Column;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProposalDTO {

    private int proposalId;

    private String proposalContent;

    private int memberId;

    private String proposalDate;

    private int receiverId;

    private String deleteYn;

    public ProposalDTO(String proposalContent, int memberId, String proposalDate) {
        this.proposalContent = proposalContent;
        this.memberId = memberId;
        this.proposalDate = proposalDate;
    }
    public int getId() {
        return this.proposalId;
    }


}
