
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Target, Activity, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Executive {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  assignedOrders: number;
  completedDeliveries: number;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const [activeExecutives, setActiveExecutives] = useState(8);
  const [campaignGoal, setCampaignGoal] = useState(200);
  const [currentProgress] = useState(134);

  const executives: Executive[] = [
    { id: 1, name: "María González", email: "maria.g@company.com", status: 'active', assignedOrders: 45, completedDeliveries: 32 },
    { id: 2, name: "Carlos López", email: "carlos.l@company.com", status: 'active', assignedOrders: 38, completedDeliveries: 28 },
    { id: 3, name: "Ana Martínez", email: "ana.m@company.com", status: 'active', assignedOrders: 42, completedDeliveries: 35 },
    { id: 4, name: "Luis Rodríguez", email: "luis.r@company.com", status: 'active', assignedOrders: 40, completedDeliveries: 30 },
    { id: 5, name: "Carmen Díaz", email: "carmen.d@company.com", status: 'active', assignedOrders: 35, completedDeliveries: 25 },
    { id: 6, name: "Roberto Silva", email: "roberto.s@company.com", status: 'active', assignedOrders: 33, completedDeliveries: 22 },
    { id: 7, name: "Patricia Ruiz", email: "patricia.r@company.com", status: 'active', assignedOrders: 29, completedDeliveries: 18 },
    { id: 8, name: "Miguel Torres", email: "miguel.t@company.com", status: 'active', assignedOrders: 31, completedDeliveries: 20 },
    { id: 9, name: "Sofía Herrera", email: "sofia.h@company.com", status: 'inactive', assignedOrders: 0, completedDeliveries: 0 },
    { id: 10, name: "Diego Morales", email: "diego.m@company.com", status: 'inactive', assignedOrders: 0, completedDeliveries: 0 }
  ];

  const handleUpdateExecutives = () => {
    toast({
      title: "Configuración actualizada",
      description: `Número de ejecutivos activos actualizado a ${activeExecutives}`,
    });
  };

  const handleUpdateGoal = () => {
    toast({
      title: "Objetivo actualizado",
      description: `Meta de campaña establecida en ${campaignGoal} entregas`,
    });
  };

  const toggleExecutiveStatus = (executiveId: number) => {
    toast({
      title: "Estado actualizado",
      description: "El estado del ejecutivo ha sido modificado",
    });
  };

  const progressPercentage = (currentProgress / campaignGoal) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Configuración de Ejecutivos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Ejecutivos Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="executives">Número de Ejecutivos Activos</Label>
              <div className="flex gap-2">
                <Input
                  id="executives"
                  type="number"
                  value={activeExecutives}
                  onChange={(e) => setActiveExecutives(parseInt(e.target.value) || 0)}
                  min={1}
                  max={10}
                  className="flex-1"
                />
                <Button onClick={handleUpdateExecutives} size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              <span className="font-medium">{activeExecutives}/10</span> ejecutivos disponibles
            </div>
          </CardContent>
        </Card>

        {/* Objetivo de Campaña */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Objetivo de Campaña
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Meta de Entregas</Label>
              <div className="flex gap-2">
                <Input
                  id="goal"
                  type="number"
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(parseInt(e.target.value) || 0)}
                  min={1}
                  className="flex-1"
                />
                <Button onClick={handleUpdateGoal} size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso</span>
                <span className="font-medium">{currentProgress}/{campaignGoal}</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
              <div className="text-xs text-slate-500">
                {progressPercentage.toFixed(1)}% completado
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen de Actividad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Actividad del Día
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">293</div>
                <div className="text-xs text-slate-500">Pedidos Asignados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">210</div>
                <div className="text-xs text-slate-500">Gestiones Realizadas</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">134</div>
              <div className="text-xs text-slate-500">Entregas Programadas</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Ejecutivos */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Ejecutivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {executives.map((executive) => (
              <div 
                key={executive.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {executive.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{executive.name}</div>
                    <div className="text-sm text-slate-500">{executive.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="font-medium text-slate-900">
                      {executive.assignedOrders} asignados
                    </div>
                    <div className="text-slate-500">
                      {executive.completedDeliveries} entregas
                    </div>
                  </div>
                  
                  <Button
                    variant={executive.status === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleExecutiveStatus(executive.id)}
                  >
                    <Badge 
                      variant={executive.status === 'active' ? 'default' : 'secondary'}
                      className="cursor-pointer"
                    >
                      {executive.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
