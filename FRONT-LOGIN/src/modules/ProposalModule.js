import { createActions, handleActions } from 'redux-actions';

const initialState = {};

export const POST_PROPOSAL = 'proposal/POST_PROPOSAL';

const actions = createActions({
    [POST_PROPOSAL]: () => {},
});

const proposalReducer = handleActions({
    [POST_PROPOSAL]: (state, {payload}) => ({insertProposal: payload}),


}, initialState);

export default proposalReducer;