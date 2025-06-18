
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, User, Package, Calendar, Phone } from "lucide-react";
import OrderDetailModal from "@/components/OrderDetailModal";

interface Order {
  id: string;
  number: string;
  status: 'complete' | 'partial';
  items: number;
  value: number;
  promiseDate: string;
  positions: Array<{
    id: string;
    product: string;
    quantity: number;
    available: number;
    type: 'stock' | 'over_order';
  }>;
}

interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  orders: Order[];
}

const ExecutiveInterface = () => {
  const [expandedClients, setExpandedClients] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [executiveName] = useState("María González");

  const assignedClients: Client[] = [
    {
      id: "1",
      name: "Juan Pérez",
      company: "Industrias ABC S.A.",
      phone: "+52 55 1234-5678",
      email: "juan.perez@industriasabc.com",
      orders: [
        {
          id: "ORD-001",
          number: "PV-2024-001",
          status: 'complete',
          items: 5,
          value: 125000,
          promiseDate: "2024-01-15",
          positions: [
            { id: "1", product: "Tornillo M8", quantity: 100, available: 100, type: 'stock' },
            { id: "2", product: "Tuerca M8", quantity: 100, available: 100, type: 'over_order' }
          ]
        },
        {
          id: "ORD-002",
          number: "PV-2024-002",
          status: 'partial',
          items: 3,
          value: 85000,
          promiseDate: "2024-01-18",
          positions: [
            { id: "3", product: "Arandela M8", quantity: 200, available: 150, type: 'stock' },
            { id: "4", product: "Perno Especial", quantity: 50, available: 0, type: 'over_order' }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Ana Torres",
      company: "Construcciones XYZ",
      phone: "+52 55 9876-5432",
      email: "ana.torres@construccionesxyz.com",
      orders: [
        {
          id: "ORD-003",
          number: "PV-2024-003",
          status: 'complete',
          items: 8,
          value: 245000,
          promiseDate: "2024-01-20",
          positions: [
            { id: "5", product: "Varilla 3/8", quantity: 50, available: 50, type: 'stock' },
            { id: "6", product: "Alambrón", quantity: 100, available: 100, type: 'stock' }
          ]
        }
      ]
    },
    {
      id: "3",
      name: "Roberto Silva",
      company: "Metalmecánica DEF",
      phone: "+52 55 5555-1111",
      email: "roberto.silva@metaldef.com",
      orders: [
        {
          id: "ORD-004",
          number: "PV-2024-004",
          status: 'partial',
          items: 4,
          value: 95000,
          promiseDate: "2024-01-22",
          positions: [
            { id: "7", product: "Chapa metálica", quantity: 20, available: 12, type: 'stock' },
            { id: "8", product: "Perfil angular", quantity: 30, available: 30, type: 'over_order' }
          ]
        }
      ]
    }
  ];

  const toggleClient = (clientId: string) => {
    setExpandedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(c => c !== clientId)
        : [...prev, clientId]
    );
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const getTotalOrders = () => assignedClients.reduce((sum, client) => sum + client.orders.length, 0);
  const getCompleteOrders = () => assignedClients.reduce((sum, client) => 
    sum + client.orders.filter(order => order.status === 'complete').length, 0
  );
  const getPartialOrders = () => assignedClients.reduce((sum, client) => 
    sum + client.orders.filter(order => order.status === 'partial').length, 0
  );

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Ejecutivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{executiveName}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Clientes Asignados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{assignedClients.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Pedidos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{getTotalOrders()}</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                {getCompleteOrders()} Completos
              </Badge>
              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                {getPartialOrders()} Parciales
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Entregas Programadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-xs text-slate-500">Hoy</div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes y Pedidos Asignados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assignedClients.map((client) => (
            <div key={client.id} className="border rounded-lg">
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto hover:bg-slate-50"
                onClick={() => toggleClient(client.id)}
              >
                <div className="flex items-center gap-4">
                  {expandedClients.includes(client.id) ? (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  )}
                  <div className="text-left">
                    <div className="font-medium text-slate-900">{client.name}</div>
                    <div className="text-sm text-slate-500">{client.company}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{client.phone}</span>
                  </div>
                  <Badge variant="outline">
                    {client.orders.length} pedidos
                  </Badge>
                </div>
              </Button>
              
              {expandedClients.includes(client.id) && (
                <div className="px-4 pb-4 space-y-2 bg-slate-50/50">
                  {client.orders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex justify-between items-center p-3 bg-white rounded border hover:shadow-sm cursor-pointer transition-shadow"
                      onClick={() => handleOrderClick(order)}
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-4 w-4 text-slate-400" />
                        <div>
                          <div className="font-medium text-sm">{order.number}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {order.promiseDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right text-xs">
                          <div className="font-medium">${order.value.toLocaleString()}</div>
                          <div className="text-slate-500">{order.items} items</div>
                        </div>
                        <Badge 
                          variant={order.status === 'complete' ? 'default' : 'secondary'}
                          className={order.status === 'complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                        >
                          {order.status === 'complete' ? 'Completo' : 'Partial'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <OrderDetailModal 
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default ExecutiveInterface;
