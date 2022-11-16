import { useEffect, useState } from "react";
import axios from "axios";

interface LastCall {
  id: number;
  ticket_id: number;
  desk: string;
  created_at: string;
  type: string;
  ticket_name: string;
}
interface Ticket {
  ticket: string;
  desk: string;
}
interface TicketReport {
  id: number;
  name: string;
  number: number;
  type: string;
  desk: string;
  called: string;
  created_at: string;
  updated_at: string;
}
interface Report {
  createdTickets: {
    total: number;
    priorityTicketsCreated: number;
    generalTicketsCreated: number;
    testTicketsCreated: number;
  }
  calledTickets: {
    total: number;
    priorityTicketsCalled: number;
    generalTicketsCalled: number;
    testTicketsCalled: number;
  }
  detailedReport: TicketReport[];
}

export function Home() {
  const [lastCalled, setLastCalled] = useState<LastCall[]>([]);
  const [currentTicket, setCurrentTicket] = useState<Ticket>({
    ticket: "20000101-AA00",
    desk: "Nenhum",
  } as Ticket);
  const [dailyReport, setDailyReport] = useState<Report[]>([]);
  const [error, setError] = useState('');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    async function getData () {
      const { data }= await axios.get('http://localhost:8000/ticket/get-last-called');

      setLastCalled(data);
    }

    getData()
  }, [currentTicket]);

  useEffect(() => {
    alert('Filas vazias!')
  }, [error])

  const handleCall = async (deskNumber: string) => {
    const { data } = await axios.post('http://localhost:8000/ticket/call', { desk: deskNumber });

    if (data.error) {
      setError(data.error);
      return;
    }

    setCurrentTicket(data);
  }

  const handleTicket = async (type: string) => {
    await axios.post('http://localhost:8000/ticket/create', { type });
  }

  const getType = () => {
    const type = currentTicket.ticket?.split('-')[1];
    
    if (!type) return;

    if (type.includes('SP')) return 'Prioritário';
    if (type.includes('SE')) return 'Exame';
    if (type.includes('SG')) return 'Geral';
  }

  const getNumber = () => {
    let number = currentTicket.ticket?.split('-')[1];

    if (!number) return;

    number = number.replace(/\D/g, '');

    return number;
  }

  const handleReport = async () => {
    const { data } = await axios.get('http://localhost:8000/ticket/daily');

    setDailyReport(data);
    setShowReport(true);
    console.log({ report: data})
  }

  return (
    <div style={{ display: 'flex', height: '98vh', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50%'}}>
        <span style={{ fontSize: '248px'}}>{getNumber()}</span>
        <span style={{ fontSize: '108px', marginBottom: '50px'}}>{getType() || 'Preferencial'}</span>
        <span style={{ fontSize: '48px'}}>Guiche: {currentTicket.desk}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: "50px 0", width: '50%'}}>
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '30px'}}>Últimas senhas chamadas:</span>
          <ul>
            {lastCalled.map(ticket => {
              return (
                <li key={ticket.id}>
                  <span style={{ fontSize: '30px'}}>{ticket.ticket_name.includes('SP') ? 'Preferencial' : ticket.ticket_name.includes('SE') ? 'Exame' : 'Geral'} {ticket.ticket_name.split('-')[1].replace(/\D/g, '')} - GUICHE: {ticket.desk}</span>
                </li>
              )}
            )}
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}}>
          <div>
            <button style={{ cursor: 'pointer' }} onClick={() => handleTicket('SP')}>Criar Senha Preferencial</button>
            <button style={{ cursor: 'pointer' }} onClick={() => handleTicket('SE')}>Criar Senha Exames</button>
            <button style={{ cursor: 'pointer' }} onClick={() => handleTicket('SG')}>Criar Senha Geral</button>
          </div>

          <div style={{ margin: '20px 0'}}>
            <button style={{ cursor: 'pointer' }} onClick={() => handleCall('1')}>Chamar Guiche 1</button>
            <button style={{ cursor: 'pointer' }} onClick={() => handleCall('2')}>Chamar Guiche 2</button>
            <button style={{ cursor: 'pointer' }} onClick={() => handleCall('3')}>Chamar Guiche 3</button>
          </div>

          <button style={{ cursor: 'pointer' }} onClick={() => handleReport()}>Mostrar Relatorio do dia</button>
        </div>
      </div>
    </div>
  )
}
