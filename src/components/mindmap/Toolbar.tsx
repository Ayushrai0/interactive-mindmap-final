import React from 'react';
import { 
  Expand, 
  Shrink, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  FileJson
} from 'lucide-react';
import { useMindmapStore } from '@/store/mindmapStore';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Toolbar() {
  const { 
    expandAll, 
    collapseAll, 
    drillDown, 
    drillUp, 
    addChildNode,
    selectedNodeId,
    drillPath,
    data
  } = useMindmapStore();
  
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const handleExpandAll = () => {
    expandAll();
    toast.success('Expanded all nodes');
  };

  const handleCollapseAll = () => {
    collapseAll();
    toast.success('Collapsed to root');
  };

  const handleDrillDown = () => {
    if (selectedNodeId) {
      drillDown(selectedNodeId);
    } else {
      toast.error('Select a node first');
    }
  };

  const handleDrillUp = () => {
    if (drillPath.length > 0) {
      drillUp();
    } else {
      toast.info('Already at root level');
    }
  };

  const handleAddNode = () => {
    const parentId = selectedNodeId || 'root';
    addChildNode(parentId);
    toast.success('New node added');
  };

  const handleFitView = () => {
    fitView({ padding: 0.2, duration: 500 });
  };

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap-data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported as JSON');
  };

  const ToolbarButton = ({ 
    icon: Icon, 
    label, 
    onClick, 
    variant = 'default',
    disabled = false
  }: { 
    icon: React.ElementType; 
    label: string; 
    onClick: () => void;
    variant?: 'default' | 'primary';
    disabled?: boolean;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          disabled={disabled}
          className={variant === 'primary' ? 'toolbar-btn-primary' : 'toolbar-btn'}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className="glass-panel rounded-xl p-2 flex items-center gap-1 flex-wrap">
      <div className="flex items-center gap-1 pr-2 border-r border-border">
        <ToolbarButton icon={Expand} label="Expand All" onClick={handleExpandAll} />
        <ToolbarButton icon={Shrink} label="Collapse All" onClick={handleCollapseAll} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-border">
        <ToolbarButton 
          icon={ArrowUpRight} 
          label="Drill Down" 
          onClick={handleDrillDown}
          disabled={!selectedNodeId}
        />
        <ToolbarButton 
          icon={ArrowDownLeft} 
          label="Drill Up" 
          onClick={handleDrillUp}
          disabled={drillPath.length === 0}
        />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-border">
        <ToolbarButton icon={ZoomIn} label="Zoom In" onClick={() => zoomIn()} />
        <ToolbarButton icon={ZoomOut} label="Zoom Out" onClick={() => zoomOut()} />
        <ToolbarButton icon={Maximize2} label="Fit View" onClick={handleFitView} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-border">
        <ToolbarButton 
          icon={Plus} 
          label="Add Node" 
          onClick={handleAddNode}
          variant="primary"
        />
      </div>

      <div className="flex items-center gap-1 pl-2">
        <ToolbarButton icon={FileJson} label="Export JSON" onClick={handleExportJSON} />
      </div>
    </div>
  );
}
