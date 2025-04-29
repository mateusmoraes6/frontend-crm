export function exportToCSV(clients, filename = 'clientes.csv') {
    if (!clients.length) return;

    const fields = [
        { label: 'Nome', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Telefone', key: 'phone' },
        { label: 'CPF', key: 'cpf' },
        { label: 'Endereço', key: 'address' },
        { label: 'Data de Nascimento', key: 'birthDate' },
        { label: 'Cadastrado em', key: 'createdAt' }
    ];

    // Cabeçalho
    const header = fields.map(f => f.label).join(';');

    // Linhas de dados
    const rows = clients.map(client =>
        fields.map(field => {
            let value = client[field.key] || '';
            // Datas no formato ISO para o Excel reconhecer
            if ((field.key === 'createdAt' || field.key === 'birthDate') && value) {
                try {
                    value = new Date(value).toISOString().split('T')[0];
                } catch {
                    // Se não for data válida, mantém o valor original
                }
            }
            // Só coloca aspas se houver ponto e vírgula, aspas ou quebra de linha
            if (typeof value === 'string' && /[;"\n]/.test(value)) {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(';')
    );

    const csvContent = '\uFEFF' + [header, ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
