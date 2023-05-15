import React, { createContext, useEffect, useState } from 'react'

const SettingsContext = createContext(null);

const SettingsContextProvider = ({ children }) => {
    const [appSettings, setAppSettingsRaw] = useState({
        theme: 'system'
    })

    useEffect(() => {
        const existingSettings = localStorage.getItem('settings')
        if(existingSettings && existingSettings !== ''){
            setAppSettingsRaw(JSON.parse(existingSettings))
        }
    }, [])

    const setAppSettings = newAppSettings => {
        setAppSettingsRaw(prevState => {
            let newSettings = prevState
            if(typeof newAppSettings === 'function') {
                newSettings = {...prevState, ...newAppSettings(prevState)}
            } else {
                newSettings = {...prevState, ...newAppSettings}
            }

            localStorage.setItem('settings', JSON.stringify(newSettings))
            return newSettings
        })
    }

    return <SettingsContext.Provider value={{
        appSettings, setAppSettings
    }}>
        {children}
    </SettingsContext.Provider>
}

export {
    SettingsContext, 
    SettingsContextProvider
}