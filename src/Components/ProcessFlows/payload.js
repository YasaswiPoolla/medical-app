import { generateRandomNumber } from "../../Utils";

export const getTaskData = (
  data,
  optionsData,
  fieldsData,
  roleId,
  hospitalId,
  taskLink
) => {
  let payload = {
    taskId: data?.taskId || null,
    roleId: roleId || null,
    parentSystem: "uKTuwlXHvqircjrDtROfYTsVK",
    taskName: data?.trigger,
    initialTat: data?.initialTat,
    sequenceNo: data?.sequenceNo || generateRandomNumber(),
    taskGroup: 1,
    fields: [],
    options: [],
    description: data?.description,
    nextProcessId: data?.nextProcessId || null,
    taskLink: taskLink || null,
    "hospital-id": hospitalId || null,
    processId: sessionStorage.getItem("processId"),
  };
  optionsData?.forEach((item) => {
    payload.options.push({
      optionId: item?.optionId || null,
      taskId: item?.taskId || null,
      "hospital-id": item?.["hospital-id"] || hospitalId,
      option: item?.value,
      nextSequenceId: item?.nextSequenceId || generateRandomNumber(),
    });
  });
  fieldsData?.forEach((item) => {
    payload.fields.push({
      "hospital-id": item?.["hospital-id"] || hospitalId,
      fieldUuid: item?.fieldUuid || null,
      taskId: item?.taskId || null,
      isMandatory: item?.isMandatory || true,
      optionId: item?.optionId || null,
      readOnly: item?.readOnly || true,
      fieldLabel: item?.fieldLabel || null,
      fieldInfo: item?.fieldInfo || null,
      fieldType: item?.type || "Radio",
      fieldValue: item?.name,
    });
  });
  return payload;
};
