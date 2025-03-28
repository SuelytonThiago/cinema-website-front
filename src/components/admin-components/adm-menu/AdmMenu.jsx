import React, { useEffect, useRef, useState } from 'react'
import { FaWrench } from "react-icons/fa";
import { AdmBtn, Container, Li, Menu, Overlay } from './styles';
import AddCategory from '../add-category/AddCategory';
import AddFilm from '../add-film/AddFilm';

const AdmMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <Container ref={menuRef}>
            <AdmBtn onClick={handleSetIsOpen}>
                <FaWrench />
            </AdmBtn>
            {isOpen && (
                <div>
                    <Overlay onClick={handleSetIsOpen}/>
                    <Menu>
                        <Li>
                            <AddCategory/>
                        </Li>
                        <Li>
                            <AddFilm/>
                        </Li>

                    </Menu>
                </div>
            )}
        </Container>
    )
}

export default AdmMenu