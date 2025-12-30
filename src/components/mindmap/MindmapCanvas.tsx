import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionMode,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMindmapStore } from '@/store/mindmapStore';
import { MindmapNode } from '@/data/mindmapData';
import MindmapNodeComponent from './MindmapNode';

const nodeTypes = {
  mindmap: MindmapNodeComponent,
};

interface LayoutNode {
  id: string;
  x: number;
  y: number;
  level: number;
}

const calculateRadialLayout = (
  node: MindmapNode,
  expandedNodes: Set<string>,
  centerX: number = 0,
  centerY: number = 0,
  level: number = 0,
  startAngle: number = 0,
  endAngle: number = Math.PI * 2,
  parentId: string | null = null
): { nodes: LayoutNode[]; connections: Array<{ source: string; target: string }> } => {
  const nodes: LayoutNode[] = [];
  const connections: Array<{ source: string; target: string }> = [];
  
  nodes.push({ id: node.id, x: centerX, y: centerY, level });

  if (parentId) {
    connections.push({ source: parentId, target: node.id });
  }

  if (node.children && node.children.length > 0 && expandedNodes.has(node.id)) {
    const childCount = node.children.length;
    const angleStep = (endAngle - startAngle) / childCount;
    const radius = 200 + level * 80;

    node.children.forEach((child, index) => {
      const angle = startAngle + angleStep * (index + 0.5);
      const childX = centerX + Math.cos(angle) * radius;
      const childY = centerY + Math.sin(angle) * radius;
      
      const childAngleSpread = angleStep * 0.8;
      const childStartAngle = angle - childAngleSpread / 2;
      const childEndAngle = angle + childAngleSpread / 2;

      const childResult = calculateRadialLayout(
        child,
        expandedNodes,
        childX,
        childY,
        level + 1,
        childStartAngle,
        childEndAngle,
        node.id
      );

      nodes.push(...childResult.nodes);
      connections.push(...childResult.connections);
    });
  }

  return { nodes, connections };
};

export function MindmapCanvas() {
  const { getCurrentRoot, expandedNodes, selectedNodeId, hoveredNodeId, getConnectedEdgeIds } = useMindmapStore();
  const currentRoot = getCurrentRoot();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const findNodeData = useCallback((nodeId: string, root: MindmapNode): MindmapNode | null => {
    if (root.id === nodeId) return root;
    if (root.children) {
      for (const child of root.children) {
        const found = findNodeData(nodeId, child);
        if (found) return found;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const layout = calculateRadialLayout(currentRoot, expandedNodes);
    
    // Determine which edges are connected to the active node
    const activeNodeId = hoveredNodeId || selectedNodeId;
    let connectedNodeIds: Set<string> = new Set();
    
    if (activeNodeId) {
      connectedNodeIds.add(activeNodeId);
      const { parentId, childIds } = getConnectedEdgeIds(activeNodeId);
      if (parentId) connectedNodeIds.add(parentId);
      childIds.forEach(id => connectedNodeIds.add(id));
    }

    const flowNodes: Node[] = layout.nodes.map((layoutNode) => {
      const nodeData = findNodeData(layoutNode.id, currentRoot);
      
      // Determine if node should be dimmed
      const isDimmed = activeNodeId ? !connectedNodeIds.has(layoutNode.id) : false;
      
      return {
        id: layoutNode.id,
        type: 'mindmap',
        position: { x: layoutNode.x, y: layoutNode.y },
        data: {
          label: nodeData?.title || '',
          summary: nodeData?.summary || '',
          level: layoutNode.level,
          hasChildren: (nodeData?.children?.length || 0) > 0,
          isExpanded: expandedNodes.has(layoutNode.id),
          nodeId: layoutNode.id,
          isDimmed,
        },
      };
    });

    const flowEdges: Edge[] = layout.connections.map((conn, index) => {
      const isHighlighted = 
        conn.source === selectedNodeId || 
        conn.target === selectedNodeId ||
        conn.source === hoveredNodeId ||
        conn.target === hoveredNodeId;

      // Check if this edge is connected to the active node
      const isConnectedToActive = activeNodeId && (
        conn.source === activeNodeId || conn.target === activeNodeId
      );

      return {
        id: `edge-${index}`,
        source: conn.source,
        target: conn.target,
        type: 'smoothstep',
        animated: isHighlighted,
        style: {
          stroke: isHighlighted 
            ? 'hsl(199, 89%, 60%)' // Bright cyan glow
            : 'hsl(217, 33%, 35%)',
          strokeWidth: isHighlighted ? 3 : 1.5,
          opacity: activeNodeId ? (isConnectedToActive ? 1 : 0.2) : 1,
          filter: isHighlighted ? 'drop-shadow(0 0 6px hsl(199, 89%, 60%))' : 'none',
          transition: 'all 0.2s ease-out',
        },
      };
    });

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [currentRoot, expandedNodes, selectedNodeId, hoveredNodeId, findNodeData, setNodes, setEdges, getConnectedEdgeIds]);

  return (
    <div className="w-full h-full mindmap-grid rounded-2xl overflow-hidden border border-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={30} 
          size={1} 
          color="hsl(217, 33%, 20%)" 
        />
        <Controls 
          className="!bg-card !border-border !rounded-lg [&>button]:!bg-secondary [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-accent"
        />
        <MiniMap 
          className="!bg-card !border-border !rounded-lg"
          nodeColor={(node) => {
            const level = (node.data as any)?.level || 0;
            const colors = [
              'hsl(217, 91%, 60%)',
              'hsl(160, 84%, 39%)',
              'hsl(38, 92%, 50%)',
              'hsl(262, 83%, 58%)',
            ];
            return colors[Math.min(level, 3)];
          }}
          maskColor="hsl(222, 47%, 6%, 0.8)"
        />
      </ReactFlow>
    </div>
  );
}
