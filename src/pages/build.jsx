import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TextUpdaterNode from "../components/nodes/CustomInputNode";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];

// node Id should be based on a dynamic variable to avoid conflicts
const getNodeId = () => `node-${(nodeId) => nodeId + 1}`;

// position of the nodes should be dynamic to avoid overlapping

const inputNode = {
  id: getNodeId(),
  type: "textUpdater",
  position: { x: 0, y: 0 },
  data: { value: 123 },
};

const hiddenNode = {
  id: getNodeId(),
  type: "textUpdater",
  position: { x: 0, y: 0 },
  data: { value: 123 },
};

const outputNode = {
  id: getNodeId(),
  type: "textUpdater",
  position: { x: 0, y: 0 },
  data: { value: 123 },
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(1);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  function addInputNode() {
    setNodes((nodes) => [...nodes, inputNode]);
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row  bg-gray-50">
      <div className="w-4/12 h-full outline p-5">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold mb-5">Add Nodes</h1>
          <div className="flex flex-col gap-2">
            <button
              className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
              onClick={addInputNode}
            >
              Add Input Node
            </button>
            <button className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
              Add Hidden Node
            </button>
            <button className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
              Add Output Node
            </button>
          </div>
        </div>
      </div>
      <div className="w-8/12 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
