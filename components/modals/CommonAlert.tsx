import { CommonAlertProps } from '@/types/alerts'
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
  } from '@chakra-ui/react'
import React, { useRef } from 'react'

interface AlertProps {
    configAlert: CommonAlertProps | null
    show: boolean
    setShow: () => void
}

const CommonAlert:React.FC<AlertProps> = ({configAlert, show, setShow}) => {
    const cancelRef = useRef(null)

    return (
    <AlertDialog
    isOpen={show}
    leastDestructiveRef={cancelRef}
    onClose={setShow} 
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {configAlert?.title}
                </AlertDialogHeader>

                <AlertDialogBody>
                {configAlert?.text}
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button variant='outline' ref={cancelRef} onClick={setShow}>
                    Cancelar
                </Button>
                <Button colorScheme={configAlert?.buttonColor || 'red'} onClick={configAlert?.action} ml={3}>
                    {configAlert?.buttonText}
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
    )
}

export default CommonAlert