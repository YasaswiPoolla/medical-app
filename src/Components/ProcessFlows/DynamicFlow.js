import { useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  addEdge
} from "reactflow";
import { useDispatch,useSelector } from "react-redux";
import ElkNode from "./ElkNode";
import useLayoutNodes from "./useLayoutNodes";
import {
  updateTask,
  fetchProcessTasks,
  processFlowSuccessStart,
} from "../../Actions/ProcessFlowAction";
import {
  PROCESS_FLOW_UPDATE_SUCCESS_MSG,SUCCESS
} from "../../Utils";
import "./process.css";

const nodeTypes = {
  elk: ElkNode,
};

function DynamicFlow({ initNodes, initEdges }) {
  const dispatch = useDispatch();
  const { processIdData } = useSelector(
    (state) => state.ProcessFlowReducer
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setDisplay(false);
    setNodes([...initNodes]);
    setEdges([...initEdges]);
    //as reactFlow is not trigger for nodes changes, so we are triggering manually
    setTimeout(() => setDisplay(true), 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initNodes, initEdges]);

  const onConnect = (params) => {
    // Find source and target node data
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    // Add the new edge to the state
    setEdges((eds) => addEdge(params, eds));

    //
    if(sourceNode?.data && params?.sourceHandle){
      let lastHyphenIndex = params?.sourceHandle?.lastIndexOf("-");
      let rightPortion = params?.sourceHandle?.substring(lastHyphenIndex + 1); 
      sourceNode.data.options[parseInt(rightPortion)].nextSequenceId = targetNode?.data?.sequenceNo;
      
      //updating sourceNode corresponding option with nextSequenceId
      dispatch(updateTask(sourceNode?.data?.taskId, sourceNode?.data)).then((response) => {
        if (response?.data?.status === SUCCESS) {
          dispatch(processFlowSuccessStart(PROCESS_FLOW_UPDATE_SUCCESS_MSG));
          dispatch(fetchProcessTasks(processIdData?.processId));
        }
      });
      //updating targetNode taskLink
      targetNode.data.taskLink = targetNode.data.taskLink + "," + params?.sourceHandle
      dispatch(updateTask(targetNode?.data?.taskId, targetNode?.data)).then((response) => {
        if (response?.data?.status === SUCCESS) {
          dispatch(processFlowSuccessStart(PROCESS_FLOW_UPDATE_SUCCESS_MSG));
          dispatch(fetchProcessTasks(processIdData?.processId));
        }
      });
    }

  };

  useLayoutNodes();

  return (
    <>
      {display ? (
        <ReactFlow
          nodes={display ? nodes : []}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          fitView
          nodeTypes={nodeTypes}
          onConnect={onConnect}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      ) : (
        ""
      )}
    </>
  );
}
// eslint-disable-next-line
export default (props) => (
  <ReactFlowProvider>
    <DynamicFlow {...props} />
  </ReactFlowProvider>
);