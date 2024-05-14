import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import axios from 'axios';
import { saveAs } from 'file-saver';

const CrudPage = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs] = useState([
        { headerName: 'Number', field: 'number', sortable: true, filter: true },
        { headerName: 'Description', field: 'description', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        { headerName: 'Client', field: 'client', sortable: true, filter: true },
        { headerName: 'Total', field: 'total', sortable: true, filter: true },
        { headerName: 'Currency', field: 'currency', sortable: true, filter: true },
        { headerName: 'Payment Status', field: 'paymentStatus', sortable: true, filter: true },
        { headerName: 'Status', field: 'status', sortable: true, filter: true },
    ]);

    useEffect(() => {
        axios.get('http://localhost:8888/api/invoice/listAll')
            .then(response => {
                if (response.data.success) {
                    setRowData(response.data.result);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const onExportClick = () => {
        const csvContent = 'data:text/csv;charset=utf-8,' + rowData.map(e => Object.values(e).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        saveAs(encodedUri, "data.csv");
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <button onClick={onExportClick}>Export CSV</button>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default CrudPage;
