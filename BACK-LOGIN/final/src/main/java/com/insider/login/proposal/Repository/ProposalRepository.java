package com.insider.login.proposal.Repository;

import com.insider.login.proposal.dto.ProposalDTO;
import com.insider.login.proposal.Entity.Proposal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {

}
