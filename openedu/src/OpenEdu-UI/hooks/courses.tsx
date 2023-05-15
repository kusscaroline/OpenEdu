import { Session } from "next-auth";
import { useEffect, useState, useContext } from "react";
import { OpenEduContext } from "../provider";

/*

    const { 
        courses,
        nextPage,
        lastPage,
        searchTerm
    } = useCourses

*/

interface Contributor {
    id: String
    firstName: String
    lastName: String
}

interface Category {
    id: String
    name: String
}

interface Module {
    id: String
    assignmentId: String
    type: String
    data: String
}

interface Assignment {
    id: String
    name: String
    courseId: String
    type: String
    modules: Module[]
}

interface Course {
    id: String
    name: String
    description: string
    assignments: Assignment[]
    categories: Category[]
    contributors: Contributor[]
}

function useCourses(props?: useCoursesProps){
    const [courses, setCourses] = useState([] as Course[]),
        [course, setCourse] = useState(null as Course | null),
        [pageNumber, setPageRaw] = useState(0),
        [pages, setPages] = useState(0),
        [pageSize, setPageSize] = useState(0),
        context = useContext(OpenEduContext)

    const getCourse = ({
        courseId
    }) => {
        return new Promise((res, rej) => {
            fetch(context?.API_URL + '/courses/' + courseId, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                })
            })
            .then(r => r.json())
            .then(r => {
                const course = r as Course;
                setCourse(course)
                res(course)
            })
    })
    }

    const getCourses = (props) => {
        const { page } = { 
            page: pageNumber,
            ...props
        }
        
        return new Promise((res, rej) => {
            fetch(context?.API_URL + '/courses?page=' + page, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                })
            })
            .then(r => r.json())
            .then(r => {
                const courses = r.courses as Course[];
                setCourses(courses)
                setPages(r.pages as number)
                setPageSize(r.pageSize as number)
                res(courses)
            })
        })
    }

    const setPage = (newPage: number) => {
        setPageRaw(newPage)
        return getCourses({ page: newPage })
    }

    const nextPage = () => setPage(pageNumber + 1);
    const lastPage = () => setPage(Math.max(pageNumber - 1, 1));

    return { courses, course, getCourses, getCourse, nextPage, lastPage, pages, pageSize, page: pageNumber + 1 }
}

interface useCoursesProps {
}

export {
    useCourses
}