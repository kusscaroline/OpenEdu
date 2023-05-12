import { useSortable } from '@dnd-kit/sortable'
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { CSS } from '@dnd-kit/utilities'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function SortableAssignment(props){
    const { assignment } = props
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    
    return (
            <Accordion ref={setNodeRef} style={style} {...attributes} {...listeners}
                sx={{
                    p: 1
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">{assignment.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
    )
}
