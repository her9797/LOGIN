import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnnouncementsAsync, setCurrentPage } from '../../modules/AnnounceModule';

function AnnouncementsList({ maxVisibleAnnouncements, hidePagination, hidePlus }) {
    const { announcements, currentPage, totalPages } = useSelector(state => state.announceReducer);
    const dispatch = useDispatch();

    const visibleAnnouncements = announcements.slice(0, maxVisibleAnnouncements); 

    useEffect(() => {
        dispatch(fetchAnnouncementsAsync(currentPage));
    }, [currentPage, dispatch]);

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage({ page: newPage }));
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            handlePageChange(currentPage + 1);
        }
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    const btnStyle = {
        width: '7%',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '90%'
    }

    // 페이지 번호를 표시할 범위를 계산합니다.
    const getPaginationRange = () => {
        const totalPageNumbers = 10;
        const halfPageNumbers = Math.floor(totalPageNumbers / 2);

        let start = currentPage - halfPageNumbers;
        let end = currentPage + halfPageNumbers;

        if (start < 0) {
            start = 0;
            end = totalPageNumbers;
        }

        if (end > totalPages) {
            start = totalPages - totalPageNumbers;
            end = totalPages;
        }

        return Array.from({ length: end - start }, (_, i) => i + start);
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="col-lg-12">
            <div className="card">
                {hidePlus && (
                    <div className='card-title' style={{fontWeight: 'bold', marginBottom: '-20px'}}>공지사항</div>
                )}
                {hidePlus ? (
                    <Link to="/Announces" style={{ padding: '10px 20px%', cursor: 'pointer', marginLeft: '93%', textDecoration: 'none', textAlign: 'center', marginTop: '10px', marginBottom: '10px', marginRight: '10px', fontSize: '12px' }}>+더보기</Link>
                ) : (
                    <div className='card-title'></div>
                )}

                <div className="ancListContent">
                    <table className="table table-hover">
                        <thead>
                            <tr style={{ backgroundColor: '#f9f9f9' }}>
                                <th style={{ width: '10%', textAlign: 'center', padding: '10px' }} scope="row">공지번호</th>
                                <th style={{ width: '40%', textAlign: 'center', padding: '10px' }} scope="row">제목</th>
                                <th style={{ width: '20%', textAlign: 'center', padding: '10px' }} scope="row">작성자</th>
                                <th style={{ width: '20%', textAlign: 'center', padding: '10px' }} scope="row">작성일자</th>
                                <th style={{ width: '10%', textAlign: 'center', padding: '10px' }} scope="row">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleAnnouncements.map((announce, index) => (
                                <tr key={index}>
                                    <td style={{ width: '10%', textAlign: 'center', padding: '10px' }}>{announce.ancNo}</td>
                                    <td style={{ width: '40%', textAlign: 'center', padding: '10px' }}>
                                        <Link className="linkWithoutUnderline" to={`/announces/${announce.ancNo}`}>{announce.ancTitle}</Link>
                                    </td>
                                    <td style={{ width: '20%', textAlign: 'center', padding: '10px' }}>{announce.ancWriter}</td>
                                    <td style={{ width: '20%', textAlign: 'center', padding: '10px' }}>{announce.ancDate}</td>
                                    <td style={{ width: '10%', textAlign: 'center', padding: '10px' }}>{announce.hits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!hidePagination && (
                        <nav style={paginationStyle}>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handlePrevPage}>◀</button>
                                </li>
                                {paginationRange.map((page) => (
                                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(page)}>
                                            {page + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handleNextPage}>▶</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnnouncementsList;