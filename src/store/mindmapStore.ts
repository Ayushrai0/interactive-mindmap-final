import { create } from 'zustand';
import { MindmapNode, mindmapData } from '@/data/mindmapData';

interface MindmapState {
  data: MindmapNode;
  selectedNodeId: string | null;
  expandedNodes: Set<string>;
  hoveredNodeId: string | null;
  drillPath: string[];
  editingNodeId: string | null;

  
  showSaved: boolean;

  // Actions
  setSelectedNode: (nodeId: string | null) => void;
  setHoveredNode: (nodeId: string | null) => void;
  toggleNodeExpansion: (nodeId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  drillDown: (nodeId: string) => void;
  drillUp: () => void;
  addChildNode: (parentId: string) => void;
  updateNode: (nodeId: string, updates: Partial<MindmapNode>) => void;
  findNode: (nodeId: string) => MindmapNode | null;
  getCurrentRoot: () => MindmapNode;
  getNodeBreadcrumb: (nodeId: string) => string[];
  setEditingNode: (nodeId: string | null) => void;
  getConnectedEdgeIds: (nodeId: string) => { parentId: string | null; childIds: string[] };
}

const getAllNodeIds = (node: MindmapNode): string[] => {
  const ids = [node.id];
  if (node.children) {
    node.children.forEach(child => {
      ids.push(...getAllNodeIds(child));
    });
  }
  return ids;
};

const findNodeInTree = (node: MindmapNode, nodeId: string): MindmapNode | null => {
  if (node.id === nodeId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeInTree(child, nodeId);
      if (found) return found;
    }
  }
  return null;
};

const updateNodeInTree = (
  node: MindmapNode,
  nodeId: string,
  updates: Partial<MindmapNode>
): MindmapNode => {
  if (node.id === nodeId) {
    return { ...node, ...updates };
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map(child =>
        updateNodeInTree(child, nodeId, updates)
      ),
    };
  }
  return node;
};

const addChildToNode = (
  node: MindmapNode,
  parentId: string,
  newChild: MindmapNode
): MindmapNode => {
  if (node.id === parentId) {
    return {
      ...node,
      children: [...(node.children || []), newChild],
    };
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map(child =>
        addChildToNode(child, parentId, newChild)
      ),
    };
  }
  return node;
};

const findParentInTree = (
  root: MindmapNode,
  nodeId: string,
  parent: MindmapNode | null = null
): MindmapNode | null => {
  if (root.id === nodeId) return parent;
  if (root.children) {
    for (const child of root.children) {
      const found = findParentInTree(child, nodeId, root);
      if (found !== null) return found;
    }
  }
  return null;
};

const buildBreadcrumb = (
  root: MindmapNode,
  nodeId: string,
  path: string[] = []
): string[] | null => {
  if (root.id === nodeId) {
    return [...path, root.title];
  }
  if (root.children) {
    for (const child of root.children) {
      const result = buildBreadcrumb(child, nodeId, [...path, root.title]);
      if (result) return result;
    }
  }
  return null;
};

export const useMindmapStore = create<MindmapState>((set, get) => ({
  data: mindmapData,
  selectedNodeId: null,
  expandedNodes: new Set(['root']),
  hoveredNodeId: null,
  drillPath: [],
  editingNodeId: null,

  
  showSaved: false,

  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

  setHoveredNode: (nodeId) => set({ hoveredNodeId: nodeId }),

  setEditingNode: (nodeId) => set({ editingNodeId: nodeId }),

  toggleNodeExpansion: (nodeId) =>
    set((state) => {
      const expanded = new Set(state.expandedNodes);
      expanded.has(nodeId) ? expanded.delete(nodeId) : expanded.add(nodeId);
      return { expandedNodes: expanded };
    }),

  expandAll: () => {
    const root = get().getCurrentRoot();
    return set({ expandedNodes: new Set(getAllNodeIds(root)) });
  },

  collapseAll: () => {
    const root = get().getCurrentRoot();
    return set({ expandedNodes: new Set([root.id]) });
  },

  drillDown: (nodeId) =>
    set((state) => {
      const node = findNodeInTree(state.data, nodeId);
      if (node?.children?.length) {
        return {
          drillPath: [...state.drillPath, nodeId],
          expandedNodes: new Set([nodeId]),
          selectedNodeId: nodeId,
        };
      }
      return state;
    }),

  drillUp: () =>
    set((state) => {
      if (!state.drillPath.length) return state;
      const path = [...state.drillPath];
      path.pop();
      const rootId = path.length ? path[path.length - 1] : 'root';
      return {
        drillPath: path,
        expandedNodes: new Set([rootId]),
        selectedNodeId: rootId,
      };
    }),

  addChildNode: (parentId) =>
    set((state) => {
      const id = `node-${Date.now()}`;
      const child: MindmapNode = {
        id,
        title: 'New Node',
        summary: 'Click to edit this node.',
      };
      const data = addChildToNode(state.data, parentId, child);
      const expanded = new Set(state.expandedNodes);
      expanded.add(parentId);
      return { data, expandedNodes: expanded, selectedNodeId: id };
    }),

 
  updateNode: (nodeId, updates) =>
    set((state) => {
      const data = updateNodeInTree(state.data, nodeId, updates);

     
      set({ showSaved: true });
      setTimeout(() => set({ showSaved: false }), 1500);

      return { data };
    }),

  findNode: (nodeId) => findNodeInTree(get().data, nodeId),

  getCurrentRoot: () => {
    const state = get();
    if (!state.drillPath.length) return state.data;
    return findNodeInTree(state.data, state.drillPath[state.drillPath.length - 1]) || state.data;
  },

  getNodeBreadcrumb: (nodeId) =>
    buildBreadcrumb(get().data, nodeId) || ['Root'],

  getConnectedEdgeIds: (nodeId) => {
    const data = get().data;
    const node = findNodeInTree(data, nodeId);
    const parent = findParentInTree(data, nodeId);
    return {
      parentId: parent?.id || null,
      childIds: node?.children?.map(c => c.id) || [],
    };
  },
}));
