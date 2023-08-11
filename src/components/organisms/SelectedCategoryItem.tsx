import { createContext, useContext, useState } from 'react';

const SelectedCategoryItemContext = createContext(null);

const SelectedCategoryItem = ({ defaultValue, children }) => {
    const [selectedContent, setSelectedContent] = useState(defaultValue);
    const providerValue = { selectedContent, setSelectedContent };

    return (
        <SelectedCategoryItemContext.Provider value={providerValue}>
            {children}
        </SelectedCategoryItemContext.Provider>
    )
}

function useSelectedCategoryItem() {
    const context = useContext(SelectedCategoryItemContext);
    if (context === undefined) {
        throw new Error('useSelectedCategoryItem must be used within SelectedCategoryItem');
    }

    return context;
}

function Video() {
    const { selectedContent } = useSelectedCategoryItem();
    const embedUrl = selectedContent.embedUrl;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
            }}>
            <iframe src={embedUrl}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }} />
        </div>
    );
}

SelectedCategoryItem.Video = Video;

export default SelectedCategoryItem;