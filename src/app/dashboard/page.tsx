import { Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

// Mock de dados para a UI
const mockLeads = [
  {
    id: '1',
    name: 'Ana Cláudia Silva',
    phone: '+55 11 98765-4321',
    procedure: 'Lente de Contato Dental',
    status: 'SCHEDULING_REQUESTED',
    time: 'Há 5 min'
  },
  {
    id: '2',
    name: 'Roberto Mendes',
    phone: '+55 11 91234-5678',
    procedure: 'Implante',
    status: 'HUMAN_HANDOFF',
    time: 'Há 12 min'
  },
  {
    id: '3',
    name: 'Camila Rodrigues',
    phone: '+55 11 99988-7766',
    procedure: 'Clareamento',
    status: 'ENGAGED',
    time: 'Há 1 hora'
  },
  {
    id: '4',
    name: 'Marcos Paulo',
    phone: '+55 11 97766-5544',
    procedure: 'Avaliação Geral',
    status: 'SCHEDULED',
    time: 'Há 2 horas'
  }
];

export default function DashboardPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SCHEDULING_REQUESTED':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1"><Clock size={12}/> Solicitou Agendamento</span>;
      case 'HUMAN_HANDOFF':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1"><AlertTriangle size={12}/> Requer Atenção Humana</span>;
      case 'ENGAGED':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1"><Users size={12}/> Em Conversa</span>;
      case 'SCHEDULED':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle size={12}/> Agendado</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Novo</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads Recentes</h2>
          <p className="text-gray-500 mt-1">Acompanhe as interações da IA em tempo real.</p>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Leads Hoje</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Em Conversa</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Agendamentos Solicitados</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Transbordo (Alerta)</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">2</p>
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-800">Últimas Interações</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Nome do Lead</th>
                <th className="px-6 py-4 font-medium">Telefone</th>
                <th className="px-6 py-4 font-medium">Procedimento</th>
                <th className="px-6 py-4 font-medium">Status da IA</th>
                <th className="px-6 py-4 font-medium">Última Msg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.procedure}</td>
                  <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
