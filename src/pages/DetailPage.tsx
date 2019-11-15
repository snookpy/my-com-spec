import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import EquipmentDetailComponent from '../components/EquipmentDetailComponent';
import { IMemory, IMemmoryLayout } from '../types/memoryType';
import IDisk from '../types/diskType';
import ICPU from '../types/cpuType';

const { ipcRenderer } = window;

export interface DetailPageProps {
    match: any
}

const DetailPage: React.SFC<DetailPageProps> = ({ match }) => {
    const history = useHistory()
    const [memory, setMemory] = useState<IMemory>({})
    const [memLayout, setMemLayout] = useState<IMemmoryLayout[]>([])
    const [disks, setDisk] = useState<IDisk[]>([])
    const [cpu, setCpu] = useState<ICPU>({})
    React.useEffect(() => {
        ipcRenderer.on('get-cpu', (event: any, arg: any) => {
            setCpu(JSON.parse(arg))
        })
        ipcRenderer.on('get-mem', (event: any, arg: any) => {
            setMemory(JSON.parse(arg))
        })
        ipcRenderer.on('get-disk', (event: any, arg: any) => {
            setDisk(JSON.parse(arg))
        })
        ipcRenderer.on('get-mem-layout', (event: any, arg: any) => {
            setMemLayout(JSON.parse(arg))
        })

    }, [])

    return (
        <div className="detail-page" >
            <button
                onClick={() => {
                    history.push('/')
                }}
            > black </button>
            <h2 className="center">Hi: {match.params.name}</h2>
            <br />
            <ul className="detail-page__equip detail-page__equip--wrap">
                <li className="detail-page__list--none">
                    <EquipmentDetailComponent objectToShow={cpu} title="CPU" />
                </li>

                <li className="detail-page__list--none">
                <EquipmentDetailComponent objectToShow={memory} title="Memory" />
                </li>
                <li className="detail-page__list--none">
                {memLayout.map((mem, index) =>
                    <EquipmentDetailComponent
                        objectToShow={mem}
                        title={"MemoryLayout :" + (index + 1)}
                    />
                )}
                </li>

                <li className="detail-page__list--none">
                    {disks.map((disk, index) =>
                        <EquipmentDetailComponent
                            objectToShow={disk}
                            title={"Disk :" + (index + 1)}
                        />
                    )}
                </li>
            </ul>
        </div>
    );
}

export default DetailPage;