export const opStates = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
  { value: "pending", label: "Pendiente" },
  { value: "rework", label: "Reproceso" },
];

export type opState = (typeof opStates)[0];
