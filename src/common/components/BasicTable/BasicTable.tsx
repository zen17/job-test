import React from 'react';

export interface BasicTableProps {
    data: any[];
    columnHeaders: string[];
    recordProperties: string[];
}

export const BasicTable: React.FunctionComponent<BasicTableProps> = ({
    data,
    columnHeaders,
    recordProperties
}: BasicTableProps) => {

    const headers = columnHeaders.map((header: string, index: number) => (
        <th key={index} scope="col">
            {header}
        </th>
    ));

    const fillTd = (recordProperties: string[], dataRecord: any) =>
        recordProperties.map((property, index: number) => (
            <td key={index}>{dataRecord[property]}</td>
        ));

    const body = data.map((record, index: number) => (
        <tr key={index}>
            <th scope="row">{index}</th>
            {fillTd(recordProperties, record)}
        </tr>
    ));

    return (
        <table className="table">
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{body}</tbody>
        </table>
    );
};
