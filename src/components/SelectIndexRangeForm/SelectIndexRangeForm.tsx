import React from 'react';
import { SubmitButton } from '../../common/components/SubmitButton/SubmitButton';

export interface SelectIndexRangeFormProps {
    onFormSubmit: () => void;
    loading: boolean;
}

export const SelectIndexRangeForm: React.FunctionComponent<SelectIndexRangeFormProps> = ({
    onFormSubmit,
    loading
}: SelectIndexRangeFormProps) => {
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onFormSubmit();
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
                <label htmlFor="fromInput">From:</label>
                <input type="number" className="form-control" id="form" />
            </div>
            <div className="form-group">
                <label htmlFor="toInput">To:</label>
                <input type="number" className="form-control" id="to" />
            </div>
            <SubmitButton loading={loading}/>
        </form>
    );
};

export default SelectIndexRangeForm;
