import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Clock, Package, CheckCircle, XCircle, AlertTriangle, Tag, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OrderDetailModal from "./OrderDetailModal";

interface Client {
  id: number;
  name: string;
  contact: string;
  phone: string;
  ordersCount: number;
  totalValue: number;
  urgentOrders: number;
}

interface Order {
  id: string;
  orderNumber: string;
  value: number;
  dueDate: string;
  status: 'completo' | 'parcial';
  positions: number;
  tags: string[];
}

interface ManagementResult {
  id: string;
  name: string;
  requiresTag: boolean;
}

const ExecutiveInterface = () => {
  const { toast } = useToast();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [managementResult, setManagementResult] = useState<string>('');
  const [customTag, setCustomTag] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const managementResults: ManagementResult[] = [
    { id: 'entrega_generada', name: 'Entrega Generada', requiresTag: false },
    { id: 'entrega_pospuesta', name: 'Entrega Pospuesta', requiresTag: true },
    { id: 'cliente_no_contesta', name: 'Cliente No Contesta', requiresTag: false },
    { id: 'requiere_autorizacion', name: 'Requiere Autorización', requiresTag: true },
    { id: 'pedido_cancelado', name: 'Pedido Cancelado', requiresTag: true }
  ];

  const availableTags = [
    'Acuerdo Cliente',
    'Falta Autorización',
    'Problema Logístico',
    'Cliente Ausente',
    'Requiere Validación',
    'Cambio de Fecha'
  ];

  // Mock data para el ejecutivo actual
  const executiveName = "María González";
  const dailyGoal = 25;
  const currentProgress = 12;

  const assignedClients: Client[] = [
    {
      id: 1,
      name: "PEMEX S.A. de C.V.",
      contact: "Ing. Roberto Méndez",
      phone: "+52 55 1234-5678",
      ordersCount: 3,
      totalValue: 125000,
      urgentOrders: 1
    },
    {
      id: 2,
      name: "CFE Suministrador",
      contact: "Lic. Ana Torres",
      phone: "+52 55 2345-6789",
      ordersCount: 2,
      totalValue: 85000,
      urgentOrders: 2
    },
    {
      id: 3,
      name: "Grupo Carso",
      contact: "Arq. Carlos Slim",
      phone: "+52 55 3456-7890",
      ordersCount: 1,
      totalValue: 60000,
      urgentOrders: 0
    },
    {
      id: 4,
      name: "Arca Continental",
      contact: "Srita. Laura García",
      phone: "+52 81 4567-8901",
      ordersCount: 4,
      totalValue: 150000,
      urgentOrders: 3
    },
    {
      id: 5,
      name: "Gruma S.A.B.",
      contact: "Sr. Juan González",
      phone: "+52 55 5678-9012",
      ordersCount: 2,
      totalValue: 90000,
      urgentOrders: 0
    },
    {
      id: 6,
      name: "Kimberly-Clark",
      contact: "Lic. Patricia López",
      phone: "+52 55 6789-0123",
      ordersCount: 3,
      totalValue: 110000,
      urgentOrders: 1
    },
    {
      id: 7,
      name: "Femsa S.A. de C.V.",
      contact: "Ing. Miguel Ángel",
      phone: "+52 81 7890-1234",
      ordersCount: 1,
      totalValue: 70000,
      urgentOrders: 0
    },
    {
      id: 8,
      name: "Grupo Bimbo",
      contact: "Srita. Sofía Pérez",
      phone: "+52 55 8901-2345",
      ordersCount: 2,
      totalValue: 95000,
      urgentOrders: 2
    }
  ];

  const clientOrders: { [key: number]: Order[] } = {
    1: [
      {
        id: 'PED-2024-001',
        orderNumber: 'PED-2024-001',
        value: 75000,
        dueDate: '2024-06-20',
        status: 'completo',
        positions: 3,
        tags: []
      },
      {
        id: 'PED-2024-002',
        orderNumber: 'PED-2024-002',
        value: 50000,
        dueDate: '2024-06-22',
        status: 'parcial',
        positions: 2,
        tags: ['Urgente']
      }
    ],
    2: [
      {
        id: 'PED-2024-003',
        orderNumber: 'PED-2024-003',
        value: 45000,
        dueDate: '2024-06-21',
        status: 'completo',
        positions: 1,
        tags: []
      }
    ],
    3: [
      {
        id: 'PED-2024-004',
        orderNumber: 'PED-2024-004',
        value: 60000,
        dueDate: '2024-06-23',
        status: 'completo',
        positions: 4,
        tags: []
      }
    ],
    4: [
      {
        id: 'PED-2024-005',
        orderNumber: 'PED-2024-005',
        value: 35000,
        dueDate: '2024-06-24',
        status: 'parcial',
        positions: 2,
        tags: ['Urgente']
      },
      {
        id: 'PED-2024-006',
        orderNumber: 'PED-2024-006',
        value: 40000,
        dueDate: '2024-06-25',
        status: 'parcial',
        positions: 3,
        tags: ['Urgente']
      },
      {
        id: 'PED-2024-007',
        orderNumber: 'PED-2024-007',
        value: 75000,
        dueDate: '2024-06-26',
        status: 'completo',
        positions: 5,
        tags: []
      },
      {
        id: 'PED-2024-008',
        orderNumber: 'PED-2024-008',
        value: 50000,
        dueDate: '2024-06-27',
        status: 'completo',
        positions: 4,
        tags: []
      }
    ],
    5: [
      {
        id: 'PED-2024-009',
        orderNumber: 'PED-2024-009',
        value: 40000,
        dueDate: '2024-06-28',
        status: 'completo',
        positions: 3,
        tags: []
      },
      {
        id: 'PED-2024-010',
        orderNumber: 'PED-2024-010',
        value: 50000,
        dueDate: '2024-06-29',
        status: 'completo',
        positions: 4,
        tags: []
      }
    ],
    6: [
      {
        id: 'PED-2024-011',
        orderNumber: 'PED-2024-011',
        value: 30000,
        dueDate: '2024-06-30',
        status: 'parcial',
        positions: 2,
        tags: ['Urgente']
      },
      {
        id: 'PED-2024-012',
        orderNumber: 'PED-2024-012',
        value: 80000,
        dueDate: '2024-07-01',
        status: 'completo',
        positions: 5,
        tags: []
      },
      {
        id: 'PED-2024-013',
        orderNumber: 'PED-2024-013',
        value: 60000,
        dueDate: '2024-07-02',
        status: 'completo',
        positions: 4,
        tags: []
      }
    ],
    7: [
      {
        id: 'PED-2024-014',
        orderNumber: 'PED-2024-014',
        value: 70000,
        dueDate: '2024-07-03',
        status: 'completo',
        positions: 5,
        tags: []
      }
    ],
    8: [
      {
        id: 'PED-2024-015',
        orderNumber: 'PED-2024-015',
        value: 45000,
        dueDate: '2024-07-04',
        status: 'parcial',
        positions: 3,
        tags: ['Urgente']
      },
      {
        id: 'PED-2024-016',
        orderNumber: 'PED-2024-016',
        value: 50000,
        dueDate: '2024-07-05',
        status: 'completo',
        positions: 4,
        tags: []
      }
    ]
  };

  const handleClientClick = (client: Client) => {
    setSelectedClient(selectedClient?.id === client.id ? null : client);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags(prev => [...prev, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleManagementSubmit = () => {
    if (!managementResult) {
      toast({
        title: "Error",
        description: "Debe seleccionar un resultado de gestión",
        variant: "destructive"
      });
      return;
    }

    const selectedResultObj = managementResults.find(r => r.id === managementResult);
    if (selectedResultObj?.requiresTag && selectedTags.length === 0) {
      toast({
        title: "Error", 
        description: "Este resultado requiere al menos una etiqueta",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Gestión registrada",
      description: `Resultado: ${selectedResultObj?.name}${selectedTags.length > 0 ? ` con etiquetas: ${selectedTags.join(', ')}` : ''}`,
    });

    // Reset form
    setManagementResult('');
    setSelectedTags([]);
    setIsOrderModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    return status === 'completo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  };

  const getStatusText = (status: string) => {
    return status === 'completo' ? 'Completo' : 'Parcial';
  };

  return (
    <div className="space-y-6">
      {/* Header del Ejecutivo */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Panel de {executiveName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-slate-600">Objetivo Diario</div>
              <div className="text-2xl font-bold text-blue-600">{dailyGoal}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Progreso Actual</div>
              <div className="text-2xl font-bold text-slate-900">{currentProgress}</div>
              <Progress value={(currentProgress / dailyGoal) * 100} className="h-2 mt-1" />
            </div>
            <div>
              <div className="text-sm text-slate-600">Clientes Asignados</div>
              <div className="text-2xl font-bold text-slate-900">{assignedClients.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Clientes Asignados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assignedClients.map((client) => (
            <div key={client.id} className="space-y-2">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedClient?.id === client.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleClientClick(client)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-slate-900">{client.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {client.contact}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-semibold text-slate-900">
                      ${client.totalValue.toLocaleString()} MXN
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{client.ordersCount} pedidos</Badge>
                      {client.urgentOrders > 0 && (
                        <Badge className="bg-red-100 text-red-700">
                          {client.urgentOrders} urgente{client.urgentOrders > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Órdenes del cliente seleccionado */}
              {selectedClient?.id === client.id && clientOrders[client.id] && (
                <div className="ml-4 space-y-2">
                  {clientOrders[client.id].map((order) => (
                    <div 
                      key={order.id}
                      className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleOrderClick(order)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-slate-800">{order.orderNumber}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {order.positions} posición{order.positions > 1 ? 'es' : ''}
                            </span>
                            {order.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">
                            ${order.value.toLocaleString()} MXN
                          </div>
                          <div className="text-xs text-slate-500">
                            Vence: {order.dueDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal de Detalle de Orden con Gestión */}
      <OrderDetailModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={selectedOrder}
        onManage={() => {}} // Keep existing functionality
      />

      {/* Panel de Registro de Gestión (cuando se abre el modal) */}
      {isOrderModalOpen && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Tag className="h-5 w-5" />
              Registrar Resultado de Gestión
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Resultado de la Gestión</Label>
              <Select value={managementResult} onValueChange={setManagementResult}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el resultado..." />
                </SelectTrigger>
                <SelectContent>
                  {managementResults.map((result) => (
                    <SelectItem key={result.id} value={result.id}>
                      {result.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {managementResults.find(r => r.id === managementResult)?.requiresTag && (
              <div className="space-y-3">
                <Label>Etiquetas (Requeridas)</Label>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar etiqueta personalizada..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                  />
                  <Button variant="outline" size="sm" onClick={handleAddCustomTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-slate-600">Etiquetas disponibles:</div>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedTags.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600">Etiquetas seleccionadas:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge key={tag} className="bg-blue-100 text-blue-800">
                          {tag}
                          <button 
                            onClick={() => handleTagToggle(tag)}
                            className="ml-1 hover:text-blue-600"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleManagementSubmit}>
                Registrar Gestión
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExecutiveInterface;
