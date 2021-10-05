import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';
import HomeMachine from '../machines/homeMachine';

export const MainMachineContext = createContext({});

const MainMachineProvider = ({ ...props }) => {
    const [current, send] = useMachine(HomeMachine, {
        devTools: true
    });
    return <MainMachineContext.Provider value={{ current, send }} {...props} />;
};

export default MainMachineProvider;
