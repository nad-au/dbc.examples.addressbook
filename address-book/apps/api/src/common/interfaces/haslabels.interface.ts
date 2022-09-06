export interface HasLabels {
  labels: string[];
}

export const hasLabels = (arg: any): arg is HasLabels => {
  const labels = (arg as HasLabels).labels;
  return labels !== undefined && Array.isArray(labels);
};
