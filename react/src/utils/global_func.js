export const handleInputChange = (setState, statename, value) => {
    setState(prev => { return { ...prev, [statename]: value } })
}

export const handleStateChange = (setState, state) => {
    setState(prev => { return { ...prev, ...state } })
}

export const toggleState = (setState, statename) => {
    setState(prev => { return { ...prev, [statename]: !prev[statename] } })
}