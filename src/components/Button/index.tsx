interface ButtonProps {
    title: string | JSX.Element;
    icon: JSX.Element;
    onClick?: React.MouseEventHandler,
    width?: string,
    margin?: string,
    color?: string
}

export default function Button({ title, icon, onClick, width, margin, color}: ButtonProps) {
    return (
        <button className="flex items-center bg-blue-800 hover:bg-blue-700 duration-300 rounded text-indigo-50 text-lg p-2" onClick={onClick} style={{width, margin, background: color}}>
            <span className="flex items-center justify-center">{ icon }</span>
            <strong className="text-center w-80 flex items-center justify-center">{ title }</strong>
        </button>
    );
}
