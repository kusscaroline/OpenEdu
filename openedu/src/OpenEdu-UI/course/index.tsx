import { useEffect, useState } from "react";
import { useCourses } from "../hooks/courses"
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Typography } from "@mui/material";

import SortableAssignment from './sortableAssignment'

export default function Course({
    courseId
}){
    const { getCourse } = useCourses(),
        [course, setCourse] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
            distance: 8,
            },
        })
    )
        
    useEffect(() => {
      if(!courseId) return;
      getCourse({ courseId: courseId })
      .then(c => setCourse(c))
    }, [courseId])

    if(!course) return <>Loading...</>
    

    return (
        <>
            <h1>{course?.name}</h1>
            <Typography variant='subtitle1' color='text.secondary' gutterBottom>
            ID: {course?.id}
            </Typography>
            <DndContext 
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <SortableContext
                    items={course.assignments}
                    strategy={verticalListSortingStrategy}
                >
                {course.assignments.map(assignment => (
                    <SortableAssignment 
                        assignment={assignment}
                        key={assignment.id} 
                        id={assignment.id} 
                    />
                ))}
                </SortableContext>
            </DndContext>
        </>
    )

    function handleDragEnd(event:DragEndEvent){
        const { active, over } = event
        console.log('yaaaaaa')

        if(active.id == over.id) return;
        setCourse(courseRaw => {
            if(!courseRaw) return;
            const course = { ...courseRaw }
            let assignments = [...course.assignments]

            const activeIndex = assignments.findIndex(x => x.id == active.id)
            const overIndex = assignments.findIndex(x => x.id == over?.id)
            console.log({ activeIndex, overIndex })

            assignments = arrayMove(assignments, activeIndex, overIndex)
            course.assignments = assignments
            return course
        })
    }
}