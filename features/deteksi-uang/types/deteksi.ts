export type DeteksiItem = {
  nominal: number;
  jenis: "kertas" | "logam";
};

export type DeteksiResponse = {
  data?: {
    total: number;
    details: DeteksiItem[];
  };
};