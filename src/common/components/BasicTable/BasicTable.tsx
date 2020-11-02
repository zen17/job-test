import React, { useState } from 'react';
import { DataTabularFormRow } from '../../../components/DataTabularFromRow/DataTabularFormRow';

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
    const [record, setRecord] = useState<string>('');

    const headers = columnHeaders.map((header: string, index: number) => (
        <th key={index} scope="col">
            {header}
        </th>
    ));

    const fillTd = (recordProperties: string[], dataRecord: any) =>
        recordProperties.map((property, index: number) => (
            <td key={index}>
                <input
                    type="text"
                    onChange={(event) => setRecord(event.target.value)}
                    value={dataRecord[property]}
                />
            </td>
        ));

    const body = data.map((record, index: number) => (
        <tr key={index}>
            <th scope="row">{index}</th>
          <DataTabularFormRow index={record['index']} slot={record['slot']} city={record['city']} velocity={record['velocity']}/>
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
