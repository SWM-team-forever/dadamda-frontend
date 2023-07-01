import TextContent from "./TextContent";

const TextContentList = ({ textContents }) => {
    return (
        <div className="TextContentList">
            {textContents.map(textContent => (
                <TextContent textContent={ textContent }/>
            ))}
        </div>        
    );
};

export default TextContentList;