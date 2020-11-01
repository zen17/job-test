import React from 'react';

export interface SubmitButtonProps {
    loading: boolean;
}

export const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
    loading
}: SubmitButtonProps) => {
    const submitButton = loading ? (
        <button className="btn btn-primary" type="button" disabled>
            <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </button>
    ) : (
        <button type="submit" className="btn btn-primary">
            Load
        </button>
    );

    return <>{submitButton}</>;
};
