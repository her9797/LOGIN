import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFormsAPI } from '../../apis/ApprovalAPI';
import insertStyles from '../../css/approval/SelectFormComponent.module.css';

const SelectFormComponent = ({ onSelectForm }) => {

    const dispatch = useDispatch();
    const forms = useSelector((state) => state.approval.forms);
    const loading = useSelector((state) => state.approval.loading);
    const error = useSelector((state) => state.approval.error);
    const [selectedForm, setSelectedForm] = useState('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(( ) => {
        dispatch(getFormsAPI());
    }, [dispatch]);

    useEffect(() => {
        //기본 폼 로드
        if(isInitialLoad && forms && forms.length > 0){
            const defaultForm = forms.find(form => form.formName === '기본');
            if(defaultForm){
                setSelectedForm(defaultForm.formNo);
                onSelectForm(defaultForm);
            }
            setIsInitialLoad(false);
        }
    }, [forms], onSelectForm, isInitialLoad);
    

    const handleSelectChange = (event) => {

        const selectedValue = event.target.value;
        let selectedForm;

        if(selectedValue === 'default'){
            selectedForm = forms.find(form => form.formName === '기본');
            
            // setSelectedForm(selectedForm.formNo);
        }
        else{
            selectedForm = forms.find(form => form.formNo === selectedValue);
        }

        setSelectedForm(selectedValue);
        onSelectForm(selectedForm);         //선택된 폼을 부모 컴포넌트로 전달

    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!Array.isArray(forms)) {
        return <div>Error: Invalid forms data</div>;
    }

    return (
        <div className={insertStyles.chooseForm}>
            <label htmlFor="formSelect " className={insertStyles.formSelectTitle}>양식 선택</label>

            <select id="formSelect" value={selectedForm} onChange={handleSelectChange}>
                {forms.map((form) => (
                    <option key={form.formNo} value={form.formNo}>
                        {form.formName}
                    </option>
                ))}
            </select>
            <div className={insertStyles.formAlert} style={{marginTop:'5px', marginLeft:'5px'}}>미 선택시 기본 양식이 선택됩니다.</div>

        </div>
    );
}

export default SelectFormComponent;