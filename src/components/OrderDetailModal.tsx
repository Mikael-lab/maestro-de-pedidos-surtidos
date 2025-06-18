
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Package, Calendar, CheckCircle, AlertCircle, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailModal = ({ order, isOpen, onClose }: OrderDetailModalProps) => {
  const [managementResult, setManagementResult] = useState("");
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  if (!order) return null;

  const handleSaveResult = () => {
    if (!managementResult) {
      toast({
        title: "Error",
        description: "Debe seleccionar un resultado de gestión",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Gestión registrada",
      description: `Resultado "${managementResult}" guardado para el pedido ${order.number}`,
    });

    // Reset form
    setManagementResult("");
    setComments("");
    onClose();
  };

  const getStatusIcon = (position: any) => {
    const isComplete = position.available >= position.quantity;
    return isComplete ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-yellow-500" />
    );
  };

  const getPositionStatus = (position: any) => {
    const isComplete = position.available >= position.quantity;
    return isComplete ? 'Disponible' : 'Parcial';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Detalle del Pedido {order.number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
            <div>
              <Label className="text-sm text-slate-600">Estado del Pedido</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={order.status === 'complete' ? 'default' : 'secondary'}
                  className={order.status === 'complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                >
                  {order.status === 'complete' ? 'Completo' : 'Parcial'}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm text-slate-600">Valor Total</Label>
              <div className="font-semibold text-lg mt-1">${order.value.toLocaleString()}</div>
            </div>
            <div>
              <Label className="text-sm text-slate-600">Fecha Promesa</Label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{order.promiseDate}</span>
              </div>
            </div>
          </div>

          {/* Positions Detail */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Posiciones del Pedido</h3>
            <div className="space-y-3">
              {order.positions.map((position) => (
                <div 
                  key={position.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(position)}
                    <div>
                      <div className="font-medium">{position.product}</div>
                      <div className="text-sm text-slate-500">
                        Tipo: {position.type === 'stock' ? 'Stock' : 'Sobre Pedido'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="font-medium">
                        {position.available}/{position.quantity}
                      </div>
                      <div className="text-slate-500">Disponible/Solicitado</div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={position.available >= position.quantity ? 
                        'bg-green-50 text-green-700 border-green-200' : 
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }
                    >
                      {getPositionStatus(position)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Management Result */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              Resultado de Gestión
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="result">Resultado de la Gestión *</Label>
                <Select value={managementResult} onValueChange={setManagementResult}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un resultado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrega_generada">Entrega Generada</SelectItem>
                    <SelectItem value="entrega_pospuesta">Entrega Pospuesta</SelectItem>
                    <SelectItem value="cliente_no_contesta">Cliente No Contesta</SelectItem>
                    <SelectItem value="cliente_rechaza">Cliente Rechaza</SelectItem>
                    <SelectItem value="pendiente_autorizacion">Pendiente Autorización</SelectItem>
                    <SelectItem value="cambio_direccion">Cambio de Dirección</SelectItem>
                    <SelectItem value="reagendar_contacto">Reagendar Contacto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comments">Comentarios Adicionales</Label>
                <Textarea
                  id="comments"
                  placeholder="Agregue comentarios si es necesario..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSaveResult}>
                Guardar Resultado
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
