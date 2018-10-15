import React from 'react';


const Header = ({
    value,
    onClick,
    onChangeText,
    inputRef,
})=>(
    <div>
        <input
            value={value}
            ref={inputRef}
            onChange={evt=> onChangeText(evt.target.value)} 
        />
        <button onClick={onClick}>Add todo</button>
    </div>
);


    

export default Header