
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Phone, Clock, CheckCircle } from "lucide-react";

interface ExecutiveStatus {
  id: number;
  name: string;
  email: string;
  status: 'activo' | 'ocupado' | 'descanso';
  assignedClients: number;
  contactedOrders: number;
  scheduledDeliveries: number;
  lastActivity: string;
}

interface ExecutiveStatusViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExecutiveStatusView = ({ isOpen, onClose }: ExecutiveStatusViewProps) => {
  const executiveStatuses: ExecutiveStatus[] = [
    {
      id: 1,
      name: "María González",
      email: "maria.g@company.com",
      status: 'activo',
      assignedClients: 15,
      contactedOrders: 32,
      scheduledDeliveries: 18,
      lastActivity: "09:45 AM"
    },
    {
      id: 2,
      name: "Carlos López", 
      email: "carlos.l@company.com",
      status: 'activo',
      assignedClients: 12,
      contactedOrders: 28,
      scheduledDeliveries: 15,
      lastActivity: "09:30 AM"
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana.m@company.com", 
      status: 'ocupado',
      assignedClients: 18,
      contactedOrders: 35,
      scheduledDeliveries: 22,
      lastActivity: "09:15 AM"
    },
    {
      id: 4,
      name: "Luis Rodríguez",
      email: "luis.r@company.com",
      status: 'activo',
      assignedClients: 14,
      contactedOrders: 30,
      scheduledDeliveries: 16,
      lastActivity: "09:50 AM"
    },
    {
      id: 5,
      name: "Carmen Díaz",
      email: "carmen.d@company.com",
      status: 'descanso',
      assignedClients: 0,
      contactedOrders: 25,
      scheduledDeliveries: 12,
      lastActivity: "08:45 AM"
    },
    {
      id: 6,
      name: "Roberto Silva",
      email: "roberto.s@company.com",
      status: 'activo',
      assignedClients: 13,
      contactedOrders: 22,
      scheduledDeliveries: 14,
      lastActivity: "09:35 AM"
    },
    {
      id: 7,
      name: "Patricia Ruiz",
      email: "patricia.r@company.com",
      status: 'activo',
      assignedClients: 16,
      contactedOrders: 29,
      scheduledDeliveries: 19,
      lastActivity: "09:25 AM"
    },
    {
      id: 8,
      name: "Miguel Torres",
      email: "miguel.t@company.com",
      status: 'ocupado',
      assignedClients: 11,
      contactedOrders: 26,
      scheduledDeliveries: 13,
      lastActivity: "09:40 AM"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activo': return 'bg-green-100 text-green-700 border-green-200';
      case 'ocupado': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'descanso': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'activo': return 'Disponible';
      case 'ocupado': return 'En llamada';
      case 'descanso': return 'En descanso';
      default: return 'Desconocido';
    }
  };

  const totalAssigned = executiveStatuses.reduce((sum, exec) => sum + exec.assignedClients, 0);
  const totalContacted = executiveStatuses.reduce((sum, exec) => sum + exec.contactedOrders, 0);
  const totalScheduled = executiveStatuses.reduce((sum, exec) => sum + exec.scheduledDeliveries, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-6 w-6 text-blue-600" />
            Estado de Ejecutivos
          </DialogTitle>
        </DialogHeader>

        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-900">{executiveStatuses.length}</div>
              <p className="text-sm text-slate-600">Ejecutivos Total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{totalAssigned}</div>
              <p className="text-sm text-slate-600">Clientes Asignados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{totalContacted}</div>
              <p className="text-sm text-slate-600">Pedidos Contactados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{totalScheduled}</div>
              <p className="text-sm text-slate-600">Entregas Programadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Ejecutivos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {executiveStatuses.map((executive) => (
            <Card key={executive.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {executive.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-base">{executive.name}</CardTitle>
                      <p className="text-sm text-slate-500">{executive.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(executive.status)}>
                    {getStatusText(executive.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">{executive.assignedClients}</div>
                    <div className="text-xs text-slate-500">Clientes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-orange-600">{executive.contactedOrders}</div>
                    <div className="text-xs text-slate-500">Contactados</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-600">{executive.scheduledDeliveries}</div>
                    <div className="text-xs text-slate-500">Programados</div>
                  </div>
                </div>
                
                {executive.assignedClients > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progreso de contacto</span>
                      <span>{Math.round((executive.contactedOrders / executive.assignedClients) * 100)}%</span>
                    </div>
                    <Progress value={(executive.contactedOrders / executive.assignedClients) * 100} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Última actividad: {executive.lastActivity}</span>
                  </div>
                  {executive.status === 'activo' && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>En línea</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExecutiveStatusView;
