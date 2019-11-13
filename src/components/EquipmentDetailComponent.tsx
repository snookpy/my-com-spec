import * as React from 'react';
import { isObject, isString } from 'util';

export interface IEquipmentDetailComponentProps {
    objectToShow: any;
    title: string;
}

export interface IShowLiObjectProps {
    name: string;
    value: string | number
}

const convertMB = (val: number) => 
{
    const mbConvert = 1048576
    if(val >= mbConvert){
        return Math.round(val/mbConvert * 100) / 100 
    }
    return val
}

export const ShowLiObject: React.SFC<IShowLiObjectProps> = ({
    name,
    value
}) => {

    return (
        <li>
            {name} : {isString(value) ? value : convertMB(value)}
        </li>
    )   
}

const EquipmentDetailComponent: React.SFC<IEquipmentDetailComponentProps> = ({
    objectToShow,
    title
}) => {
    return (

        <>
            <p>{title}</p>
            <ul>
                {Object.keys(objectToShow).map(objName => 
                    <ShowLiObject  
                        key={objectToShow[objName] + objName}
                        name={objName}
                        value={isObject(objectToShow[objName]) ? JSON.stringify(objectToShow[objName]) : objectToShow[objName]}
                    />
                )}
            </ul>
        </>
    );
}

export default EquipmentDetailComponent;