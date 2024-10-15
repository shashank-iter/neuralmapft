import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// global store for nodes
export const useNodeStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
      removeNode: (node) =>
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== node.id),
        })),
      updateNode: (node) =>
        set((state) => ({
          nodes: state.nodes.map((n) => (n.id === node.id ? node : n)),
        })),
    }),
    {
      name: "nodes-storage",
      getStorage: () => createJSONStorage(),
    }
  )
);

// global store for edges
export const useEdgeStore = create(
  persist(
    (set, get) => ({
      edges: [],
      addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
      removeEdge: (edge) =>
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== edge.id),
        })),
      updateEdge: (edge) =>
        set((state) => ({
          edges: state.edges.map((e) => (e.id === edge.id ? edge : e)),
        })),
    }),
    {
      name: "edges-storage",
      getStorage: () => createJSONStorage(),
    }
  )
);
