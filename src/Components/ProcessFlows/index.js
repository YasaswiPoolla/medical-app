import { useState, useEffect } from "react";
import DynamicFlow from "./DynamicFlow";
import { useSelector} from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";

export default function App() {
  const { processTasks, processFlowSuccessMsg, processFlowSuccessSnack } =
    useSelector((state) => state.ProcessFlowReducer);
  const [initNodes, setInitNodes] = useState([]);
  const [initEdges, setInitEdges] = useState([]);
  // eslint-disable-next-line
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  useEffect(() => {
    let result = [];
    processTasks?.forEach((element) => {
      let sourceHandles = [];
      //sourceHandels from options
      element?.options?.forEach((option, index) => {
        sourceHandles.push({
          id: element?.taskId + "-" + index,
          value: option?.option,
        });
      });
      let targetHandles = [];
      if (element?.taskLink) {
        let taskLinkArr = element?.taskLink?.split(",");
        taskLinkArr?.forEach((eachTaskLink) => {
          let lastHyphenIndex = eachTaskLink?.lastIndexOf("-");
          let leftPortion = eachTaskLink?.substring(0, lastHyphenIndex);
          if(leftPortion && eachTaskLink){
            targetHandles.push({
              id: element?.taskId + "-t",
              sourceParent: [leftPortion, eachTaskLink],
            });
          }
        });
      } else {
        targetHandles.push({
          id: element?.taskId + "-t",
          sourceParent: [0, 0],
        });
      }
      let tempObj = {
        id: element?.taskId,
        data: {
          ...element,
          label: element?.taskName,
          description: element?.description,
          sourceHandles: sourceHandles,
          targetHandles: targetHandles,
          fieldsData: element?.fields || [],
        },
        position: { x: 0, y: 0 },
        type: "elk",
      };
      result.push(tempObj);
    });

    setInitNodes([...result]);
  }, [processTasks]);

  useEffect(() => {
    function transformData(nodes) {
      const connections = [];

      nodes?.forEach((node) => {
        const { id, data } = node;
        const { targetHandles } = data;

        targetHandles?.forEach((targetHandle) => {
          const { id: targetHandleId, sourceParent = [] } = targetHandle;
          const [sourceNodeId, sourceHandleId] = sourceParent;
          if (sourceNodeId) {
            connections.push({
              id: `${sourceNodeId}-${id}`,
              source: sourceNodeId,
              sourceHandle: sourceHandleId,
              target: id,
              targetHandle: targetHandleId,
            });
          }
        });
      });
      return connections;
    }

    setInitEdges(transformData(initNodes));
  }, [initNodes]);

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  return (
    <>
      <div className="w-100 h-100">
        {processFlowSuccessSnack ? (
          <SuccessSnack
            open={processFlowSuccessSnack}
            onClose={handleSnackClose}
            successMessage={processFlowSuccessMsg}
          />
        ) : null}
        <DynamicFlow initNodes={[...initNodes]} initEdges={[...initEdges]} />
      </div>
    </>
  );
}
