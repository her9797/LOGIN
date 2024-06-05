// import React, { useEffect, useState } from 'react';
// import ProposalApi from '../../apis/ProposalApi';
// // import '../../css/proposal/ProposalPage.css';

// const ProposalPage = ({ memberId }) => {
//     const [proposals, setProposals] = useState([]);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const proposalsPerPage = 8;

//     useEffect(() => {
//         const fetchProposals = async () => {
//             try {
//                 const data = await ProposalApi.getProposals(memberId);
//                 if(Array.isArray(data)) {
//                     setProposals(data);
//                 } else {
//                     console.error('Proposal data is not an array:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching proposals:', error);
//             }
//         };
    
//         fetchProposals();
//     }, [memberId]);

//     useEffect(() => {
//         const checkAdminStatus = async () => {
//             try {
//                 const response = await ProposalApi.checkIsAdmin(memberId);
//                 setIsAdmin(response.isAdmin);
//             } catch (error) {
//                 console.error('Error checking admin status:', error);
//             }
//         };

//         checkAdminStatus();
//     }, [memberId]);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const paginatedProposals = proposals.slice(
//         currentPage * proposalsPerPage,
//         (currentPage + 1) * proposalsPerPage
//     );

//     const totalPages = Math.ceil(proposals.length / proposalsPerPage);

//     return (
//         <main id="main" className="main">
//             <div className="pagetitle">
//                 <h1>{isAdmin ? '관리자 건의 조회' : '건의 조회'}</h1>
//                 <nav>   
//                     <ol className="breadcrumb">
//                         <li className="breadcrumb-item"><a href="/">Home</a></li>
//                         <li className="breadcrumb-item">건의함</li>
//                         <li className="breadcrumb-item active">{isAdmin ? '관리자 건의 조회' : '건의 조회'}</li>
//                     </ol>
//                 </nav>
//             </div>
//             <div className="col-lg-12">
//                 <div className="card">
//                     <div className="card-body">
//                         <h5 className="card-title">{isAdmin ? '관리자 건의 목록' : '건의 목록'}</h5>
//                         <p>작성자와 관리자만 확인이 가능합니다.</p>
//                         <table className="table table-striped">
//                             <thead>
//                             <tr>
//                                 {isAdmin && <th scope="col">순번</th>}
//                                 <th scope="col">내용</th>
//                                 <th scope="col">작성일</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {paginatedProposals.length > 0 ? (
//                                 paginatedProposals.map((proposal, index) => (
//                                     <tr key={index}>
//                                         {isAdmin && <td>{currentPage * proposalsPerPage + index + 1}</td>}
//                                         <td>{proposal.content}</td>
//                                         <td>{proposal.date}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={isAdmin ? "3" : "2"} style={{ textAlign: 'center' }}>
//                                         {isAdmin ? '건의가 없습니다.' : '작성된 건의가 없습니다.'}
//                                     </td>
//                                 </tr>
//                             )}
//                             </tbody>
//                         </table>
//                         <nav style={{ display: 'flex', justifyContent: 'center' }}>
//                             <ul className="pagination">
//                                 <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
//                                     <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
//                                 </li>
//                                 {Array.from({ length: totalPages }, (_, i) => (
//                                     <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//                                         <button className="page-link" onClick={() => handlePageChange(i)}>
//                                             {i + 1}
//                                         </button>
//                                     </li>
//                                 ))}
//                                 <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
//                                     <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default ProposalPage;


import React, { useEffect, useState } from 'react';
// import ProposalApi from '../../apis/ProposalApi';
// import '../../css/proposal/ProposalPage.css';

const ProposalPage = ({ memberId }) => {
    const [proposals, setProposals] = useState([
        { content: "건의합니다", date: "2024-04-31" },
        { content: "체육 대회 불참 건의", date: "2024-05-01" },
        { content: "급여 정산 건의", date: "2024-05-07" },
        { content: "연차 휴가, 촉진제도 연장 건의", date: "2024-05-24" },
        { content: "구내식당 잔반처리 건의", date: "2024-05-24" },
        { content: "사내 규율 추가 건의", date: "2024-05-28" },
        { content: "생일자 조기퇴근 건의", date: "2024-05-31" },
        // Add more proposals as needed
    ]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const proposalsPerPage = 8;

    useEffect(() => {
        // Commenting out API calls for hardcoded data
        // const fetchProposals = async () => {
        //     try {
        //         const data = await ProposalApi.getProposals(memberId);
        //         if(Array.isArray(data)) {
        //             setProposals(data);
        //         } else {
        //             console.error('Proposal data is not an array:', data);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching proposals:', error);
        //     }
        // };
    
        // fetchProposals();
    }, [memberId]);

    useEffect(() => {
        // Commenting out API calls for hardcoded data
        // const checkAdminStatus = async () => {
        //     try {
        //         const response = await ProposalApi.checkIsAdmin(memberId);
        //         setIsAdmin(response.isAdmin);
        //     } catch (error) {
        //         console.error('Error checking admin status:', error);
        //     }
        // };

        // checkAdminStatus();
    }, [memberId]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedProposals = proposals.slice(
        currentPage * proposalsPerPage,
        (currentPage + 1) * proposalsPerPage
    );

    const totalPages = Math.ceil(proposals.length / proposalsPerPage);

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>{isAdmin ? '관리자 건의함' : '건의함'}</h1>
                <nav>   
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item">건의함</li>
                        <li className="breadcrumb-item active">{isAdmin ? '관리자 건의 조회' : '건의 조회'}</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        {/* <h5 className="card-title">{isAdmin ? '관리자 건의 목록' : '건의 목록'}</h5>
                        <p>작성자와 관리자만 확인이 가능합니다.</p> */}
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                {isAdmin && <th scope="col">순번</th>}
                                <th scope="col">내용</th>
                                <th scope="col">작성일</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedProposals.length > 0 ? (
                                paginatedProposals.map((proposal, index) => (
                                    <tr key={index}>
                                        {isAdmin && <td>{currentPage * proposalsPerPage + index + 1}</td>}
                                        <td>{proposal.content}</td>
                                        <td>{proposal.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isAdmin ? "3" : "2"} style={{ textAlign: 'center' }}>
                                        {isAdmin ? '건의가 없습니다.' : '작성된 건의가 없습니다.'}
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
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(i)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
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
