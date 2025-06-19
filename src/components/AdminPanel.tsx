
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings, Users, Database, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemConfig {
  autoAssignment: boolean;
  notificationEmail: string;
  workingHours: {
    start: string;
    end: string;
  };
  maxOrdersPerExecutive: number;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    autoAssignment: true,
    notificationEmail: "admin@company.com",
    workingHours: {
      start: "08:00",
      end: "18:00"
    },
    maxOrdersPerExecutive: 50
  });

  const handleConfigUpdate = () => {
    toast({
      title: "Configuración actualizada",
      description: "Los cambios en la configuración del sistema han sido guardados",
    });
  };

  const handleDataSync = () => {
    toast({
      title: "Sincronización iniciada",
      description: "Los datos se están sincronizando con el sistema principal",
    });
  };

  const handleTestNotifications = () => {
    toast({
      title: "Notificación de prueba enviada",
      description: `Email enviado a ${systemConfig.notificationEmail}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuración del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              Configuración del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Asignación Automática</Label>
                  <p className="text-sm text-slate-500">
                    Asignar pedidos automáticamente a ejecutivos
                  </p>
                </div>
                <Switch
                  checked={systemConfig.autoAssignment}
                  onCheckedChange={(checked) => 
                    setSystemConfig(prev => ({ ...prev, autoAssignment: checked }))
                  }
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification-email">Email de Notificaciones</Label>
                <Input
                  id="notification-email"
                  type="email"
                  value={systemConfig.notificationEmail}
                  onChange={(e) => 
                    setSystemConfig(prev => ({ ...prev, notificationEmail: e.target.value }))
                  }
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-hour">Hora de Inicio</Label>
                  <Input
                    id="start-hour"
                    type="time"
                    value={systemConfig.workingHours.start}
                    onChange={(e) => 
                      setSystemConfig(prev => ({ 
                        ...prev, 
                        workingHours: { ...prev.workingHours, start: e.target.value }
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-hour">Hora de Fin</Label>
                  <Input
                    id="end-hour"
                    type="time"
                    value={systemConfig.workingHours.end}
                    onChange={(e) => 
                      setSystemConfig(prev => ({ 
                        ...prev, 
                        workingHours: { ...prev.workingHours, end: e.target.value }
                      }))
                    }
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-orders">Máximo de Pedidos por Ejecutivo</Label>
                <Input
                  id="max-orders"
                  type="number"
                  value={systemConfig.maxOrdersPerExecutive}
                  onChange={(e) => 
                    setSystemConfig(prev => ({ ...prev, maxOrdersPerExecutive: parseInt(e.target.value) || 0 }))
                  }
                  min={1}
                  max={100}
                />
              </div>
            </div>
            
            <Button onClick={handleConfigUpdate} className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
          </CardContent>
        </Card>

        {/* Herramientas Administrativas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              Herramientas del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Sincronización de Datos</div>
                  <div className="text-sm text-slate-500">
                    Actualizar datos desde el sistema principal
                  </div>
                </div>
                <Button variant="outline" onClick={handleDataSync}>
                  Sincronizar
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Prueba de Notificaciones</div>
                  <div className="text-sm text-slate-500">
                    Enviar email de prueba al administrador
                  </div>
                </div>
                <Button variant="outline" onClick={handleTestNotifications}>
                  <Bell className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Respaldo de Datos</div>
                  <div className="text-sm text-slate-500">
                    Crear respaldo de la configuración actual
                  </div>
                </div>
                <Button variant="outline">
                  Respaldar
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Reiniciar Sistema</div>
                  <div className="text-sm text-slate-500">
                    Reiniciar todos los servicios del sistema
                  </div>
                </div>
                <Button variant="outline">
                  Reiniciar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estado del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Estado del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.8%</div>
              <div className="text-sm text-slate-600">Disponibilidad</div>
              <Badge className="mt-2 bg-green-100 text-green-700">Óptimo</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-slate-600">Pedidos Procesados Hoy</div>
              <Badge className="mt-2 bg-blue-100 text-blue-700">Normal</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">45ms</div>
              <div className="text-sm text-slate-600">Tiempo de Respuesta</div>
              <Badge className="mt-2 bg-orange-100 text-orange-700">Bueno</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.1GB</div>
              <div className="text-sm text-slate-600">Uso de Memoria</div>
              <Badge className="mt-2 bg-purple-100 text-purple-700">Normal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
