package com.insider.login.proposal.Service;

import com.insider.login.announce.dto.AnnounceDTO;
import com.insider.login.announce.entity.AncFile;
import com.insider.login.announce.entity.Announce;
import com.insider.login.common.CommonController;
import com.insider.login.proposal.dto.ProposalDTO;
import com.insider.login.proposal.Entity.Proposal;
import com.insider.login.proposal.Repository.ProposalRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class ProposalService {


    private ProposalRepository proposalRepository;

    private ModelMapper modelMapper;

    @Autowired
    public ProposalService(ProposalRepository proposalRepository, ModelMapper modelMapper) {
        this.proposalRepository = proposalRepository;
        this.modelMapper = modelMapper;
    }



    /** 건의 등록 */
    public Map<String, Object> insertProposal(ProposalDTO proposalDTO) {
        Map<String, Object> result = new HashMap<>();

        proposalDTO.setProposalDate(CommonController.nowDate());
        proposalDTO.setDeleteYn("N");

        try {
            Proposal proposal = modelMapper.map(proposalDTO, Proposal.class);
            proposalRepository.save(proposal);
            result.put("result", true);
        } catch (Exception e) {
            log.error(e.getMessage());
            result.put("result", false);
        }

        return result;
    }

    /** 건의 조회 */
    public Page<ProposalDTO> selectProposalList(Pageable pageable) {
        Page<Proposal> proposals;

        proposals = proposalRepository.findAll(pageable);

        if (proposals != null) {
            return proposals.map(proposal -> modelMapper.map(proposal, ProposalDTO.class));
        } else {
            return Page.empty();
        }

    }

    public Map<String, Object> deleteProposal(int proposalId) {

        Map<String, Object> result = new HashMap<>();
        result.put("result", true);

        // 공지사항과 파일을 동시에 삭제 : 동일한 트랜잭션 내 로직
        Proposal proposoal = proposalRepository.findByProposalId(proposalId);
        if (proposoal != null) {

            proposalRepository.delete(proposoal);
        }
        return result;

    }
}
