import React, { createContext, useMemo } from "react"

const OpenEduContext = createContext({
    API_URL: null,
    session: null
})

const OpenEduProvider = ({
    API_URL,
    session,
    children
}) => {
    const value = useMemo(() => {
        return {
            API_URL,
            session
        }
    }, [API_URL, session]);

    return (
        <OpenEduContext.Provider value={value}>
            {children}
        </OpenEduContext.Provider>
    )
}

export {
    OpenEduProvider,
    OpenEduContext
}