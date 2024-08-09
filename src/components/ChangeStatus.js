
import { StoredContext } from '@/context';
import { insertComment, setTemplateStatus } from '@/models/transactions';
import { supabase } from '@/utils';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react'
import { useState } from 'react';
import toast from 'react-hot-toast';

const statusTypes = [{ name: 'Pendiente', color: 'warning' }, { name: 'Aprobado', color: 'success' }, { name: 'Corrección', color: 'danger' }];

export const ChangeStatus = ({ status, templateid }) => {
    const { memory: { socket } } = StoredContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [comment, setComment] = useState('')
    const error = comment.length < 2
    const [taskStatus, setTaskStatus] = useState(statusTypes.find(s => s.name === status) || statusTypes[0])
    const handleUpdateStatus = (newStatus) => {
        toast.promise(setTemplateStatus(templateid, newStatus.name), {
            loading: 'Cambiando estado...',
            success: ({ data, error }) => {
                if (error) {
                    return 'Error al cambiar estado'
                }
                setTaskStatus(newStatus)
                socket.emit('updateStatus', { id: templateid, status: newStatus.name })
                return 'Estado actualizado'
            },
            error: 'Error al intentar cambiar estado'
        }, {
            id: 'status-change',
        })
    }
    const handleSubmit = (newStatus) => {
        if (newStatus.name === 'Corrección') {
            onOpen()
        } else {
            handleUpdateStatus(newStatus)
        }
    }
    const handleInsertComment = () => {
        toast.promise(insertComment(templateid, comment), {
            loading: 'Enviando comentario...',
            success: ({ data, error }) => {
                if (error) {
                    console.log(error)
                    return 'Error al enviar comentario'
                }
                return 'Comentario enviado'
            },
            error: 'Error al intentar enviar comentario'
        }, {
            id: 'comment-insert',
        })
    }
    const handleSetStatus = () => {
        toast.promise(setTemplateStatus(templateid, 'Corrección'), {
            loading: 'Enviando a corrección...',
            success: ({ data, error }) => {
                if (error) {
                    return 'Error al enviar a corrección'
                }
                socket.emit('updateStatus', { id: templateid, status: 'Corrección' })
                setTaskStatus({ name: 'Corrección', color: 'danger' })
                return 'Enviado a corrección'
            },
            error: 'Error al intentar enviar a corrección'
        }, {
            id: 'status-change',
        })
    }
    const handleClose = () => {
        handleSetStatus()
        handleInsertComment()
        onClose()
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} backdrop='blur'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                ¿Desea enviar a corrección?
                            </ModalHeader>
                            <ModalBody>
                                <Textarea minRows={1} value={comment} onValueChange={setComment} autoFocus isRequired errorMessage={error ? 'Escribe el motivo de la corrección' : false} description='Escribe el motivo de la corrección' label="Comentario" endContent={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                } />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='light' onPress={onClose} color='danger'>Cancelar</Button>
                                <Button isDisabled={error} onPress={handleClose} className='bg-utim'>Aceptar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Dropdown className="grid min-w-[10]">
                <DropdownTrigger>
                    <Chip color={taskStatus.color} className='min-w-full hover:cursor-pointer' variant="dot">{taskStatus.name}</Chip>
                </DropdownTrigger>
                <DropdownMenu aria-label={'dropdown menu for status'} variant="solid" className="p-0 m-0 w-full" classNames={{ base: 'p-0 m-0 w-full', list: 'p-0 m-0 w-full' }}>
                    {
                        statusTypes.map((statusElement, i) => {
                            return (
                                <DropdownItem aria-label={statusElement.name + 'dropdown item'} key={i} textValue={statusElement.name} className="p-0 m-0">
                                    <Chip onClick={() => handleSubmit(statusElement)} color={statusElement.color} className="min-w-full" variant="dot">{statusElement.name}</Chip>
                                </DropdownItem>
                            )
                        })
                    }
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
