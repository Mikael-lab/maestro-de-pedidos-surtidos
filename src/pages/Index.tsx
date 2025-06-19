
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PedidosIndicator from "@/components/PedidosIndicator";
import AdminPanel from "@/components/AdminPanel";
import ExecutiveInterface from "@/components/ExecutiveInterface";
import CampaignManager from "@/components/CampaignManager";
import ExecutiveStatusView from "@/components/ExecutiveStatusView";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Users } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showExecutiveStatus, setShowExecutiveStatus] = useState(false);

  // Mock data para los indicadores
  const pedidosPorVencer = 847;
  const pedidosVencidos = 400;
  const ejecutivosActivos = 8;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Sistema de Cadena de Suministro</h1>
              <p className="text-slate-600">Gestión de Pedidos y Distribución</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Sistema Activo
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">Departamento de Compras</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="text-sm font-medium">
              Dashboard Principal
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="text-sm font-medium">
              Gestión de Campañas
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-sm font-medium">
              Configuración
            </TabsTrigger>
            <TabsTrigger value="executive" className="text-sm font-medium">
              Vista Ejecutivos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    Pedidos por Vencer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{pedidosPorVencer.toLocaleString()}</div>
                  <p className="text-sm text-slate-500">Con fecha promesa próxima</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Pedidos Vencidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{pedidosVencidos.toLocaleString()}</div>
                  <p className="text-sm text-slate-500">Fecha promesa vencida</p>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowExecutiveStatus(true)}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Ejecutivos Activos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{ejecutivosActivos}/10</div>
                  <p className="text-sm text-slate-500">Disponibles hoy</p>
                </CardContent>
              </Card>
            </div>
            <PedidosIndicator />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <CampaignManager />
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <AdminPanel />
          </TabsContent>

          <TabsContent value="executive" className="space-y-6">
            <ExecutiveInterface />
          </TabsContent>
        </Tabs>
      </div>

      {/* Executive Status Modal */}
      <ExecutiveStatusView 
        isOpen={showExecutiveStatus}
        onClose={() => setShowExecutiveStatus(false)}
      />
    </div>
  );
};

export default Index;
