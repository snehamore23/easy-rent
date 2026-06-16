import "./Input.css";

function Input({
    type = "text",
    placeholder = "Search For Properties",
    value="",
    onChange = () => {}
}){
    return (
        <div className="input-container">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input-field"
            />
        </div>
    );
}
export default Input;