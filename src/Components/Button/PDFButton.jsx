import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PdfDownload = ({ data }) => {
    const downloadPdf = () => {
        const doc = new jsPDF('l', 'mm', 'a4');

        const columns = [
            { header: 'ID', dataKey: 'id' },
            { header: 'Nome', dataKey: 'first_name' },
            { header: 'Sobrenome', dataKey: 'last_name' },
            { header: 'Data de Nascimento', dataKey: 'birthday' },
            { header: 'Sexo', dataKey: 'sex' },
            { header: 'CPF', dataKey: 'cpf' },
            { header: 'Tipo de Logradouro', dataKey: 'type' },
            { header: 'Logradouro', dataKey: 'street' },
            { header: 'Bairro', dataKey: 'bairro' },
            { header: 'Cidade', dataKey: 'cidade' },
            { header: 'Numero', dataKey: 'number' },
            { header: 'CEP', dataKey: 'cep' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Celular', dataKey: 'phone' },
        ];

        const rows = data.map(row => ({
            id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            birthday: row.birthday,
            sex: row.sex,
            cpf: row.cpf,
            type: row.type,
            street: row.street,
            bairro: row.bairro,
            cidade: row.cidade,
            number: row.number,
            cep: row.cep,
            email: row.email,
            phone: row.phone,
        }));

        doc.autoTable({
            columns: columns,
            body: rows,
            theme: 'grid',
            margin: { top: 10, right: 10, left: 10 },
            pageBreak: 'auto',
            styles: {
                overflow: 'linebreak',
                cellWidth: 'auto',
            },
            columnStyles: {
                id: { cellWidth: 8 },
                first_name: { cellWidth: 20 },
                last_name: { cellWidth: 20 },
                birthday: { cellWidth: 20 },
                sex: { cellWidth: 10 },
                cpf: { cellWidth: 20 },
                type: { cellWidth: 20 },
                street: { cellWidth: 30 },
                bairro: { cellWidth: 20 },
                cidade: { cellWidth: 20 },
                number: { cellWidth: 18 },
                cep: { cellWidth: 15 },
                email: { cellWidth: 30 },
                phone: { cellWidth: 20 },
            },
        });
        doc.save('table.pdf');
    };

    return (
        <button className="btn btn-primary mb-3" onClick={downloadPdf}>
            Exportar tabela para PDF
        </button>
    );
};

export default PdfDownload;
