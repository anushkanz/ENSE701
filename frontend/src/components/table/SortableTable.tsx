import React from "react";
interface SortableTableProps {
headers: { key: string; label: string }[];
data: any[];
}
const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
    <div className="space-y-12">
        <div className="pb-12">
            <table  className="min-w-full leading-normal">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider" key={header.key}>{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} >
                            {headers.map((header) => (
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" key={header.key}>{row[header.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
export default SortableTable;