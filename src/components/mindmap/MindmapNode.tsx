import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useMindmapStore } from '@/store/mindmapStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface MindmapNodeData {
  label: string;
  summary: string;
  level: number;
  hasChildren: boolean;
  isExpanded: boolean;
  nodeId: string;
  isDimmed?: boolean;
}

const getLevelStyles = (level: number, isSelected: boolean, isHovered: boolean, isDimmed: boolean) => {
  const baseStyles = "relative px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer min-w-[160px] max-w-[260px]";
  
  const levelConfig: Record<number, { bg: string; border: string; glow: string }> = {
    0: {
      bg: 'bg-node-root/20',
      border: 'border-node-root',
      glow: 'node-glow-root'
    },
    1: {
      bg: 'bg-node-level-1/20',
      border: 'border-node-level-1',
      glow: 'node-glow-1'
    },
    2: {
      bg: 'bg-node-level-2/20',
      border: 'border-node-level-2',
      glow: 'node-glow-2'
    },
    3: {
      bg: 'bg-node-level-3/20',
      border: 'border-node-level-3',
      glow: 'node-glow-3'
    },
  };

  const config = levelConfig[Math.min(level, 3)] || levelConfig[3];
  
  return cn(
    baseStyles,
    config.bg,
    config.border,
    (isSelected || isHovered) && config.glow,
    isSelected && 'ring-2 ring-offset-2 ring-offset-background',
    level === 0 ? 'ring-node-root' : '',
    level === 1 ? 'ring-node-level-1' : '',
    level === 2 ? 'ring-node-level-2' : '',
    level >= 3 ? 'ring-node-level-3' : '',
    isDimmed && 'opacity-30'
  );
};

const getLevelTextColor = (level: number) => {
  const colors: Record<number, string> = {
    0: 'text-node-root',
    1: 'text-node-level-1',
    2: 'text-node-level-2',
    3: 'text-node-level-3',
  };
  return colors[Math.min(level, 3)] || colors[3];
};

function MindmapNodeComponent({ data }: NodeProps) {
  const nodeData = data as unknown as MindmapNodeData;
  const { 
    selectedNodeId, 
    hoveredNodeId, 
    setSelectedNode, 
    setHoveredNode, 
    toggleNodeExpansion,
    editingNodeId,
    setEditingNode,
    updateNode,
    getConnectedEdgeIds
  } = useMindmapStore();

  const [editValue, setEditValue] = useState(nodeData.label);

  const isSelected = selectedNodeId === nodeData.nodeId;
  const isHovered = hoveredNodeId === nodeData.nodeId;
  const isEditing = editingNodeId === nodeData.nodeId;

  // Determine if this node should be dimmed
  const activeNodeId = hoveredNodeId || selectedNodeId;
  let isDimmed = false;
  if (activeNodeId && activeNodeId !== nodeData.nodeId) {
    const { parentId, childIds } = getConnectedEdgeIds(activeNodeId);
    const isConnected = parentId === nodeData.nodeId || childIds.includes(nodeData.nodeId);
    isDimmed = !isConnected;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditing) return;
    
    if (selectedNodeId === nodeData.nodeId && nodeData.hasChildren) {
      toggleNodeExpansion(nodeData.nodeId);
    } else {
      setSelectedNode(nodeData.nodeId);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditValue(nodeData.label);
    setEditingNode(nodeData.nodeId);
  };

  const handleEditSave = () => {
    if (editValue.trim()) {
      updateNode(nodeData.nodeId, { title: editValue.trim() });
      toast.success('Saved', { duration: 1500 });
    }
    setEditingNode(null);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      setEditingNode(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
      className={getLevelStyles(nodeData.level, isSelected, isHovered, isDimmed)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setHoveredNode(nodeData.nodeId)}
      onMouseLeave={() => setHoveredNode(null)}
    >
      {nodeData.level > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-muted-foreground !w-2 !h-2 !border-0"
        />
      )}
      
      <div className="flex items-start gap-2">
        {nodeData.hasChildren && (
          <button 
            className={cn(
              "mt-0.5 p-0.5 rounded transition-colors",
              getLevelTextColor(nodeData.level),
              "hover:bg-white/10"
            )}
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeExpansion(nodeData.nodeId);
            }}
          >
            {nodeData.isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleEditSave}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="h-7 text-sm font-semibold bg-background/50 border-primary/50"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h3 className={cn(
              "font-semibold text-sm leading-tight truncate",
              getLevelTextColor(nodeData.level)
            )}>
              {nodeData.label}
            </h3>
          )}
          {nodeData.level === 0 && !isEditing && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {nodeData.summary}
            </p>
          )}
        </div>
      </div>

      {nodeData.hasChildren && (
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-muted-foreground !w-2 !h-2 !border-0"
        />
      )}

      {/* Enhanced Tooltip on hover */}
      <AnimatePresence>
        {isHovered && !isSelected && !isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 
                       bg-popover/95 backdrop-blur-sm border border-border rounded-xl p-4 
                       shadow-2xl shadow-black/40 min-w-[220px] max-w-[300px]"
          >
            {/* Title in tooltip */}
            <h4 className={cn(
              "font-bold text-sm mb-2",
              getLevelTextColor(nodeData.level)
            )}>
              {nodeData.label}
            </h4>
            {/* Summary - max 2 lines */}
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {nodeData.summary}
            </p>
            {/* Pointer arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 
                            w-4 h-4 bg-popover/95 border-l border-t border-border 
                            rotate-45 rounded-tl-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(MindmapNodeComponent);
