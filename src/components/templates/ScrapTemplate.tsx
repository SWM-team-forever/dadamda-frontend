import styled from 'styled-components';

import Overlay from '../atoms/Overlay';
import ScrapCreateModal from '../organisms/ScrapCreateModal';
import theme from '../../assets/styles/theme';
import OtherTemplate from './OtherTemplate';
import IconButton from '../atoms/IconButton';
import fab from '../../assets/icons/fab.png';
import { useEffect, useState } from 'react';
import { GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_OTHER_SCRAP_URL, GET_PRODUCT_SCRAP_URL } from '../../secret';
import ListTemplate from './ListTemplate';

interface ScrapTemplateProps {
    type: string,
}

function ScrapTemplate({ type }: ScrapTemplateProps) {
    const [isScrapCreateModalVisible, setIsScrapCreateModalVisible] = useState(false);
    const showScrapCreateModal = () => {
        setIsScrapCreateModalVisible(true);
    }

    function hideScrapCreateModal() {
        setIsScrapCreateModalVisible(false);
    }

    const token = localStorage.getItem('token');
    const page = 0;
    const size = 20;

    const urlMatching: { [key: string]: string } = {
        'other': GET_OTHER_SCRAP_URL,
        'list': GET_LIST_SCRAP_URL,
        'article': GET_ARTICLE_SCRAP_URL,
        'product': GET_PRODUCT_SCRAP_URL,
        'video': GET_PRODUCT_SCRAP_URL,
    }

    const [types, setTypes] = useState([]);

    useEffect(() => {
        const url = urlMatching[type] + `?page=${page}&size=${size}`;
        token &&
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
            }).then((response) => response.json())
                .then((data) => {
                    setTypes(data.data.content);
                    console.log(data.data.content);
                })
                .catch(err => console.error(err));
    }, [type]);
    return (
        <>
            <ScrapListContainer>
                {type === 'other' && <OtherTemplate others={types} />}
                {type === 'list' && <ListTemplate lists={types} />}
                <IconButton src={fab}
                    style={{
                        position: 'fixed',
                        bottom: '15px',
                        right: '15px',
                        width: '48px',
                        height: '48px',
                    }}
                    onClick={showScrapCreateModal} />
                {isScrapCreateModalVisible && <Overlay>
                    <ScrapCreateModal hideScrapCreateModal={hideScrapCreateModal} />
                </Overlay>}
            </ScrapListContainer>
        </>
    );
}

const ScrapListContainer = styled.div`
    width: calc(100% - 200px);
    height: calc(100% - 50px);
    background-color: ${theme.color.background_color};
    position: fixed;
    right: 0;
    top: 50px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
    overflow: auto;
`

export default ScrapTemplate;
