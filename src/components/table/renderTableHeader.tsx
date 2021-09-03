import React from "react";

export default function renderTableHeader(dataObject: object) {
    const header = Object.keys(dataObject);
    return (header.map((key, index) => {
        return key!=="id" ? (
            <th key={index}>
                {key}
            </th>
        ) : null;
    }));
}