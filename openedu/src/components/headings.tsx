

import { Typography } from '@mui/material'

const PageHeading = (props) => {
    const safeProps = { ... props }
    delete safeProps.children

    return (
        <Typography variant="h3" noWrap component="h1" className='mt-5' color='text.primary'>
            {props.children}
        </Typography>
    )
}

const SubHeading = (props) => {
    const safeProps = { ... props }
    delete safeProps.children

    return (
        <Typography variant="h4" noWrap component="h2" className='mt-4' color='text.primary'>
            {props.children}
        </Typography>
    )
}

export {
    PageHeading,
    SubHeading
}