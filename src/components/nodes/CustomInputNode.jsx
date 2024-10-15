import { useCallback, useState } from "react";
import { layers } from "@/data/layers";
import { Handle, Position } from "@xyflow/react";
import Link from "next/link";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    setSelectedLayer(evt.target.value);
    setLayerObj({
      layer_name: evt.target.value,
    });
  }, []);

  const [layerObj, setLayerObj] = useState({
    layer_name: null,
    params: {},
  });

  function onParamChange(evt, paramName) {
    console.log(paramName);
    console.log(evt.target.value);
    setLayerObj({
      ...layerObj,
      params: {
        ...layerObj.params,
        [paramName]: evt.target.value,
      },
    });
  }

  const [selectedLayer, setSelectedLayer] = useState(null);

  return (
    <div className="text-updater-node outline outline-indigo-600 rounded-sm py-2 px-5 bg-gray-100">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex flex-col gap-y-2">
        <label htmlFor="text">Select a Layer</label>
        <span className="text-xs text-gray-500">
          Select a layer from the dropdown to update its parameters
        </span>
        <select
          id="text"
          name="text"
          value={selectedLayer}
          onChange={onChange}
          className="border border-gray-300 rounded-sm p-1 nodrag"
        >
          {layers.map((layer, idx) => (
            <option key={idx} value={layer.name}>
              {layer.name}
            </option>
          ))}
        </select>

        {selectedLayer && (
          <div>
            {/* <h4>{selectedLayer}</h4> */}
            <span className="text-xs">
              {layers.find((layer) => layer.name === selectedLayer).description}
            </span>{" "}
            <Link
              href={layers.find((layer) => layer.name === selectedLayer).href}
              className="text-xs text-blue-500"
            >
              Read More
            </Link>
          </div>
        )}

        {/* render fields on the basis of layer selection */}

        {selectedLayer &&
          layers
            .find((layer) => layer.name === selectedLayer)
            .param_desc.map((param, idx) => (
              <div key={idx} className="flex flex-col gap-y-2">
                <label htmlFor={param.name}>{param.name}</label>
                {/* <input
                  type="number"
                  id={param.name}
                  name={param.name}
                  min={param.min}
                  max={param.max}
                  step="0.1"
                  defaultValue={param.default}
                  className="border border-gray-300 rounded-sm p-1 nodrag"
                /> */}
                {param?.type === "select" && (
                  <>
                    <select
                      id={param?.name}
                      name={param?.name}
                      className="border border-gray-300 rounded-sm p-1 nodrag"
                      required={param?.required}
                      onChange={(e) => {
                        onParamChange(e, param.name);
                      }}
                    >
                      {param.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {param?.type === "float" && (
                  <>
                    <input
                      type="number"
                      id={param?.name}
                      name={param?.name}
                      min={param?.min}
                      max={param?.max}
                      onChange={(e) => {
                        onParamChange(e, param.name);
                      }}
                      onKeyDown={(e) => {
                        if (
                          ["+", "-", "e", "ArrowUp", "ArrowDown"].includes(
                            e.key
                          )
                        )
                          e.preventDefault();
                      }}
                      step="0.1"
                      onWheel={(e) => e.preventDefault()}
                      defaultValue={param.default}
                      className="border border-gray-300 rounded-sm p-1 nodrag"
                    />
                    <span className="text-xs text-gray-500">
                      {param.description}
                    </span>
                  </>
                )}

                {param.type === "bool" && (
                  <>
                    <div
                      key={idx}
                      className="flex flex-row gap-y-2 place-items-center gap-x-2 "
                    >
                      <label htmlFor={param.name}>{param.name}</label>
                      <input
                        type="checkbox"
                        id={param.name}
                        name={param.name}
                        onChange={(e) => {
                          onParamChange(e, param.name);
                        }}
                        className="border border-gray-300 rounded-sm p-1 nodrag h-4 w-4"
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {param.description}
                    </span>
                  </>
                )}
              </div>
            ))}

        <button
          className="border border-gray-300 rounded-sm p-1 nodrag"
          onClick={() => {
            console.log(layerObj);
          }}
        >
          Add Layer
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
