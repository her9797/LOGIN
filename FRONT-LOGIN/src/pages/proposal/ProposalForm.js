import React, { useState } from 'react';
import '../../css/proposal/proposalForm.css';
import '../../css/common.css';

function ProposalForm({ onSubmit }) {
    const [proposalContent, setProposalContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (proposalContent.trim() !== '') {
            onSubmit(proposalContent);
            setProposalContent('');
        }
    };

    return (
        <form className="proposal-form" onSubmit={handleSubmit}>
            <textarea className="form-group"
            type="text"
            id="proposalContent"
            value={proposalContent}
            onChange={(e) => setProposalContent(e.target.value)}>
            </textarea>
            <div className="button-group">
                <button type="submit" className="btn-positive" style={{padding: '5px'}}>등록</button>
            </div>
        </form>
    );
}

export default ProposalForm;
