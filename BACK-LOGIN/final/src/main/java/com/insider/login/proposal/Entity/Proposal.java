package com.insider.login.proposal.Entity;

import com.insider.login.proposal.dto.ProposalDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Table(name = "proposal")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proposal_id")
    private int proposalId;

    @Column(name = "content")
    private String proposalContent;

    @Column(name = "member_id")
    private int memberId;

    @Column(name = "receiver_id")
    private int receiverId;

    @Column(name = "created_at")
    private String proposalDate;

    @Column(name = "delete_yn")
    private String deleteYn;


}
