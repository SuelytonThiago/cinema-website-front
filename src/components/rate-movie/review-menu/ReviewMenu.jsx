import React, { useEffect, useRef, useState } from 'react'
import { Container, EditBtn, Li, Menu, MenuReviewBtn, Overlay } from './styles';
import { FaEllipsisV, FaTimes } from "react-icons/fa";
import DeleteComment from '../../delete-comment/DeleteComment';

const ReviewMenu = ({ toggleEdit, isEditing, idComment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleEditReview = () => {
    toggleEdit();
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container ref={menuRef}>
      {console.log(isEditing)}
      {isEditing ? (
        <FaTimes onClick={toggleEdit} style={{cursor: 'pointer'}}/>
      ) : (
        <MenuReviewBtn onClick={handleSetIsOpen}>
          <FaEllipsisV />
        </MenuReviewBtn>
      )}

      {isOpen && !isEditing && (
        <div>
          <Overlay onClick={handleSetIsOpen} />
          <Menu>
            <Li>
              <EditBtn onClick={handleEditReview}>
                Editar
              </EditBtn>
            </Li>
            <Li>
              <DeleteComment reviewId={idComment} />
            </Li>
          </Menu>
        </div>
      )}
    </Container>
  );
}

export default ReviewMenu;
