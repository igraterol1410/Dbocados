export interface CommonAlertProps {
    title: string
    text: string | null
    action: () => void
    buttonText: string
    buttonColor: string
}