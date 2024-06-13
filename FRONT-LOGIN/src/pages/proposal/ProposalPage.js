import React, { useEffect, useState, useCallback } from 'react';
import ProposalForm from './ProposalForm';
import { callProposalListsAPI } from '../../apis/ProposalAPICalls';
import { useSelector, useDispatch } from 'react-redux';

const ProposalPage = () => {
    const [proposalsPerPage] = useState(3); // 한 페이지에 표시할 건의 개수
    const { proposalList, totalPages, currentPage } = useSelector(state => state.proposalReducer.proposalList) || {}; // proposalList가 undefined일 때의 처리
    const dispatch = useDispatch();
    
    // fetchProposals 함수를 useCallback으로 정의
    const fetchProposals = useCallback(async (page = currentPage) => {
        try {
            await dispatch(callProposalListsAPI(page, proposalsPerPage, 'proposalId', 'DESC'));
        } catch (error) {
            console.error("Failed to fetch proposals:", error);
        }
    }, [currentPage, dispatch, proposalsPerPage]);

    useEffect(() => {
        fetchProposals();
    }, [fetchProposals]);

    const handleProposalSubmit = async (newProposal) => {
        // 새로운 제안이 제출된 후 proposalList를 업데이트
        await fetchProposals(0); // 페이지를 0으로 설정하여 첫 페이지에서 새롭게 업데이트된 제안을 포함하여 데이터를 다시 불러옴
    };

    const handlePageChange = (pageNumber) => {
        const nextPage = Math.max(0, Math.min(pageNumber, totalPages - 1));
        fetchProposals(nextPage);
    };

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item">건의함</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <ProposalForm onSubmit={handleProposalSubmit} />
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '50%', textAlign: 'center' }}>내용</th>
                                    <th scope="col" style={{ width: '10%', textAlign: 'center' }}>작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proposalList && proposalList.length > 0 ? (
                                    proposalList.map((proposal, index) => (
                                        <tr key={index}>
                                            <td style={{ width: '50%', height: '150px', textAlign: 'center' }}>{proposal.proposalContent}</td>
                                            <td style={{ width: '10%', height: '150px', textAlign: 'center' }}>{proposal.proposalDate.split(',').join('-')}</td>
                                            <td style={{ width: '35%', height: '150px', textAlign: 'right' }}>
                                                <button style={{ marginRight: '30px' }} className="btn-negative">삭제</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'center' }}>
                                            작성된 건의가 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <nav style={{ display: 'flex', justifyContent: 'center' }}>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                                </li>
                                {Array.from({ length: totalPages || 0 }, (_, i) => ( 
                                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(i)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === (totalPages ? totalPages - 1 : 0) ? 'disabled' : ''}`}> 
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProposalPage;
