import React, { useState } from 'react';
import {DataTabularFormRow} from '../DataTabularFormRow/DataTabularFormRow';

export interface DataTabularFormProps {
  data: any[];
  columnHeaders: string[];
}

export const DataTabularForm: React.FunctionComponent<DataTabularFormProps> = ({
                                                                       data,
                                                                       columnHeaders,
                                                                     }: DataTabularFormProps) => {

  const headers = columnHeaders.map((header: string, index: number) => (
    <th key={index} scope="col">
      {header}
    </th>
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
