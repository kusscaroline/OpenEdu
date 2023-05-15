import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { 
    Typography,
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Grid,
    Card,
    Avatar,
    CardActionArea ,
    Button,
    Stack,
    IconButton 
} from "@mui/material";
import { styled } from '@mui/material/styles';

import { red, blue } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import LanguageIcon from '@mui/icons-material/Language';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


const StyledAccordianSummary = styled(AccordionSummary)`
    .MuiAccordionSummary-content {
        margin: 0;
    }
`;

export default function SortableAssignment(props){
    const { 
        assignment,
        mode
    } = props
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    }
    

    const modules = [
        {
            name: 'Video on buttons and links',
            type: 'video'
        },
        {
            name: 'Reading on useful HTML elements',
            type: 'reading'
        },
        {
            name: 'Resources: Useful Links',
            type: 'resources'
        }
    ]
    
    return (
            <Accordion ref={setNodeRef} style={style}>
                <StyledAccordianSummary 
                    expandIcon={<ExpandMoreIcon />} 
                    sx={{ 
                        pl: mode == 'edit' ? 0 : 2, 
                        py: mode == 'edit' ? 0 : 2 
                    }} 
                    style={{ marginTop: 0, marginBottom: 0}}
                >
                    <Grid container direction='row'>
                        {mode == 'edit' && (
                            <Grid 
                                item 
                                sx={{
                                    p: 3
                                }}
                                {...attributes} 
                                {...listeners}
                                >
                                <DragHandleIcon />
                            </Grid>
                        )}
                        <Grid item direction='column' display="flex" justifyContent='center'>
                            <div>
                                <Typography variant="h5">
                                    {assignment.name} 
                                    {mode == 'edit' && (
                                        <IconButton 
                                            sx={{ ml: 1 }}
                                            onClick={e => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                        >
                                            <EditIcon fontSize='small' />
                                        </IconButton>
                                    )}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </StyledAccordianSummary>
                <AccordionDetails>
                    <Typography>
                        <Grid container direction='column' gap={0.5}>
                            {modules.map(module => {
                                const moduleStyle = stylesByModuleType[module.type]

                                return (
                                    <Grid item>
                                        <Card 
                                            key={module.name}
                                            variant='outlined'
                                        >
                                            <CardActionArea
                                                sx={{
                                                    p: 2
                                                }}
                                            >
                                                <Grid container direction='row'>
                                                    <Grid item>
                                                        <Avatar sx={{ bgcolor: moduleStyle.color, color: '#FFF' }} variant="rounded">
                                                            {moduleStyle.icon}
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item direction='column' display="flex" justifyContent='center' sx={{ pl: 2}}>
                                                        <div>
                                                            <Typography variant="h6">{module.name}</Typography>
                                                        </div>
                                                    </Grid>
                                                    <Grid item direction='column' sx={{ ml: 'auto' }} display="flex" justifyContent='center'>
                                                        <ArrowRightIcon/>
                                                    </Grid>
                                                </Grid>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })}
                            {mode == 'edit' && (
                                <Stack direction="row" sx={{ mt: 1}}>
                                    <Button variant="outlined" startIcon={<AddIcon />}>
                                        Add Module
                                    </Button>
                                </Stack>
                            )}
                        </Grid>
                    </Typography>
                </AccordionDetails>
            </Accordion>
    )
}


const stylesByModuleType = {
    video: {
        icon: <PlayArrowIcon />,
        color: red[500]
    },
    reading: {
        icon: <DescriptionIcon />,
        color: blue[500]
    },
    resources: {
        icon: <LanguageIcon />,
        color: blue[500]
    }
}