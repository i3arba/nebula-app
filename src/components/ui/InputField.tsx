interface InputFieldProps {
    label?: string;
    placeholder: string;
    value: string;
    type?: string;
    large?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputField({
    label, //generic space to be defined in which place it's used
    placeholder, //generic space to be defined in which place it's used
    value, //generic space to be defined in which place it's used
    type = "text",
    large = false, // This is be false by default, but can be changed accordingly
    onChange, // A function that will adapt accordingly to the type of element
}: InputFieldProps) {
    const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : "input-field";

    return (
        // First we have the bigger session, the container.
        <div className="flex flex-col gap-1.5">
            {/* [LOGIC] First thing inside is the label for the field */}
            <label className="text-zinc-600 font-medium text-sm">{label}</label>

            {/* [LOGIC] Then, we have a check to know if the field expects bigger inputs or not */}
            {/* [LOGIC] If yes, it will work as a text area */}
            {large ? (
                <textarea
                    className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-zinc-400/15 focus:outline-none h-24 align-text-top`}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            // If not, it will be a simple input
            ) : (
                <input
                    className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none`}
                    type={type}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            )}
        </div>
    )
}