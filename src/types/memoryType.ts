export interface IMemmoryLayout {
    size?: number;
    bank?: string;
    type?: string;
    clockSpeed?: number;
    formFactor?: string;
    manufacturer?: string;
    partNum?: string;
    serialNum?: string;
    voltageConfigured?: number;
    voltageMin?: number;
    voltageMax?: number;
}

export interface IMemory {
    total?: number;
    free?: number;
    used?: number;
    active?: number;
    available?: number;
    buffers?: number;
    cached?: number;
    slab?: number;
    buffcache?: number;
    swaptotal?: number;
    swapused?: number;
    swapfree?: number;
}