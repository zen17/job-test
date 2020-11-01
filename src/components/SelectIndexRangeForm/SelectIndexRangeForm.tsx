import React from 'react';
import { SubmitButton } from '../../common/components/SubmitButton/SubmitButton';

export interface SelectIndexRangeFormProps {
    onFormSubmit: (fromN: number, to: number) => void;
    loading: boolean;
}

export const SelectIndexRangeForm: React.FunctionComponent<SelectIndexRangeFormProps> = ({
    onFormSubmit,
    loading
}: SelectIndexRangeFormProps) => {
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            fromRange: { value: string };
            toRange: { value: string };
        };
        onFormSubmit(
            Number(target.fromRange.value),
            Number(target.toRange.value)
        );
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
                <label htmlFor="fromInput">From:</label>
                <input type="number" min="1" max="1000" defaultValue="1" className="form-control" id="fromRange" />
            </div>
            <div className="form-group">
                <label htmlFor="toInput">To:</label>
                <input type="number" className="form-control" min="1" max="1000" defaultValue="20" id="toRange" />
            </div>
            <SubmitButton loading={loading} />
        </form>
    );
};

export default SelectIndexRangeForm;
