
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Target, Play, Pause, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Executive {
  id: number;
  name: string;
  email: string;
  available: boolean;
}

interface Campaign {
  id: string;
  name: string;
  type: 'por_vencer' | 'vencidos';
  startDate: string;
  endDate: string;
  goal: number;
  progress: number;
  status: 'activa' | 'pausada' | 'completada';
  assignedExecutives: number[];
}

const CampaignManager = () => {
  const { toast } = useToast();
  const [selectedExecutives, setSelectedExecutives] = useState<number[]>([]);
  const [campaignGoal, setCampaignGoal] = useState(200);
  const [campaignType, setCampaignType] = useState<'por_vencer' | 'vencidos'>('por_vencer');
  const [campaignName, setCampaignName] = useState('');

  const executives: Executive[] = [
    { id: 1, name: "María González", email: "maria.g@company.com", available: true },
    { id: 2, name: "Carlos López", email: "carlos.l@company.com", available: true },
    { id: 3, name: "Ana Martínez", email: "ana.m@company.com", available: true },
    { id: 4, name: "Luis Rodríguez", email: "luis.r@company.com", available: true },
    { id: 5, name: "Carmen Díaz", email: "carmen.d@company.com", available: true },
    { id: 6, name: "Roberto Silva", email: "roberto.s@company.com", available: false },
    { id: 7, name: "Patricia Ruiz", email: "patricia.r@company.com", available: true },
    { id: 8, name: "Miguel Torres", email: "miguel.t@company.com", available: true },
    { id: 9, name: "Sofía Herrera", email: "sofia.h@company.com", available: false },
    { id: 10, name: "Diego Morales", email: "diego.m@company.com", available: false }
  ];

  const activeCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Campaña Pedidos por Vencer - Enero",
      type: 'por_vencer',
      startDate: "2024-06-19",
      endDate: "2024-06-19",
      goal: 150,
      progress: 89,
      status: 'activa',
      assignedExecutives: [1, 2, 3, 4, 5]
    },
    {
      id: "2", 
      name: "Campaña Pedidos Vencidos - Diciembre",
      type: 'vencidos',
      startDate: "2024-06-18",
      endDate: "2024-06-20",
      goal: 85,
      progress: 34,
      status: 'activa',
      assignedExecutives: [6, 7, 8]
    }
  ];

  const handleExecutiveToggle = (executiveId: number) => {
    setSelectedExecutives(prev => 
      prev.includes(executiveId)
        ? prev.filter(id => id !== executiveId)
        : [...prev, executiveId]
    );
  };

  const handleCreateCampaign = () => {
    if (!campaignName || selectedExecutives.length === 0) {
      toast({
        title: "Error",
        description: "Debe completar todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Campaña creada exitosamente",
      description: `Se creó "${campaignName}" con ${selectedExecutives.length} ejecutivos asignados`,
    });

    // Reset form
    setCampaignName('');
    setSelectedExecutives([]);
    setCampaignGoal(200);
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'activa': return 'bg-green-100 text-green-700';
      case 'pausada': return 'bg-yellow-100 text-yellow-700';
      case 'completada': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCampaignTypeColor = (type: string) => {
    return type === 'por_vencer' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      {/* Nueva Campaña */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Crear Nueva Campaña
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Nombre de la Campaña</Label>
              <Input
                id="campaign-name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Ej: Campaña Enero 2024"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Tipo de Campaña</Label>
              <Select value={campaignType} onValueChange={(value: 'por_vencer' | 'vencidos') => setCampaignType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="por_vencer">Pedidos por Vencer</SelectItem>
                  <SelectItem value="vencidos">Pedidos Vencidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-goal">Objetivo de Entregas</Label>
              <Input
                id="campaign-goal"
                type="number"
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(parseInt(e.target.value) || 0)}
                min={1}
              />
            </div>
          </div>

          {/* Selección de Ejecutivos */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Ejecutivos Disponibles</Label>
              <Badge variant="outline">
                {selectedExecutives.length} seleccionados
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {executives.map((executive) => (
                <div 
                  key={executive.id}
                  className={`flex items-center space-x-3 p-3 border rounded-lg ${
                    executive.available ? 'hover:bg-slate-50' : 'bg-gray-50 opacity-60'
                  }`}
                >
                  <Checkbox
                    id={`exec-${executive.id}`}
                    checked={selectedExecutives.includes(executive.id)}
                    onCheckedChange={() => handleExecutiveToggle(executive.id)}
                    disabled={!executive.available}
                  />
                  <div className="flex-1 min-w-0">
                    <label 
                      htmlFor={`exec-${executive.id}`}
                      className={`text-sm font-medium cursor-pointer ${
                        executive.available ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {executive.name}
                    </label>
                    <p className="text-xs text-slate-500 truncate">{executive.email}</p>
                  </div>
                  {!executive.available && (
                    <Badge variant="secondary" className="text-xs">No disponible</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCreateCampaign} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Crear y Activar Campaña
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campañas Activas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Campañas Activas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeCampaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium text-slate-900">{campaign.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={getCampaignTypeColor(campaign.type)}>
                      {campaign.type === 'por_vencer' ? 'Por Vencer' : 'Vencidos'}
                    </Badge>
                    <Badge className={getCampaignStatusColor(campaign.status)}>
                      {campaign.status === 'activa' ? 'Activa' : campaign.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Pause className="h-3 w-3 mr-1" />
                    Pausar
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completar
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-slate-500">Progreso</div>
                  <div className="text-lg font-semibold">{campaign.progress}/{campaign.goal}</div>
                  <Progress value={(campaign.progress / campaign.goal) * 100} className="h-2 mt-1" />
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Ejecutivos Asignados</div>
                  <div className="text-lg font-semibold">{campaign.assignedExecutives.length}</div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Período</div>
                  <div className="text-sm font-medium">{campaign.startDate} - {campaign.endDate}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignManager;
