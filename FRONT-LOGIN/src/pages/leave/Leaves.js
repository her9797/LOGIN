import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_PAGENUMBER } from '../../modules/LeaveModule';
import { callSelectLeavesAPI } from '../../apis/LeaveAPICalls';
import { renderLeaves } from '../../utils/leaveUtil';
import '../../css/leave/Leaves.css'
import '../../css/common.css'

function Leaves() {
    const { page } = useSelector(state => state.leaveReducer);
    const { number, content, totalPages } = page || {};
    const [properties, setProperties] = useState('memberId')
    const [direction, setDirection] = useState('DESC')
    const [isLoading, setIsLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const dispatch = useDispatch();

    // 조회 관련 핸들러
    const handlePageChange = page => dispatch({ type: SET_PAGENUMBER, payload: page });

    const handlePrevPage = () => {
        if (number > 0) {
            dispatch({ type: SET_PAGENUMBER, payload: number - 1 });
        }
    };

    const handleNextPage = () => {
        if (number < totalPages - 1) {
            dispatch({ type: SET_PAGENUMBER, payload: number + 1 });
        }
    };

    const handleSort = (propertie) => {
        setProperties(propertie);
        setDirection(direction === 'DESC' ? 'ASC' : 'DESC');
    }

    useEffect(() => {
        const resetNumber = async () => {
            try {
                await dispatch({ type: SET_PAGENUMBER, payload: 0 })
            } finally {
                setIsReset(true);
            }
        }
        resetNumber();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                await dispatch(callSelectLeavesAPI(number, properties, direction));
            } finally {
                setIsLoading(false);
            }
        };
        isReset
            && fetchData();
    }, [number, properties, direction, isReset]);

    return <main id="main" className="main">
        <div className="pagetitle">
            <h1>휴가</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item">휴가</li>
                    <li className="breadcrumb-item active">휴가 보유 내역 조회</li>
                </ol>
            </nav>
        </div>
        <div className="col-lg-12">
            <div className="card">
                <div className="myLeaveListContent" >
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <span>사원명</span>
                                </th>

                                <th onClick={() => handleSort('memberId')}>
                                    <span>사번</span><i className="bx bxs-sort-alt"></i>
                                </th>

                                <th><span>연차</span></th>

                                <th><span>특별 휴가</span></th>

                                <th><span>소진 일수</span></th>

                                <th><span>잔여 일수</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading
                                // 로딩 중이면 로딩 메시지 표시
                                ? <tr>
                                    <td colSpan="8" className="loadingText"></td>
                                </tr>
                                // 로딩 중이 아니면 실제 데이터 표시
                                : renderLeaves(content)
                            }
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${number === 0 || number === undefined && 'disabled'}`}>
                                <button className="page-link" onClick={handlePrevPage}>◀</button>
                            </li>
                            {[...Array(totalPages).keys()].map(page => (
                                <li key={page} className={`page-item ${number === page && 'active'}`}>
                                    <button className="page-link" onClick={() => handlePageChange(page)}>
                                        {page + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${number === totalPages - 1 || number === undefined && 'disabled'}`}>
                                <button className="page-link" onClick={handleNextPage}>▶</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </main>
}

export default Leaves;