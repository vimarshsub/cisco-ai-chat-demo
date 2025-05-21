
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { TableResponseData } from '@/types/multiStepScenario';

interface TableResponseProps {
  data: TableResponseData;
}

const TableResponse: React.FC<TableResponseProps> = ({ data }) => {
  const { headers, rows } = data;
  
  return (
    <div className="my-4 overflow-hidden border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableResponse;
