import React, { useState } from 'react';
import '../../css/proposal/proposalForm.css';
import '../../css/common.css';
import { callInsertProposalAPI } from '../../apis/ProposalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import { useDispatch } from 'react-redux';

function ProposalForm({ onSubmit }) {
    const [proposalContent, setProposalContent] = useState('');
    const dispatch = useDispatch();

    const token = window.localStorage.getItem("accessToken");
    const memberInfo = decodeJwt(token);
    const memberId = memberInfo.memberId;

    const handleSubmit = async (event) => {
        event.preventDefault();  // 기본 제출 동작 방지
    
        const proposalDTO = {
            proposalContent: proposalContent,
            memberId: memberId,
            deleteYn: 'N'
        };
        console.log("Submitting proposalDTO:", proposalDTO);  // 디버깅용
        const result = await dispatch(callInsertProposalAPI(proposalDTO));
        onSubmit(result); // 제출된 건의 내용을 함께 전달 (API 응답에서 데이터 추출)
        setProposalContent(''); // 제출 후 텍스트 박스 비우기
    };

    return (
        <form className="proposal-form" onSubmit={handleSubmit}>
            <textarea className="form-group"
                id="proposalContent"
                value={proposalContent}
                onChange={(e) => setProposalContent(e.target.value)}
                placeholder="Enter your proposal here"
                rows="10"
                cols="50">
            </textarea>
            <div className="button-group">
                <button type="submit" className="btn-positive" style={{ padding: '5px' }}>등록</button>
            </div>
        </form>
    );
}

export default ProposalForm;
