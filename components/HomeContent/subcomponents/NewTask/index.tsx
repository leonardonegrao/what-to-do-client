import { useState, FormEvent } from 'react'
import Calendar from 'react-calendar'
import { FiCalendar, FiPlus } from 'react-icons/fi'
import { Container, CalendarContainer, NewTaskButton } from './styles'

import 'react-calendar/dist/Calendar.css';

interface NewTaskProps {
    onSubmit: Function
}

function NewTask({ onSubmit }: NewTaskProps): JSX.Element {
    const [title, setTitle] = useState('')
    const [taskDate, setTaskDate] = useState<Date>(new Date())
    const [showCalendar, setShowCalendar] = useState(false)

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()

        createTask()
    }

    function createTask() {
        onSubmit({
            title,
            date: taskDate,
            isImportant: false,
        })

        setTitle('')
    }

    function handleShowCalendar(): void {
        setShowCalendar(!showCalendar)
    }

    function handleChangeCalendar(date: Date) {
        setTaskDate(date)
    }

    return (
        <>
            <Container>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Adicionar nova tarefa"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        name="title"
                    />
                </form>
                <NewTaskButton>
                    <FiCalendar size={40} strokeWidth={1} onClick={handleShowCalendar} />
                </NewTaskButton>
                <NewTaskButton type="submit" onClick={createTask}>
                    <FiPlus size={40} strokeWidth={1} />
                </NewTaskButton>
            </Container>
            {showCalendar && (
                <CalendarContainer>
                    <Calendar className="calendar" onChange={handleChangeCalendar} locale="pt-BR" />
                </CalendarContainer>
            )}
        </>
    )
}

export default NewTask