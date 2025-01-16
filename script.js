let guests = [];

function addGuest(name, quantity, whatsapp, status) {
    guests.push({ name, quantity, whatsapp, status });
    updateGuestList();
}

function updateGuestList() {
    const tbody = document.getElementById('guestList').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    guests.forEach(guest => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = guest.name;
        row.insertCell(1).innerText = guest.quantity;
        row.insertCell(2).innerText = guest.whatsapp;
        
        const statusCell = row.insertCell(3);
        statusCell.innerText = guest.status;
        statusCell.className = guest.status === 'Confirmado' ? 'status-confirmed' : 'status-pending';
    });

    updateSummary();
}

function updateSummary() {
    const totalConfirmed = guests
        .filter(g => g.status === 'Confirmado')
        .reduce((sum, g) => sum + g.quantity, 0);
    
    const totalPending = guests
        .filter(g => g.status === 'Pendente')
        .reduce((sum, g) => sum + g.quantity, 0);
    
    const totalInvited = guests.reduce((sum, g) => sum + g.quantity, 0);

    document.getElementById('totalConfirmed').innerText = `Total Confirmados: ${totalConfirmed}`;
    document.getElementById('totalPending').innerText = `Total Pendentes: ${totalPending}`;
    document.getElementById('totalInvited').innerText = `Total Convidados: ${totalInvited}`;
}

function generateReport() {
    const reportType = prompt("Digite 'C' para Confirmados ou 'P' para Pendentes:");
    let reportContent = '<h2>Relatório de Convidados</h2><table><tr><th>Nome</th><th>WhatsApp</th><th>Quantidade</th><th>Status</th></tr>';

    if (reportType.toUpperCase() === 'C') {
        guests.filter(g => g.status === 'Confirmado').forEach(guest => {
            reportContent += `<tr><td>${guest.name}</td><td>${guest.whatsapp}</td><td>${guest.quantity}</td><td class="status-confirmed">${guest.status}</td></tr>`;
        });
    } else if (reportType.toUpperCase() === 'P') {
        guests.filter(g => g.status === 'Pendente').forEach(guest => {
            reportContent += `<tr><td>${guest.name}</td><td>${guest.whatsapp}</td><td>${guest.quantity}</td><td class="status-pending">${guest.status}</td></tr>`;
        });
    } else {
        alert('Opção inválida.');
        return;
    }

    reportContent += '</table>';
    const reportWindow = window.open('', '', 'height=600,width=800');
    reportWindow.document.write('<html><head><title>Relatório</title><link rel="stylesheet" href="styles.css"></head><body>');
    reportWindow.document.write(reportContent);
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();
}

function saveReportAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const reportType = prompt("Digite 'C' para Confirmados ou 'P' para Pendentes:");
    let filteredGuests;

    if (reportType.toUpperCase() === 'C') {
        filteredGuests = guests.filter(g => g.status === 'Confirmado');
    } else if (reportType.toUpperCase() === 'P') {
        filteredGuests = guests.filter(g => g.status === 'Pendente');
    } else {
        alert('Opção inválida.');
        return;
    }

    // Adiciona título
    doc.setFontSize(18);
    doc.text('Relatório de Convidados', 14, 15);

    // Criação da tabela com os dados
    doc.autoTable({
        startY: 25,
        head: [['Nome', 'WhatsApp', 'Quantidade', 'Status']],
        body: filteredGuests.map(g => [g.name, g.whatsapp, g.quantity, g.status]),
        theme: 'striped'
    });

    // Salvar PDF
    doc.save('relatorio_convidados.pdf');
}

function printReport() {
    const printContent = document.getElementById('guestList').outerHTML;
    const win = window.open('', '', 'height=400,width=600');
    win.document.write('<html><head><title>Relatório</title>');
    win.document.write('</head><body>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}

// Adicionar convidados como exemplo
addGuest('Anielle Gonçalves', 3, '66 9994-3314', 'Confirmado');
addGuest('Maria Luiza', 5, '66 9999-4733', 'Pendente');
