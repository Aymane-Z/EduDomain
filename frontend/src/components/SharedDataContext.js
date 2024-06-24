import { createContext } from 'react';

const SharedDataContext = createContext({
    sharedData: "", 
    setsharedData: () => {}
});

export default SharedDataContext;