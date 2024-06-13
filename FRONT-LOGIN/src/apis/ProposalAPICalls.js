import axios from 'axios';
import { GET_PROPOSALS, POST_PROPOSAL } from "../modules/ProposalModule";

const API_BASE_URL = 'http://localhost:8080';

const getAccessToken = () => {
    return window.localStorage.getItem('accessToken') || '';
};

const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: '*/*',
    Authorization: 'Bearer ' + getAccessToken(),
};


export const callInsertProposalAPI = (proposalDTO) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:8080/proposals', proposalDTO, { headers });
            console.log(response);
            dispatch({ type: 'INSERT_PROPOSAL_SUCCESS', payload: response.data });
        } catch (error) {
            console.error('Failed to insert proposal', error);
            dispatch({ type: 'INSERT_PROPOSAL_FAILURE', payload: error });
        }
    };
};

export const callProposalListsAPI = (page = 0, size = 3, sort = 'proposalId', direction = 'DESC') => {
    return async (dispatch) => {
        try {
            const proposalListResponse = await axios.get(`${API_BASE_URL}/proposals?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, { headers });
            const proposalList = proposalListResponse.data.results;
            dispatch({ type: GET_PROPOSALS, payload: proposalList });
            console.log('proposalListResponse', proposalListResponse);
        } catch (error) {
            console.error("Failed to fetch proposals:", error);
        }
    };
};

export const callDeleteProposalAPI = (proposalId) => {
    return async (dispatch) => {
        try {
            const deleleteProposalResponse = await axios.delete(`${API_BASE_URL}/proposals/${proposalId}`, { headers });
            dispatch({ type: 'delete proposal', payload : deleleteProposalResponse.data})
        } catch (error) {
            console.error("Failed to delete proposals:", error);
        }
    }
}