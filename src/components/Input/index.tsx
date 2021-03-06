
interface InputProps {
    type: string,
    name: string,
    placeholder: string,
    value?: string,    
    handleInputChange: Function
}

export default function Input({ type, name, placeholder, value, handleInputChange }: InputProps) {
        
    return (
        <div className="relative my-4 z-1 border-b-2 focus-within:border-blue-500">
            <input
                className="block sm:w-full appearance-none focus:outline-none bg-transparent text-lg"
                placeholder=" "
                type={ `${type}` }
                name={ `${name}` }                
                value={value}
                onChange={event => { handleInputChange(event) }}
                required
            />
            <label className="absolute -z-1 origin-0 top-0 duration-300 text-gray-500 text-lg">{ placeholder }</label>
        </div>
    );
}