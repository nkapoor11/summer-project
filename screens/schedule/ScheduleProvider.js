import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';
import ScheduleMachine from '../../machines/ScheduleMachine';

export const ScheduleMachineContext = createContext({});

const ScheduleProvider = ({ ...props }) => {
    const [current, send] = useMachine(ScheduleMachine, {
        devTools: true
    });
    return <ScheduleMachineContext.Provider value={{ current, send }} {...props} />;
};

export default ScheduleProvider;
