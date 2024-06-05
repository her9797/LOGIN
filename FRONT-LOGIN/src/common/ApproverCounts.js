import { callApproverCountsAPI } from '../apis/InsiteAPICalls';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../css/ApproverCounts.css';
import { decodeJwt } from '../utils/tokenUtils';

function ApproverCounts() {
    const dispatch = useDispatch();
    const [approverCounts, setApproverCounts] = useState('');
    const token = window.localStorage.getItem("accessToken");

    const memberInfo = decodeJwt(token);
    const memberId = memberInfo.memberId;
    console.log(memberId)

    useEffect(() => {
        const fetchApproverCounts = async () => {
            try {
                const response = await dispatch(callApproverCountsAPI(memberId));
                setApproverCounts(response.data);
            } catch (error) {
                console.error('Error fetching approval counts:', error);
            }
        };

        fetchApproverCounts(memberId);
    }, [dispatch]);




    return (
        <div className="approver-counts-container">
            <div className="approver-counts-body">
                <h7 className="approver-counts-title">결재 대기 건수</h7>

                <div className="approver-content-container">
                    <div className="approver-text-container">
                        <span className="approver-percentage">{approverCounts}<span>건</span></span>
                    </div>
                    <div className="approver-icon-container">
                        <i className="bi bi-stopwatch"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApproverCounts;
