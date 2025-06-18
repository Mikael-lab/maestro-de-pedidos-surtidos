
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekData {
  range: string;
  count: number;
  urgent?: boolean;
}

interface MonthData {
  month: string;
  total: number;
  weeks: WeekData[];
  type: 'vencer' | 'vencido';
}

const PedidosIndicator = () => {
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  const pedidosVencer: MonthData[] = [
    {
      month: "Enero 2024",
      total: 150,
      type: 'vencer',
      weeks: [
        { range: "1 al 7 de enero", count: 24 },
        { range: "8 al 15 de enero", count: 30, urgent: true },
        { range: "16 al 23 de enero", count: 46 },
        { range: "24 al 31 de enero", count: 50 }
      ]
    },
    {
      month: "Febrero 2024",
      total: 120,
      type: 'vencer',
      weeks: [
        { range: "1 al 7 de febrero", count: 28 },
        { range: "8 al 15 de febrero", count: 32 },
        { range: "16 al 23 de febrero", count: 35 },
        { range: "24 al 29 de febrero", count: 25 }
      ]
    }
  ];

  const pedidosVencidos: MonthData[] = [
    {
      month: "Diciembre 2023",
      total: 85,
      type: 'vencido',
      weeks: [
        { range: "1 al 7 de diciembre", count: 15, urgent: true },
        { range: "8 al 15 de diciembre", count: 22, urgent: true },
        { range: "16 al 23 de diciembre", count: 28, urgent: true },
        { range: "24 al 31 de diciembre", count: 20, urgent: true }
      ]
    },
    {
      month: "Noviembre 2023",
      total: 45,
      type: 'vencido',
      weeks: [
        { range: "1 al 7 de noviembre", count: 8, urgent: true },
        { range: "8 al 15 de noviembre", count: 12, urgent: true },
        { range: "16 al 23 de noviembre", count: 15, urgent: true },
        { range: "24 al 30 de noviembre", count: 10, urgent: true }
      ]
    }
  ];

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths(prev => 
      prev.includes(monthKey) 
        ? prev.filter(m => m !== monthKey)
        : [...prev, monthKey]
    );
  };

  const renderMonthSection = (months: MonthData[], title: string, icon: React.ReactNode, colorClass: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {months.map((month, index) => (
          <div key={`${month.month}-${index}`} className="border rounded-lg">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto hover:bg-slate-50"
              onClick={() => toggleMonth(`${month.month}-${month.type}`)}
            >
              <div className="flex items-center gap-3">
                {expandedMonths.includes(`${month.month}-${month.type}`) ? (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                )}
                <span className="font-medium text-slate-900">{month.month}</span>
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "font-semibold",
                  month.type === 'vencer' ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"
                )}
              >
                {month.total}
              </Badge>
            </Button>
            
            {expandedMonths.includes(`${month.month}-${month.type}`) && (
              <div className="px-4 pb-4 space-y-2 bg-slate-50/50">
                {month.weeks.map((week, weekIndex) => (
                  <div 
                    key={weekIndex} 
                    className="flex justify-between items-center py-2 px-3 bg-white rounded border-l-2 border-l-slate-200 hover:border-l-blue-400 transition-colors"
                  >
                    <span className="text-sm text-slate-700">{week.range}</span>
                    <div className="flex items-center gap-2">
                      {week.urgent && (
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                      )}
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs",
                          week.urgent ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                        )}
                      >
                        {week.count}
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
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Pedidos sin Existencia - Vista Mensual/Semanal
        </h2>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>Por Vencer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span>Vencidos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderMonthSection(
          pedidosVencer,
          "Pedidos con Fecha Promesa por Vencer",
          <Clock className="h-5 w-5 text-yellow-600" />,
          "yellow"
        )}
        
        {renderMonthSection(
          pedidosVencidos,
          "Pedidos con Fecha Promesa Vencida",
          <AlertTriangle className="h-5 w-5 text-red-600" />,
          "red"
        )}
      </div>
    </div>
  );
};

export default PedidosIndicator;
