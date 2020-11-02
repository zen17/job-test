import React, { useState } from 'react';

export interface DataTabularFormRowProps {
    index: number;
    slot: number;
    city: string;
    velocity: number | string;
}

export const DataTabularFormRow: React.FunctionComponent<DataTabularFormRowProps> = ({
    index = 0,
    city = 'None',
    slot = 0,
    velocity = 0
}: DataTabularFormRowProps) => {
    const [indexInput, setIndexInput] = useState<number>(index);
    const [cityInput, setCityInput] = useState<string>(city);
    const [slotInput, setSlotInput] = useState<number>(slot);
    const [velocityInput, setVelocityInput] = useState<number | string>(
        velocity === 0 ? '0.00' : velocity
    );

    return (
        <>
            <td>
                <input
                    type="number"
                    value={indexInput}
                    onChange={(event) =>
                        setIndexInput(parseInt(event.target.value))
                    }
                />
            </td>
            <td>
                <input
                    type="text"
                    value={cityInput}
                    onChange={(event) => setCityInput(event.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={slotInput}
                    onChange={(event) =>
                        setSlotInput(parseInt(event.target.value))
                    }
                />
            </td>
            <td>
                <input
                    type="number"
                    step="0.01"
                    value={velocityInput}
                    onChange={(event) => setVelocityInput(event.target.value)}
                />
            </td>
        </>
    );
};
