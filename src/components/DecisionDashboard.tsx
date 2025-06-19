import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, ArrowLeft, Play, Flag, DollarSign, Clock, Star } from "lucide-react";

interface ExceptionOrder {
  id: string;
  customerName: string;
  orderNumber: string;
  value: number;
  dueDate: string;
  flags: string[];
  reason: string;
  selected: boolean;
}

interface DecisionDashboardProps {
  onConfirm: () => void;
  onBack: () => void;
}

const DecisionDashboard = ({ onConfirm, onBack }: DecisionDashboardProps) => {
  const [sortBy, setSortBy] = useState<'dueDate' | 'value' | 'customer'>('dueDate');
  const [exceptionOrders, setExceptionOrders] = useState<ExceptionOrder[]>([
    {
      id: '1',
      customerName: 'PEMEX S.A. de C.V.',
      orderNumber: 'PED-2024-001',
      value: 75000,
      dueDate: '2024-06-20',
      flags: ['Cliente VIP', 'Alto Valor'],
      reason: 'Pedido de alto valor requiere confirmación ejecutiva',
      selected: true
    },
    {
      id: '2',
      customerName: 'CFE Suministrador',
      orderNumber: 'PED-2024-015',
      value: 45000,
      dueDate: '2024-06-21',
      flags: ['Fecha Crítica'],
      reason: 'Fecha de entrega en menos de 48 horas',
      selected: true
    },
    {
      id: '3',
      customerName: 'Grupo Carso',
      orderNumber: 'PED-2024-008',
      value: 120000,
      dueDate: '2024-06-25',
      flags: ['Cliente VIP', 'Alto Valor'],
      reason: 'Cliente VIP con pedido de alto valor',
      selected: false
    },
    {
      id: '4',
      customerName: 'Arca Continental',
      orderNumber: 'PED-2024-022',
      value: 60000,
      dueDate: '2024-06-22',
      flags: ['Alto Valor'],
      reason: 'Pedido de alto valor requiere autorización',
      selected: true
    },
    {
      id: '5',
      customerName: 'Femsa Logística',
      orderNumber: 'PED-2024-010',
      value: 35000,
      dueDate: '2024-06-23',
      flags: ['Fecha Crítica'],
      reason: 'Entrega urgente solicitada por el cliente',
      selected: false
    },
    {
      id: '6',
      customerName: 'Gruma S.A. de C.V.',
      orderNumber: 'PED-2024-028',
      value: 95000,
      dueDate: '2024-06-24',
      flags: ['Cliente VIP'],
      reason: 'Pedido recurrente de cliente VIP',
      selected: true
    },
    {
      id: '7',
      customerName: 'Sigma Alimentos',
      orderNumber: 'PED-2024-012',
      value: 55000,
      dueDate: '2024-06-26',
      flags: ['Alto Valor'],
      reason: 'Revisión de crédito necesaria antes del envío',
      selected: false
    },
    {
      id: '8',
      customerName: 'Grupo Bimbo',
      orderNumber: 'PED-2024-033',
      value: 80000,
      dueDate: '2024-06-27',
      flags: ['Cliente VIP', 'Fecha Crítica'],
      reason: 'Pedido de alta prioridad con fecha de entrega ajustada',
      selected: true
    }
  ]);

  const handleOrderToggle = (orderId: string) => {
    setExceptionOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, selected: !order.selected } : order
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = exceptionOrders.every(order => order.selected);
    setExceptionOrders(prev => 
      prev.map(order => ({ ...order, selected: !allSelected }))
    );
  };

  const getFlagColor = (flag: string) => {
    switch (flag) {
      case 'Cliente VIP': return 'bg-purple-100 text-purple-700';
      case 'Alto Valor': return 'bg-orange-100 text-orange-700';
      case 'Fecha Crítica': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getFlagIcon = (flag: string) => {
    switch (flag) {
      case 'Cliente VIP': return <Star className="h-3 w-3" />;
      case 'Alto Valor': return <DollarSign className="h-3 w-3" />;
      case 'Fecha Crítica': return <Clock className="h-3 w-3" />;
      default: return <Flag className="h-3 w-3" />;
    }
  };

  const selectedCount = exceptionOrders.filter(order => order.selected).length;
  const totalReady = 450; // Pedidos listos para asignación

  return (
    <div className="space-y-6">
      {/* Header con resumen */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Dashboard de Decisión
                </CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Revise las excepciones que requieren su atención
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{totalReady}</div>
              <div className="text-sm text-slate-600">Pedidos listos para asignación</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-orange-600">{exceptionOrders.length}</div>
              <div className="text-sm text-slate-600">Excepciones que requieren revisión</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{selectedCount}</div>
              <div className="text-sm text-slate-600">Excepciones seleccionadas para incluir</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles y filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Excepciones para Revisión</CardTitle>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={(value: 'dueDate' | 'value' | 'customer') => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Por Fecha Promesa</SelectItem>
                  <SelectItem value="value">Por Valor</SelectItem>
                  <SelectItem value="customer">Por Cliente</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {exceptionOrders.every(order => order.selected) ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exceptionOrders.map((order) => (
              <div 
                key={order.id} 
                className={`border rounded-lg p-4 transition-all ${
                  order.selected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={order.selected}
                    onCheckedChange={() => handleOrderToggle(order.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">{order.customerName}</h3>
                        <p className="text-sm text-slate-500">{order.orderNumber}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">
                          ${order.value.toLocaleString()} MXN
                        </div>
                        <div className="text-sm text-slate-500">
                          Vence: {order.dueDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {order.flags.map((flag, index) => (
                        <Badge key={index} className={`${getFlagColor(flag)} flex items-center gap-1`}>
                          {getFlagIcon(flag)}
                          {flag}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-slate-600 italic">
                      {order.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Volver a Configuración
        </Button>
        <Button onClick={onConfirm} className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Confirmar y Activar Campaña
        </Button>
      </div>
    </div>
  );
};

export default DecisionDashboard;
