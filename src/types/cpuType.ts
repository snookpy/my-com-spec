export default interface ICPU {
    manufacturer?: string;
    brand?: string;
    vendor?: string;
    family?: string;
    model?: string;
    stepping?: string;
    revision?: string;
    voltage?: string;
    speed?: string;
    speedmin?: string;
    speedmax?: string;
    governor?: string;
    cores?: number;
    physicalCores?: number;
    processors?: number;
    socket?: string;
    cache?: any;
}
