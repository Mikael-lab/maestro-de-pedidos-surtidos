
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PedidosIndicator from "@/components/PedidosIndicator";
import AdminPanel from "@/components/AdminPanel";
import ExecutiveInterface from "@/components/ExecutiveInterface";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="text-sm font-medium">
              Dashboard Principal
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-sm font-medium">
              Administración
            </TabsTrigger>
            <TabsTrigger value="executive" className="text-sm font-medium">
              Vista Ejecutivos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-slate-700">Pedidos Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">1,247</div>
                  <p className="text-sm text-slate-500">+12% vs mes anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-slate-700">Ejecutivos Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">8/10</div>
                  <p className="text-sm text-slate-500">Disponibles hoy</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-slate-700">Objetivo Campaña</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">67%</div>
                  <p className="text-sm text-slate-500">134/200 entregas</p>
                </CardContent>
              </Card>
            </div>
            <PedidosIndicator />
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <AdminPanel />
          </TabsContent>

          <TabsContent value="executive" className="space-y-6">
            <ExecutiveInterface />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
