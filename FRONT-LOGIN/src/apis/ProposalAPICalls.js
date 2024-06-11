import axios from 'axios';
import { POST_PROPOSAL } from "../modules/ProposalModule";

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
            const response = await axios.post('http://localhost:8080/proposals', proposalDTO, {headers});
            console.log(response);
            dispatch({ type: 'INSERT_PROPOSAL_SUCCESS', payload: response.data });
        } catch (error) {
            console.error('Failed to insert proposal', error);
            dispatch({ type: 'INSERT_PROPOSAL_FAILURE', payload: error });
        }
    };
};
