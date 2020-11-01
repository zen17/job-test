import React from 'react';

export interface ErrorMessageProps {
    userFriendlyMessage: string;
}

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
    userFriendlyMessage
}: ErrorMessageProps) => {
    return (
        <div className="alert alert-danger" role="alert">
            {userFriendlyMessage}
        </div>
    );
};
