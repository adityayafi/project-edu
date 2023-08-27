import { Button, Popconfirm } from "antd"


export default function ConfirmButton ({title, description, onCancel, onConfirm, buttonClass, danger, buttonTitle, buttonHtmlType, disabled}) {
    return (
        <Popconfirm
            title={title}
            description={description}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okText='Yes'
            cancelText="No"
            okButtonProps={{htmlType: ''}}
        >
            <Button type="primary" htmlType={buttonHtmlType? buttonHtmlType : ''} className={buttonClass} danger={danger} disabled={disabled}>{buttonTitle}</Button>
        </Popconfirm>
    )
}